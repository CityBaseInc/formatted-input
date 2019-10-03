---
id: create-format
title: Creating the Formatter
sidebar_label: Creating the Formatter
---

## createFormat()

`createFormat` is an exposed utility function which creates a configurable formatter object, that is ultimately consumed by the FormattedInput component. The function requires two inputs in order to understand the structure of the format:
- an array of strings representing the formats character-by-character
- a placeholder character, indicating where in the format strings the user-input characters should go

The placeholder character MUST remain constant across all values in the array, so choose something that you don't intent to use in any of the formats (it can be anything as long as it is consistent).

## Example Usage

```javascript
const placeholder = "_";

const formatsArray = [
  "",
  "+_",
  "+_ _",
  "+_ __",
  "+_ (___) ",
  "+_ (___) _",
  "+_ (___) __",
  "+_ (___) ___ - ",
  "+_ (___) ___ - _",
  "+_ (___) ___ - __",
  "+_ (___) ___ - ___",
  "+_ (___) ___ - ____",
  "+__ (___) ___ - ____",
  "+___ (___) ___ - ____"
];

const formatter = createFormat(formatsArray, placeholder)
```

## Explaination

It may seem cumbersome to have to define the formatter piece-by-piece (don't forget the empty string!). The reasoning behind this is that it allows the developer the ability to reconfigure where characters should be positioned as more are sequentially added. In the example above (which is designed for a FormattedInput representing a phone number), the last two array elements extend the size of the country code field as more inputs come in, pushing the characters leftwards without having to assume the user will always have a three digit country code.