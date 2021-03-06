---
title: PEP-8 style guide
scope: Code convention
summary: >

    Follow the PEP 8 Python style guide unless otherwise specified.

---

Unless your project calls for specific exceptions, use Python's
generally accepted standards for coding style rules:

**[PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)**

Some notable standards:

- Use spaces for indentation
- Limit lines to 79 characters or less
- Use four spaces for each level of indentation

There's quite a bit more in the guide that may apply to your project!

Style guides can be debated endlessly, but consideration of style is
useful if it improves the readability and maintainability of source
code. This pattern advocates for a consistent style guide to
encourage collaboration across TensorFlow projects by multiple
independent contributors.

## Notes

We can document exceptions to PEP 8 as patterns comes up, listing them
in *Related patterns* here.

It might be helpful to provide a Pylint configuration file, if folks
have any interest in a formal definition.
