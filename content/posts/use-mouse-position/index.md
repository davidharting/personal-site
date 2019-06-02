---
title: Using the mouse position with React Hooks and RxJS
date: '2019-06-02T15:14:12.498Z'
tags:
  ['react', 'react hooks', 'reactive programming', 'rxjs', 'web development']
---

- _You can see the hook in action in this [Code Sandbox](https://codesandbox.io/s/use-mouse-position-hook-1kssr)._
- _Scroll to [the bottom of the page](#complete-hook-implementation) for the full hook code sample._

---

# Motivation

For an interactive application, you may need to know the position of the user's cursor. Simple enough, there are native dom events to track the movements of the mouse. However, there are a few issues to consider:

- **Integration with React**
  How will we continually provide the updated mouse position to the React components that need it?
- **Obtaining and updating the mouse position**
  This _could_ be done with vanilla JS. But a declarative implementation will be much easier to reason about and maintain.
- **Performance**
  Responding to every single change in the mouse position could slow down the site.

# Integration with React

We encapsulate the functionality inside a hook. This way, any component that needs the mouse position can easily obtain it, without making the mouse position a global variable.

```js
import { useState } from 'react'

function useMousePosition() {
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)

  // We do not expose a way to update mouseX and mouseY
  // This will be handled within the hook itself
  return { mouseX: x, mouseY: y }
}
```

# Obtaining and updating the mouse position

We can listen to mouse movement with vanilla JavaScript. However, [RxJS](https://rxjs.dev/guide/overview) Gives us a declarative API and easier performance tuning.

- **Declarative API**
  We can simply describe how we want to respond to events, rather than do any event plumbing ourselves. We write pure functions as operations on events, rather than writing event and `setTimeout` callbacks.
- **Easier performance tuning**
  As we will see in the next section, RxJS has built-in support for "throttling" how often we respond to events. Mouse movements are frequent and bursty. How "real-time" the hook needs to be will depend on the use-case. RxJs allows us to avoid manually [debouncing](https://lodash.com/docs/#debounce) our functions.

```js
import { useEffect, useState } from 'react'
import { fromEvent } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'

function useMousePosition() {
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)

  useEffect(() => {
    // Subscribe to the mousemove event
    const sub = fromEvent(document, 'mousemove')
      // Extract out current mouse position from the event
      .pipe(map(event => [event.clientX, event.clientY]))
      // We have closure over the updater functions for our two state variables
      // Use these updaters to bridge the gap between RxJS and React
      .subscribe(([newX, newY]) => {
        setX(newX)
        setY(newY)
      })

    // When the component unmounts, remove the event listener
    return () => {
      sub.unsubscribe()
    }
    // We use [] here so that this effect fires exactly once.
    // (After the first render)
  }, [])

  return { mouseX: x, mouseY: y }
}
```

## Performance tuning

The previous example provides a functioning mouse position hook. However, it may slow your site down. It will attempt to update the mouse position state with each `mousemove` event. RxJS provides a way to throttle this.

We simple add a `throttleTime()` to our `mousemove` event pipeline.

```js
import { fromEvent } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'

const sub = fromEvent(document, 'mousemove').pipe(
  throttleTime(100), // Only respond to a mousemove event every 100ms
  map(event => [event.clientX, event.clientY])
)
```

# Complete hook implementation

Here you can see the final implementation in it's entirety.
Notice that I take the throttle time as a parameter. For each use case, you should use the largest number that provides a quality experience to minimize resource usage.

```js
import { useEffect, useState } from 'react'
import { fromEvent } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'

function useMousePosition(throttleTime = 100) {
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)

  useEffect(() => {
    const sub = fromEvent(document, 'mousemove')
      .pipe(
        throttleTime(throttleTime),
        map(event => [event.clientX, event.clientY])
      )
      .subscribe(([newX, newY]) => {
        setX(newX)
        setY(newY)
      })

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return {
    mouseX: x,
    mouseY: y,
  }
}
```
