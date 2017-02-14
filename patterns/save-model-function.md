---
title: Save model function
scope: Function
summary: >

    Use a function named <code>save_model</code> to create a
    checkpoint of a model.

---

It's a simple matter to routinely save a model during a training
operation. The saved model can be used to perform predictions, recover
from training crashes, or to reuse in transfer learning.

## Example

``` python
def save_model():
    print "Saving trained model"
    tf.gfile.MakeDirs(FLAGS.rundir + "/model")
    tf.train.Saver().save(sess, FLAGS.rundir + "/model/export")
```

## Related patterns

- [Cloud ML export](/patterns/cloud-ml-export.html)

## Notes

This pattern needs work. We need to fill in:

- How
