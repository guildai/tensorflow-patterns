---
title: Train operation
scope: Tensor/Operation
summary: >

    Use a TensorFlow operation named <code>train_op</code> that
    implements the optimization used to train model variables.

---

Use the name `train_op` for the TensorFlow operation that updates
model variables (weights, biases, etc.) to optimize some value. Using
a consistent name simplifies reading and understanding models.

Using the `_op` suffix differentiates the operation variable name from
the [`train` function](/patterns/train-function.html), which
implements the training loop.

## Example

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

## Related patterns

- [Train function](/patterns/train-function.html)
- [Loss operation](/patterns/loss-operation.html)
