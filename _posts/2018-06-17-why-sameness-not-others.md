---
layout: post
title: Why Sameness.js and not Underscore.js or Lodash?
image: /img/why-sameness-not-others.png
---

[Underscore.js](https://underscorejs.org/) and [Lodash](https://lodash.com/)
are both robust JavaScript libraries with a lot of functionalities. Some of
their advantages relies on dealing with browsers peculiarities in order to
deliver a stable behavior across many browsers.

[Sameness.js](https://mfedatto.github.io/sameness.js/), on the other hand, was
designed to be a simple and lightweight comparing library, with no browser
behaviors attached. For instance, Sameness.js ment to work on testing engines
witch suports JavaScript code, so it hasn't a single instruction witch wasn't
ment to compare or suppor objects comparison.

Complementary, [Postman](https://www.getpostman.com) JavaScript testing code
doesn't support external libraries yet, so any library you want to use must be
placed into that code. In this scenario Sameness.js takes the lead having only
2.030 bytes whilst Underscore.js has 18.069 bytes and Lodash has 73.157 bytes.

## TL;DR

Underscore.js and Lodash have a huge set of functionalities addressed to
general JavaScript developers, when Sameness.js has just the object data
comparing functions.

Hope it helps.
