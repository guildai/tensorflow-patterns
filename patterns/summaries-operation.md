---
title: Summaries operation
scope: Tensor/Operation
summary: >

    Use TensorFlow event writers and summary operations to log
    training progress and other details useful to understanding the
    training operation.

---

TensorFlow requires some work in logging model state during an
operation. However, as with any logging effort, the investment can pay
off when you need to understand what is happening during a long
running operation -- and ultimately how successful your training was.

## Example

In this example, we define three things:

- Summary operations for two scalars of interest: *loss* and *accuracy*
- The summary merge operation
- A writer that can be used later to log summaries

``` python
def init_summaries():
    global summaries, writer
    tf.summary.scalar("loss", loss)
    tf.summary.scalar("accuracy", accuracy)
    summaries = tf.summary.merge_all()
    writer = tf.summary.FileWriter(FLAGS.rundir)
```

Here we run the summaries operation to generate something we can log:

``` python
def evaluate(step, data):
    summary = sess.run(summaries, data)
    writer.add_summary(summary, step)
```

Note that we use the globally defined `writer` in this example ---
this is a matter of design. In some cases a script might use multiple
summary writers (e.g. one for training summaries and another for
validation) in which case the specific writer should be specified in
the call to `evaluate`.

## Related patterns

- [Log model status function](/patterns/log-model-status-function)
