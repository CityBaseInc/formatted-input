![header](/img/formatted-input-logo.png)

[![CircleCI](https://circleci.com/gh/CityBaseInc/formatted-input.svg?style=svg&circle-token=5037d4066397bd922d54f2bef98d612a87afd6dd)](https://circleci.com/gh/CityBaseInc/formatted-input)

## What?

Formatted-Input is a small component library which will allow you to design a custom input format and apply it to a form field. No matter the type of formatting your form needs, you are able to customize what type of format the input takes and the symbols being used in between the characters or digits.

The component at the center of the library is FormattedInput, which like the basic input element, is a [controlled component](https://reactjs.org/docs/forms.html#controlled-components), which means that the React component utilizing it is the source of truth for its value.

FormattedInput is purely a cosmetic UI component, meaning that the raw value of the user's input is preserved underneath the hood.

## Why?

Formatted-Input provides the designer with as much control as possible. There are similar packages with more specific contexts (for example, inputs designed to format currency). By requiring each format to be specifically designed, the developer has full control over how the addition of each new character affects the format. See the phone format example below for how adding two characters at the end will affect the placement of characters at the beginning.

## Demo
![Formatted Input Demo](examples/formatted-input-demo.gif)

https://examples.amcconnell.now.sh

## Creating a Formatter

Formatted-Input exposes a `createFormat` function to allow you complete control over what formats the user's input can take (in order). You supply an array of string formats which will be applied to the user's input by swapping out the placeholder character (of your choosing) for the actual value.

```javascript
import { createFormat } from "formatted-input";
const phoneFormats = [
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
const placeholderChar = "_";
const inputFormatter = createFormat(phoneFormats, placeholderChar);
```

## Using FormattedInput

Check the `/examples` folder for a runnable demonstration.

```javascript
import React, { useState } from "react";
import { FormattedInput, createFormat } from "formatted-input";

const dateFormats = [
  "",
  "x",
  "xx/",
  "xx/x",
  "xx/xx/",
  "xx/xx/x",
  "xx/xx/xx",
  "xx/xx/xxx",
  "xx/xx/xxxx"
];

const ExampleForm = () => {
  const [date, setDate] = useState("");
  return (
    <form>
      <FormattedInput
        value={date}
        formatter={createFormat(dateFormats, "x")}
        onChange={rawValue => setDate(rawValue)}
      />
    </form>
  );
};
```
