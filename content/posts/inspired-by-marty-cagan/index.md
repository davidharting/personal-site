---
title: What I got out of Inspired by Marty Cagan
date: '2019-01-19T14:30:00.169Z'
---

I recently read the book [_Inspired: How to Create Tech Products Customers Love_ by Marty Cagan](https://www.goodreads.com/book/show/3323374-inspired).

It really re-shaped how I think about creating and shipping products, so I wanted to consolidate my thoughts. This is _not_ a summary of the book, but a summary of what I personally got out of the book.

# Language is everything

I think the biggest thing I got out of this book is concrete language to describe the process of creating and delivering products. You could say _it's just semantics_, but in this case, the language for me unlocked a whole new way of looking at things.

## Discover before you deliver

Cagan distinguishes product _discovery_ from product _delivery_. Discovery is about:
1. Learning what problems and pain your users and prospects face
1. Learning what solutions solve those problems

Before this book, I lived in the world of delivery, shipping features. Most good engineering teams have tooling, process, and practices around delivery. Having this new word - _discovery_ - made me realize I was focusing on only one side of the coin. Cagan outlines frameworks and resources for getting as good at discovery as you are at delivery.

## Re-thinking risk

The main point of discovery is to mitigate risk. In the delivery world, I primarily think about risk in terms of how likely a new feature is to cause regressions in other parts of the system. However, when it comes to discovering new solutions, there are four main types of risk to mitigate:

1. **Value** The biggest one. Does this solve so much pain for customers that they will use it (and pay money for it)?
1. **Usability** Can users actually realize the value of the feature? Or is it too unclear and difficult?
1. **Feasibility** Is it technically possible within time constraints?
1. **Viability.** Can the solution work for the business? Are there legal issues? Are sales and marketing tooled up to sell it?

For many features, we may know that all four types of risk are minimal from the outset.

However, if there are questions, it is **not** okay to simply implement and learn from usage. The point of discovery is to learn much more quickly and cheaply than the cost of building and shipping.

Once you have a solid discovery process in place, you can build with more confidence and without cluttering your product with low-value features and technical debt.

Cagan is big on getting prototypes in front of users or potential users. In fact, he favors using the term Minimal Viable Product to refer to prototypes. Stop shipping MVPs. **MVPs are a discovery tool, not a delivery artifact.**

# Fall in love with problems, not ideas

> Most of your product ideas won't work and delivering will take several iterations.

Cagan repeats this mantra throughout the book. It underscores the importance of discovery. Most product ideas are simply much riskier, especially in terms of value, then you assume.

If you get attached to solutions and your own ideas, you will fail your customer and implement many features that will be ignored by users.

In several interviews, I've said _There's no room for ego in software development._ I believe humility is one the greatest qualities you can cultivate to improve your life and career. Humility will allow to look past your love for your own solutions and stay focused on the pain of your customers.

# You get what you measure

Cagan describes how using an OKR system is far superior to building product roadmaps. Product roadmaps force you go into delivery before you do any discovery. You may be able to hit delivery milestones by deadlines. But is anything you just delivered valuable? Only time will tell.

With an OKR system, you can set Objectives centered around customer problems. Then you set Key Results that you believe will measure weather or not the product has solved that problem. The OKR system is not magic. However, it is successful because it emphasizes customer pain and discovery activities. It also holds product teams accountable for measurable results instead of deadlines.

# How I can contribute to product discovery as an engineer

So, as an engineer, how will this book targeted at product managers change how I work?

## Stay focused on Key Results.
Each quarter we refresh our OKRs. To be honest, I normally forget them a couple weeks into every quarter. Now, I keep them handy and think about them daily.

## Discovery is paramount, not something to squeeze in
My attitude has generally been that the more time I spend coding and reviewing PRs in a day, the more successful the day is.

As an engineer I should spend most of my day in delivery. However, discovery is critical to our success. So to the extent that product will incorporate me into discovery, I need to be eager to do so.

The primary function engineering serves during discovery is mitigating feasibility risk. If a feature requires something we haven't done before, we need to validate that we have the skills and time incorporate the new technology into our system. I can also point out lower effort alternatives and "quick wins" that product might have not thought possible.

Additionally, Cagan is emphatic that engineers are a great source of ideas and urges to have engineers sit on discovery activities, particularly watching customers explore prototypes. I am going to be more vocal about throwing my ideas out there (without growing attached to them). You never know when an idea will spark something that's worth at least prototyping.



