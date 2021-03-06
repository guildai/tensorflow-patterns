---
title: Train function
scope: Function
summary: >

    For training scripts, define a function named <code>train</code>
    that is responsible for the training loop.

---

A `train` function should be a simple loop that iteratively runs a
*train operation* with batches of data. During training, the function
should
occasionally
[log the model status](/patterns/log-model-status-function.html)
(e.g. write summaries and update the user with the latest training and
validation accuracies) and [save the model](save-model-function.html)
as a checkpoint.

The train function needs to resolve:

- When to stop training --- this is often simply by executing a number
  of steps but may be determined by other inputs (e.g. accuracy,
  accuracy delta, etc.)
- How to define the training batch
- Whether or not to log model status or save the model

In the example below these considerations are delegated to functions
(e.g. `training_steps`, `next_batch`, etc.) but they may alternatively
be implemented within the training loop directly.

## Example

``` python
def train():
    for step in range(training_steps()):
        data = next_batch()
        sess.run(train_op, data)
        maybe_log_model_summary(step, data)
        maybe_save_model(step)
```
