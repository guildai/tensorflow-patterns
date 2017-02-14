---
title: Loss operation
scope: Tensor/Operation
summary: >

    Use a TensorFlow operation <code>loss</code> to represent the loss
    being minimized in a training operation.

---

Regardless of the underlying loss function, always use the name `loss`
for the tensor/operation in question.


## Example

In this example, the loss, which is implemented as *cross entropy* is
named as a global variable `loss`.

``` python
def init_train_op():
    global y_, loss, train_op
    y_ = tf.placeholder(tf.float32, [None, 10])
    loss = tf.reduce_mean(
             -tf.reduce_sum(
               y_ * tf.log(y),
               reduction_indices=[1]))
    train_op = tf.train.GradientDescentOptimizer(0.5).minimize(loss)
```

## Anti-pattern <small>(avoid)</small>

It's common to name the loss variable based on its underlying
operation (e.g. cross entropy, logistic, etc.) While this pattern
helps to identify what type of loss function is used, it introduces
variability across projects that make each project more difficult to
read and understand.

Avoid this:

``` python
def init_train_op():
    global y_, loss, train_op
    y_ = tf.placeholder(tf.float32, [None, 10])
    cross_entropy = tf.reduce_mean(
                      -tf.reduce_sum(
                        y_ * tf.log(y),
                        reduction_indices=[1]))
    train_op = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)

```
