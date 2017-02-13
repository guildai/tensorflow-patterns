---
title: Feed dict as positional arg
scope: Code convention
summary: >

    Specify a feed dict as the second positional argument session.run,
    rather than as a keyword argument.

fix_footer: yes
---

Avoid spelling out `feed_dict` when running a session by simply
specifying the feed dict as the second positional argument. It is so
common to use the so called "feed dict" when running a session that
the name only adds noise to the operation.

## Example

``` python
sess.run(ops, inputs)
```

## Anti-pattern <small>(avoid)</small>

The second argument is commonly named. Given the centrality of
providing data to an operation, the name serves little value -- and
arguably is just noise.

``` python
sess.run(ops, feed_dict=inputs)
```
