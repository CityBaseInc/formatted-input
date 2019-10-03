---
id: intro
title: Intro
sidebar_label: Intro
---


FormattedInput is a small component library which will allow you to design a custom input format and apply it to a form field. No matter the type of formatting your form needs, you are able to customize what type of format the input takes and the symbols being used in between the characters or digits.

The library contains two features. The first is the `createFormat` function which allows the developer to customize a formatter to their liking. The second is the FprmattedInput component, which consumes the output formatter. FormattedInput, which like the basic input element, is a [controlled component](https://reactjs.org/docs/forms.html#controlled-components), which means that the React component utilizing it is the source of truth for its value.

FormattedInput is purely a cosmetic UI component, meaning that the raw value of the user's input is preserved underneath the hood.
