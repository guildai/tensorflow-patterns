---
title: Evaluate function
scope: Function
summary: >

    For functions that support evaluation using test data, define a
    function named <code>evaluate</code>.

---

This pattern is closely related
to [Log model status function](/patterns/log-model-status-function.html)
but has a different point of emphasis.

This pattern names the function used when the user wants to measure
the performance of a trained model. The operation is often run after
model training using various test datasets, rather than the more
training oriented validation sets. *Log model status function*
describes the pattern of logging status during training.

In fact these two patterns perform the same operation, but in
different contexts.

## Example

``` python
def evaluate(step, data, writer, name):
    accuracy_val, summary = sess.run([accuracy, summaries], data)
    writer.add_summary(summary, step)
    print "Step %i: %s=%f" % (step, name, accuracy_val)
```

## Notes

It may be clearer to name this function `test`. This would
differentiate it from the log oriented names and highlight the purpose
of running the evaluate operation. The test function could simply call
the log operation with test data.
