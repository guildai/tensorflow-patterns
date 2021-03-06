---
title: Init functions
scope: Code convention
summary: >

    Use functions named <code>init_xxx</code> to perform state or
    subsystem initialization.

---

A large percent of TensorFlow code is dedicated to defining models and
their operations. This pattern recommends the use of functions named
`init_xxx` to [define global variables](/patterns/function-defined-globals.html)
needed by other functions in the script. Init functions should be
named according to what they initialize.

Common init functions include:

- `init_model`
- `init_train_op`
- `init_eval_op`
- `init_collections`
- `init_session`

Init functions should declare the global variables they are
responsible for initializing.

``` python
def init_foo_and_bar():
    global foo, bar
    foo = 123
    bar = 456
```

Under this pattern, init functions are single-purpose functions that
are responsible for variable or subsystem creation and
configuration. They codify the steps used to coordinate TensorFlow
script operations. If there's a question about state initialization, a
developer can consult the applicable init function to better
understand the program's sequencing.

As with any programming style that relies on side-effects, it's
important to call init functions in the right order. However, it's
easy to detect an dependency violation when using this pattern by
looking for these runtime errors and fixing reordering the function
calls as needed:

```
NameError: global name 'X' is not defined
```

where `X` is a variable that was referenced but not yet defined. The
resolution is to call the init function responsible for `X` prior to
its use.

## Example

This function is used to to initialize summaries and writers used for
training.

``` python
def init_summaries():
    global summaries, train_writer, validation_writer
    tf.summary.scalar("loss", loss)
    tf.summary.scalar("accuracy", accuracy)
    summaries = tf.summary.merge_all()
    train_writer = tf.summary.FileWriter(FLAGS.rundir + "/train")
    validation_writer = tf.summary.FileWriter(FLAGS.rundir + "/validation")
```

Init functions can be called as needed, provided they are called in
the correct order:

``` python
def init_train():
    init_model()
    init_train_op()
    init_summaries()
    init_session()

if __name__ == "__main__":
    init_train()
    train()
```

## Related patterns

- [Function defined globals](/patterns/function-defined-globals.html)
