---
title: Scopes
link: /scopes/
description: Scopes are categories for patterns.
---

Each pattern should be classified within a scope. The scopes below
define how patterns apply to TensorFlow. They can be modified freely,
but should be as distilled as possible to avoid overlapping concerns.

## Code convention

Code convention patterns apply to the TensorFlow code is structured
and written.

Related scopes include *Design convention* and *Function*. Design
conventions apply at a higher level than code conventions. Functions
name specific types of functions that may be implemented rather than
the conventions used by those functions.

## Design convention

A design convention is a high level pattern that describes an
approach, methodology, or philosophy that can be applied to TensorFlow
development.

If a convention can be applied to source code, it consider placing it
in the *Code convention* scope.

## Function

A function pattern is a specific type of function used in a TensorFlow
script. There may be variations within a type of function, but the
pattern must nonetheless apply to the naming and purpose of a module
function.

## Tensor/Operation

Patterns that name and describe specific tensors or operations should
be placed in this scope. The intent of this scope is to drive toward
consistency in naming conventions where possible. Obviously each model
presents its own naming conventions, but common themes should be named
as Tensor/Operation patterns.

## Workflow

Workflow patterns describe steps in TensorFlow work. Workflow steps
may be implemented as scripts, functions, parameterized behavior
(e.g. driven by flag values) or may be outside a TensorFlow coding
context entirely (e.g. setting up hardware, system libraries, etc.)
