---
id: formatted-input
title: FormattedInput
sidebar_label: FormattedInput
---

The cornerstone of this library is the `<FormattedInput>` component, which behaves like a modified <input> element. Similar to how <input> is used in React, FormattedInput is a controlled component, meaning that the singular source of truth about it's value is controlled by whatever parent component is using it (likely a <form>).

The FormattedInput consumes the output of the `createFormat` function as it's `formatter` prop. Like the input element, FormattedInput generally value and onChange props (though they are not strictly required - it might just not do what you want it to). Beyond that, it can accept other props like an input element, including styling features.

## Example Usage

```jsx
import React, { useState } from "react";
import FormattedInput, { createFormat } from "formatted-input";

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
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  return (
    <form>
      <div>
        <FormattedInput
          value={phone}
          formatter={createFormat(phoneFormats, "_")}
          onChange={rawValue => setPhone(rawValue)}
        />
      </div>
      <div>
        <FormattedInput
          value={date}
          formatter={createFormat(dateFormats, "x")}
          onChange={rawValue => setDate(rawValue)}
        />
      </div>
    </form>
  );
};
```
