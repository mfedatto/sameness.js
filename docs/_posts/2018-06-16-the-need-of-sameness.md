---
layout: post
title: The need of Sameness.js
image: /img/the-need-of-sameness.png
---

It was June 4th of 2018. I started making [Postman](https://www.getpostman.com)
collections to test my [Liera Aurora](https://github.com/mfedatto/liera.aurora)
lab project and I've seen myself in the middle of a new situtation. I knew the
information each request would response but I didn't wanted to *need* knowing
the exactly structure it would be returned in, in order to test it.

First of all, I haven't found any assertion solution made to deal with
collections or custom objects, like I used to use in C#. I had to code my own
comparing functions to make the correct assertion of what I expected and I
obtained from my request.

I coded a function that compare two objects expecting them to be indentical, so
I *had* to know excectly how my request would return the expected data. And to
me it sucks.

At that point I got really frustrating and looked a lot at the Internet seeking
some library to compare my equivalent objects. I had a list of dice results
categories with its score and it didn't metter the sequence of the elements or
properties, all I needed to assure was that I had the same result.

I really don't know if it is something other devs missed like I did, but I did
it a lot and decided to fix that by compiling my code on a simple library. And
from that came [Sameness.js](https://mfedatto.github.io/sameness.js/). A pure
JavaScript object comparing library. It has the ability to check if two objects
are the same object, identical objects, equivalent objects or superset vs subset
objects.

Hope it helps.
