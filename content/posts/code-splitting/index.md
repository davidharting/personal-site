---
title: How I set up code-splitting on an existing React app with Webpack 4, Babel 7, and React Router
date: '2019-05-11T09:55:00.169Z'
tags: ['code splitting', 'react', 'webpack', 'react-router']
---

I recently set up code splitting for a moderately sized, two-year old React app at work.

I experienced conflicting documentation and surprising bugs, so I wanted to document my findings here.

## Key takeaway 🔑

**Avoid manual configuration if you can.**

If you are starting a new project, consider using a framework that gives you code-splitting "for free" and wraps Webpack and routing setup for you. Check out Gatsby, Next.js, and Create React App (and don't plan on ejecting it!).

You company is probably not in the business of configuring Webpack, and your needs for your web app are likely well within the bounds of what these frameworks can give you.

All that being said, setting up code splitting yourself is quite possible, just a little frustrating!

## Why code split?

⚡️**Faster initial page loads for our customers.** ⚡️

Our bundle was big and getting bigger. It takes a few seconds to download it the first time on good internet. Code-splitting allows Webpack to divide out our bundle into the JavaScript needed for each route in our single-page app. That way, when you hit a route, you can load a much smaller bundle much more quickly.

This is particularly appropriate for our use case. We have a lot of admin-only routes that our customers cannot visit. We also want to build more prototypes routes that only a small percentage of customers will ever see. Currently, all customers are loading a lot of JavaScript and CSS that they simply never execute.

## What I read and tried 📚

If you try to find documentation on **The Way**™️ to do code-splitting with React Router and Webpack 4, you will find a lot of conflicting information. I first visited the React Router docs for [their recommendation on code splitting](https://reacttraining.com/react-router/web/guides/code-splitting). They suggest that we use [`@loadable/component`](https://www.smooth-code.com/open-source/loadable-components/docs/getting-started/).

Loadable components seem to have a lot of adoption and nice features. However, their main selling point is support for server-side rendering. We do not have that need. In [reading more](https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/) on Loadable Components, I learned from their own documentation that React actually has a first party way to handle code splitting: React `Suspense` and `React.lazy`. This currently does not work with server-side rendering, but it will in the future.

I opted to pursue using the first party `React.lazy` + Suspense to hopefully position our code base in line with where "the community" is going. My goal here was to code split in a way that is future proof in the sense that it will be (1) Supported for the forseeable future and (2) Have good documentation.

**Resources**

- [React docs on Suspense / lazy](https://reactjs.org/docs/react-api.html#reactlazy)
- [React blog post introducing Suspense / lazy](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense)

## Approach

The overall approach for code splitting utilized a number of features that were new to our code base.

### Dynamic imports

[Dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) are a Stage 3 proposal. Stage 4 is generally when it is "for sure" coming to JavaScript. However, dynamic imports are one of those stage 3 imports that already has wide support from the browser vendors, bundler implementers, and library maintainers.

The basic idea is this:

```js
// Traditional import
// OrdersPage is a React Component
import OrdersPage from 'router/pages/orders'

// Dynamic import
// CustomersPage is a promise that resolves to a a module.
let CustomersPage
import('router/pages/customers').then(module => {
  CustomersPage = module.default
})
```

Because dynamic imports is stage 3, Babel does not support it by default. Because of this, we installed `babel-plugin-syntax-dynamic-import`.

**Webpack already understands dynamic imports and splits bundles based on their usage.**

In other words, when we say `import('router/pages/customers)`, Webpack says, _Apparently they want Customers to be it's own module. You got it buddy._

### React.lazy

Looking at the previous code snippet, you may find the dynamic import syntax ugly and verbose. Imagine having to `let` a variable and then create an import Promise chain for every page.

That is where `React.lazy` comes in. With `lazy`, you can instead do:

```js
// With React.lazy
import React, { lazy } from 'react'
const CustomersPage = lazy(() => import('router/pages/customers'))

// Without React.lazy
let CustomersPage
import('router/pages/customers').then(module => {
  CustomersPage = module.default
})
```

Note that `lazy` is specifically for importing React components. There are other libraries for dynamically importing modules generically. We really only need code-splitting based on routes, so just using `lazy` is fine for us for now.

### React Suspense

In the above example, `CustomersPage` will _eventually_ contain an imported component, once the bundle loads in from the network. If we try to render it before that happens, then our web app will barf (in the form of console errors and a white screen).

That is where `Suspense` comes in. It is a component that understands what to do when it's children are dynamically loaded components.

```js
import React, { lazy, Suspense } from 'react'

const CustomersPage = lazy(() => import('router/pages/customers'))

function App() {
  return (
    <div>
      <h1>Customers</h1>
      <Suspense fallback={<div>...loading...</div>}>
        <CustomersPage />
      </Suspense>
    </div>
  )
}
```

Until the `CustomersPage` module is available, Suspense will simply fallback to our provided loading indicator.

Note that the `Suspense` parent component can be anywhere in the tree. It does not have to directly wrap each dynamically imported component. So you can have a single Suspense component at the outermost level of your app, as long as you are okay with all the child dynamic components having the same fallback.

### Hot module reloading 🌶

Getting hot module reloading with code splitting is not "for free." Well, [it would be if we were using older, third-party libraries](https://github.com/gaearon/react-hot-loader#code-splitting). But it doesn't work out of the box with Suspense / lazy.

Getting it to work isn't too bad though. We simply need to let `react-hot-loader` which modules define our bundles so that it can hot reload when it detects a change.

In other words, we manually marked all components that we dynamically import as "hot."

```js
import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader/root'

class CustomersPage extends PureComponent {
  render() {
    return <h1>Thank you for being our customer 🙏</h1>
  }
}

export default hot(OrganizationsPage)
```

Presto, now when we `import('router/pages/organizations')` dynamically, `react-hot-loader` will now to refresh components appropriately when that dynamic bundle has a change.

#### Downsides of this HMR setup

The frustrating part with this is that you have to remember to do something in two very different places. In our `routes.js`, we need to remember to dynamically import the page. Where we export the page, we have to remember to wrap the component in `hot`. We decided this small inconvenience is well worth shipping smaller bundles to our customers and using first-party libraries.

## Downgrading Webpack 😑

Sadly, in Webpack `4.30.*`, we ran into a [strange peer dependency issue](https://github.com/webpack/webpack/issues/8656) that results in Webpack not recognizing dynamic imports.

A GitHub issue commenter provided a detailed explanation of the dependency issue and workaround [here](https://github.com/webpack/webpack/issues/8656#issuecomment-456010969), so I won't go into details.

The workaround involves taking specific actions after every `npm install`, which did not seem tenable for our team. For now, we are comfortable downgrading to Webpack `4.28`, and trying out upgrades as they come out to see if they fix the issue.
