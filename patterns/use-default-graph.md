---
title: Use default graph
scope: Code convention
summary: >

    Rely on TensorFlow's default graph rather than use new graphs as a
    context manager.

---

Some TensorFlow examples use this pattern:

``` python
with tf.Graph() as g:
    # perform operations that implicitly modify the default graph
    ...
```

This pattern advocates using the default graph implicitly in all cases
and to not use graphs as context managers.

It's easy to forget to use alternative graphs when executing
TensorFlow code --- these omissions result in hard-to-find bugs.

If you need to work with multiple graphs, consider defining all
operations in a single graph or using separate scripts.

The function `tf.reset_default_graph()` can be used to replace the
default graph with a new graph. However, while this function is useful
in interactive sessions (e.g. running code in an repl or in a
Notebook), most scripts will never need this functionality.

## Example

This example relies on TensorFlow's "default graph" which is
practically speaking a global variable per Python process.

``` python
def init_model():
    global x, y
    x = tf.placeholder(tf.float32, [None, 784])
    W = tf.Variable(tf.zeros([784, 10]))
    b = tf.Variable(tf.zeros([10]))
    y = tf.nn.softmax(tf.matmul(x, W) + b)
```

## Anti-pattern <small>(avoid)</small>

This example uses a newly created graph and is careful to run
graph-modifying code within a context manager:

``` python
def init_model(g):
    global x, y
    with g:
        x = tf.placeholder(tf.float32, [None, 784])
        W = tf.Variable(tf.zeros([784, 10]))
        b = tf.Variable(tf.zeros([10]))
        y = tf.nn.softmax(tf.matmul(x, W) + b)
    
def init():
    g = tf.Graph()
    init_model(g)
```

## Notes

This is likely a controversial pattern and we should look for good
reasons to use graphs-as-context-managers and document them here.
