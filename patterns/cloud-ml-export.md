---
title: Cloud ML export
scope: Code convention
summary: >

    Export models using the convention supported by Google Cloud ML.

---

[Preparing Your TensorFlow Application for Training in the Cloud](https://cloud.google.com/ml/docs/how-tos/preparing-models) specifies
how you can prepare a trained model for deployment to Google's Cloud
ML platform. As the only formally specified interface for preparing a
model for inference by a service, developers should use this *de
facto* standard for exporting trained models.

The interface calls for 

- Define model *inputs* that must be provided for model operations
- Define model *outputs* that are generate by model operations

The interface calls for the use
of [graph collections](https://www.tensorflow.org/versions/r1.0/api_docs/python/#building-graphs--graph-collections) to encode model inputs and outputs.

Collection values are JSON encoded maps from inputs and outputs to
their respective graph tensors.

Operation inputs must be stored in a collection named `inputs` ---
outputs in a collection named `outputs.

Once the input and output collections have been added to the graph,
the graph must be exported using
a [TF saver](https://www.tensorflow.org/versions/r1.0/api_docs/python/state_ops/saving_and_restoring_variables).

## Example

When building a model graph, include `input` and `output` tensors that
specify maps between external facing names and graph tensors.

For this example, we implement these steps in a function named
`init_collections` taken from Guild AI's [MNIST intro example](https://github.com/guildai/guild-examples/blob/master/mnist-2/intro.py):

``` python
def init_collections():
    tf.add_to_collection("inputs", json.dumps({"image": x.name}))
    tf.add_to_collection("outputs", json.dumps({"prediction": y.name}))
```

The input and output names are arbitrary, but play a central role in
the model's prediction interface. Input names are used to read values
from submitted JSON inputs for a prediction operation. Output names
are used to encode response JSON.

See
[Using Guild to serve models](https://guild.ai/tutorials/using-guild-to-serve-models/) for
an example of using JSON encoded inputs and outputs to run an exported
model using this interface.

One the trained graph is configured with input and output collections,
export it using a saver. This operation is implement by a function
named `save_model` (again from the Guild example referenced above):

``` python
def save_model():
    print "Saving trained model"
    tf.gfile.MakeDirs(FLAGS.rundir + "/model")
    tf.train.Saver().save(sess, FLAGS.rundir + "/model/export")
```
