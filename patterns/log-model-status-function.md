---
title: Log model status function
scope: Function
summary: >

    Define a function named <code>log_model_status</code> to log
    summaries and print updates to the user.

---

Scripts must routinely log summaries to TF event files as well as
update users via standard IO of their progress. For consistency, use
the name `log_model_status`.

The following arguments apply to this function:

- Global step (required when writing summaries)
- Feed dict data used to calculate status (may be omitted if using
  global data)
- Writer(s) used to log status (may be omitted if using global
  writers)
- A descriptor of the status being logged (may be omitted if status is
  always the same)

The function should generate status values (e.g. accuracy, loss, etc.)
as well as summaries. It should use TF event writers to log the
summaries and print to either standard output values of interest to
the user.

## Example

``` python
def log_model_status(step, data, writer, name):
    accuracy_val, summary = sess.run([accuracy, summaries], data)
    writer.add_summary(summary, step)
    print "Step %i: %s=%f" % (step, name, accuracy_val)
```

## Notes

Alternative function names:

- `evaluate` -- this is a more specific variant of `log_model_status`
  and arguably more meaningful to read. "Log model status" begs the
  question "what are we logging?" Rather, let's just state it.
  
- `log_model_accuracy` -- more explicit than `evaluate`

- `log_accuracy` -- explicit and succinct

The pattern therefore might be `log_model_NAME` where `NAME` is
something descriptive. The pattern name might then simply be "Log
status function" with notes that names can be applied for clarity.
