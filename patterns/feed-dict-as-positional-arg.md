---
title: Feed dict as positional arg
scope: Code convention
summary: >

    Specify a feed dict as the second positional argument session.run,
    rather than as a keyword argument.

fix_footer: yes
---

Avoid spelling out `feed_dict` when running a session by simply
specifying the feed dict as the second positional argument.

This:

``` python
sess.run(ops, inputs)
```

rather than this:

``` python
sess.run(ops, feed_dict=inputs)
```
