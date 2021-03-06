---
title: Function defined globals
scope: Code convention
summary: >

    Use functions to define global variables used by a script.

---

This pattern attempts to improve the readability and maintainability
of a script in two ways:

- Concede that TensorFlow scripts program by side-effects
- Formalize the definition of global state using functions and
  Python's `global` statement
  
This pattern provides a number of benefits:

- Supports smaller, focused functions that are easier to reason about
  and therefore modify
- Improves correct code reuse
- Documents shared state without the use of complicated state
  definitions (e.g. Python classes/objects, etc.)

While global variables are generally discouraged in programming,
TensorFlow scripts become easier to write and read with the use of
globals. The two alternatives are illustrated below as anti-patterns.

## Example

This function defines two global variables, `x` and `y`:

``` python
def init_model():
    global x, y
    x = tf.placeholder(tf.float32, [None, 784])
    W = tf.Variable(tf.zeros([784, 10]))
    b = tf.Variable(tf.zeros([10]))
    y = tf.nn.softmax(tf.matmul(x, W) + b)
	
# Call init_model whenever x and y need to be defined
```

See
Guild's
[MNIST example](https://github.com/guildai/guild-examples/blob/master/mnist-2/intro.py) for
a complete use of this pattern.

## Anti-pattern <small>(avoid)</small>

### Local variables in a very large function

The commonly used alternative to this pattern is to define all
variables associated with script operations in a single function:

``` python
def train():
    # Define model
    x = tf.placeholder(tf.float32, [None, 784])
    W = tf.Variable(tf.zeros([784, 10]))
    ...
	
    # Define training op
    y_ = tf.placeholder(tf.float32, [None, 10])
    loss = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y),
    ...

    # Lots more code
```

### State encapsulation using classes or dicts

A second anti-pattern is the use of local state defined by Python
objects (or potentially dict/map instances):

``` python
class Model(object):
    
    def __init__(self):
        self.x = tf.placeholder(tf.float32, [None, 784])
        W = tf.Variable(tf.zeros([784, 10]))
        b = tf.Variable(tf.zeros([10]))
        self.y = tf.nn.softmax(tf.matmul(model.x, W) + b)

# Instantiate Model as needed
```

This pattern is arguably preferable to the first (use of local state
in very large functions). However, it has some drawbacks relative to
*Function defined globals*:

- Types state in this example is often difficult to get correct,
  particularly when a script is under development.
  
- The convention makes use of Python language semantics that add no
  value to understanding the intent of the developer -- rather they're
  used to encapsulate state. The result is more code that's harder to
  read.

- The use of encapsulation is a veneer over the state changes that
  occur whenever you instantiate TensorFlow variables, operations,
  etc.

A step toward improved encapsulation would be to perform all
operations in the context of a TensorFlow graph:

``` python
class Model(object):
    
    def __init__(self, g):
        with g:
            self.x = tf.placeholder(tf.float32, [None, 784])
            W = tf.Variable(tf.zeros([784, 10]))
            b = tf.Variable(tf.zeros([10]))
            self.y = tf.nn.softmax(tf.matmul(model.x, W) + b)
```

In practice this is tedious and error prone.

## Related patterns

- [Init functions](/patterns/init-functions.html)
- [Use default graph](/patterns/use-default-graph.html)
