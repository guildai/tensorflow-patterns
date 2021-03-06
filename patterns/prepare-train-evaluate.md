---
title: Prepare, train, evaluate
scope: Workflow
summary: >

    Build scripts that can be used in discrete prepare, train, and
    evaluate operations.

---

TensorFlow scripts often support independent operations:

- Prepare
- Train
- Evaluate

The `prepare` operation obtains data (e.g. downloads) and prepares it
for training (i.e. any one-time preprocessing needed for training).

The `train` operation incrementally trains a model, saving it
occasionally as checkpoints and finally as a fully trained model.

The `evaluate` operation measures and reports model performance on a
partially or fully trained model.

It's useful to separate the *prepare* operation as it is typically
performed once, independently of a *train* operation. The prepare
operation may accept user defined parameters that change the way the
data is prepared. This is similar to the *configure* step when
compiling software with autoconf tools.

It's also useful to separate the *evaluate* operation from train to
support post-training evaluation by independent parties using
different test datasets.

These operations may be implemented by a single script or by multiple
scripts sharing a common module. The example below illustrates
how [flags](/patterns/flags.html) can be used to parameterize the
operations in a single script.

## Example

Here we define flags that the user can use to change the behavior of the script:

``` python
def init_flags():
    global FLAGS
    parser = argparse.ArgumentParser()
    parser.add_argument("--prepare", dest='just_data', action="store_true")
    parser.add_argument("--evaluate", action="store_true")
    FLAGS, _ = parser.parse_known_args()
```

Here we use the flags to perform operations based on user input:

``` python
if __name__ == "__main__":
    init_flags()
    init_data()
    if FLAGS.just_data:
        pass
    elif FLAGS.evaluate:
        init_evaluate()
        evaluate()
    else:
        train()
        init_train()
```

Finally, assuming a script named 'train.py' the user can perform these
operations as follows:

``` bash
$ ./train.py --prepare
$ ./train.py
$ ./train.py --evaluate

```

## Notes

The *evaluate* operation may be more aptly spelled as *test*. This
term coincides with the use of *test data* to measure the final
performance of a model. This is in contrast to *validate* which is
also a form of evaluating a model.
