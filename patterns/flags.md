---
title: Flags
scope: Code convention
summary: >

    Use a global FLAGS variable to let users list and redefine script
    parameters.

popular: yes
---

A global `FLAGS` variable may be used to define parameters used
throughout a script. By using Python's
built-in [`argparse`](https://docs.python.org/3/library/argparse.html)
module, users can list script flags using the `--help` option to
better understand script inputs, as well as redefine parameter values.

## Example

Define the global `FLAGS` variable using an `ArgumentParser` instance
in the script's `__main__` block.

``` python
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--datadir", default="/tmp/MNIST_data",)
    parser.add_argument("--rundir", default="/tmp/MNIST_train")
    parser.add_argument("--batch_size", type=int, default=100)
    parser.add_argument("--epochs", type=int, default=1)
    FLAGS, _ = parser.parse_known_args()
    tf.app.run()
```

`FLAGS` is global to the script module and can be used to read script
parameters.

Use `parser.parse_known_args()` instead of `parser.parse_args()` to
the user specify additional arguments, which are ignored, without
causing a runtime error.
