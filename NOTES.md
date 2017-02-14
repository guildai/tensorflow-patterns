# Internal project notes

## Stuff to possibly add to contribution guide

We don't want to get heavy handed, but it might be useful to add some
specifics to the project methodology/contribution guide.

- Procedure on spell checking
- Procedure on how to work with the template
  - Follow section order
  - When to include various sections

## Misc TODO

- Find a repeatable pattern as the banner - ala TensorHub's tag
  backgrounds.

## Problems

The name "loss variable" is not what we want I think. This should
probably by either loss operation or loss tensor. In this case we mean
Python variable, but this conflicts with TF variables. Loss is
certainly not a TF variable.

## Pattern ideas

### Lots of functions

Scope: coding convention

See notes associated with *Function defined globals*.

### Train in step + 1 range

Scope: Coding convention

Not sure if this is worth of a pattern, but it's noteworthy.

This pattern lets you exercise the training and logging loop one last
time to capture a final training status.

The loop looks like this:

```
for step in range(steps + 1):
    ...
```

### Convention over framework

Scope: Design convention

This is controversial certainly, but it is a pattern and should be
named.

*Function defined globals* is an attempt to roll with the patterns in
TF and not create something fundamentally new. One could, for example,
create a facility for applying monadic patterns to everything. But
that's a framework.

It's not necessarily a problem to create a framework, but this pattern
is call to focus on useful coding conventions in the interest of
adding new abstractions that might not justify their cost
(dependencies, complexity, risk, lock in, etc.)

This pattern might introduce a new scope. One of these maybe:

- Philosophy
- High level approach
- Conceptual
- High level convention
- Design convention

The later two in contrast to "coding convention". I tend to like
*Design convention*.

One might presume this as these are *TensorFlow* patterns and not
Keras or TFLearn patterns.

The temptation is to look for patterns in scripts and then turn those
into frameworks. That's of course not necessarily a problem, but it
does come at some cost.

- The framework is a dependency that needs to be provided alongside
  the script --- either as separate module source or as a required
  package.

- Once we start relying on a framework, changes to that framework need
  to be made carefully and communicated.

- There's an ongoing question of whether the framework should be
  upgraded.

- The framework may not do what the script needs, prompting a question
  of how to accommodate the desired behavior. The framework may need
  to be factored to expose new functionality, increasing its
  complexity and undermining its value in the first place.

Conventions, rather than frameworks, present their own challenges.

- Boilerplate is copied throughout a code base, making it very
  difficult to to apply changes across multiple scripts.

- Boilerplate lowers signal-to-noise in source, making it harder to
  understand intended behavior and make changes.

Of course these two options aren't mutually exclusive. It's typically
straight forward to create modules that define functions for
reuse. Provided functions are reasonably granular, it's straight
forward for scripts to use what they need and refine alternatives as
needed. Single modules that codify default behavior need not be
extremely complicated.

This pattern is help in articulating a reasonable starting point for
scripts, which is to use good conventions and build what's needed and
improve incrementally without adopting a framework to start.
