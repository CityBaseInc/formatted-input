import React from "../../node_modules/react";
import { FormattedInput, createFormat } from "../../src";
import {
  required,
  matchesField,
  onlyIntegers,
  numberLessThan,
  hasLength
} from "redux-freeform";

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

const creditCardFormats = [
  "",
  "~",
  "~~",
  "~~~",
  "~~~~",
  "~~~~ ~",
  "~~~~ ~~",
  "~~~~ ~~~",
  "~~~~ ~~~~",
  "~~~~ ~~~~ ~",
  "~~~~ ~~~~ ~~",
  "~~~~ ~~~~ ~~~",
  "~~~~ ~~~~ ~~~~",
  "~~~~ ~~~~ ~~~~ ~",
  "~~~~ ~~~~ ~~~~ ~~",
  "~~~~ ~~~~ ~~~~ ~~~",
  "~~~~ ~~~~ ~~~~ ~~~~"
];

const moneyFormats = [
  "",
  "$_",
  "$__",
  "$___",
  "$_,___",
  "$__,___",
  "$___,___",
  "$_,___,___",
  "$__,___,___",
  "$___,___,___"
];

const nameFieldErrorMessages = {
  [required.error]: "name is required"
};
const confirmNameFieldErrorMessages = {
  [required.error]: "confirm name is required",
  [matchesField.error]: "confirm name must match name"
};
const ageFieldErrorMessages = {
  [required.error]: "age is required",
  [onlyIntegers.error]: "age must be a whole number",
  [numberLessThan.error]: "age must be less than 99"
};
const fourDigitCodeErrorMessages = {
  [required.error]: "four digit code is required",
  [hasLength.error]: "four digit code must be 4 numbers"
};
const dateFieldErrorMessages = {
  [required.error]: "date is required",
  [hasLength.error]: "date must match mm/dd/yyyy"
};
const phoneFieldErrorMessages = {
  [required.error]: "phone is required",
  [hasLength.error]: "phone must be between 11 and 13 digits"
};
const creditCardFieldErrorMessages = {
  [required.error]: "credit card is required",
  [hasLength.error]: "credit card must be 16 numbers"
};
const moneyFieldErrorMessages = {
  [required.error]: "money is required",
  [hasLength.error]: "gotta enter some money"
}

const InputField = ({
  labelTextWhenNoError,
  field,
  fieldActions,
  errorMessages
}) => (
  <div>
    <div>
      <label>
        {field.hasErrors
          ? errorMessages[field.errors[0]]
          : labelTextWhenNoError}
      </label>
    </div>
    <input
      value={field.rawValue}
      onChange={e => fieldActions.set(e.target.value)}
    />
    {!field.dirty && " ✴️"}
    {field.dirty && field.hasErrors && " ❌"}
    {field.dirty && !field.hasErrors && " ✅"}
    <p />
  </div>
);

const FormattedInputField = ({
  labelTextWhenNoError,
  field,
  fieldActions,
  errorMessages,
  formatter
}) => (
  <div>
    <div>
      <label>
        {field.hasErrors
          ? errorMessages[field.errors[0]]
          : labelTextWhenNoError}
      </label>
    </div>
    <FormattedInput
      value={field.rawValue}
      formatter={formatter}
      onChange={e => fieldActions.set(e)}
    />
    {!field.dirty && " ✴️"}
    {field.dirty && field.hasErrors && " ❌"}
    {field.dirty && !field.hasErrors && " ✅"}
    <p />
  </div>
);

const ReduxFreeformExample = ({ actions, fields }) => {
  return (
    <div>
      <InputField
        field={fields.name}
        fieldActions={actions.fields.name}
        labelTextWhenNoError="name"
        errorMessages={nameFieldErrorMessages}
      />
      <InputField
        field={fields.confirmName}
        fieldActions={actions.fields.confirmName}
        labelTextWhenNoError="confirm name"
        errorMessages={confirmNameFieldErrorMessages}
      />
      <InputField
        field={fields.age}
        fieldActions={actions.fields.age}
        labelTextWhenNoError="age"
        errorMessages={ageFieldErrorMessages}
      />
      <InputField
        field={fields.fourDigitCode}
        fieldActions={actions.fields.fourDigitCode}
        labelTextWhenNoError="four digit code"
        errorMessages={fourDigitCodeErrorMessages}
      />
      <FormattedInputField 
        field={fields.date}
        fieldActions={actions.fields.date}
        labelTextWhenNoError="date"
        errorMessages={dateFieldErrorMessages}
        formatter={createFormat(dateFormats, "x")}
      />
      <FormattedInputField 
        field={fields.phone}
        fieldActions={actions.fields.phone}
        labelTextWhenNoError="phone"
        errorMessages={phoneFieldErrorMessages}
        formatter={createFormat(phoneFormats, "_")}
      />
      <FormattedInputField 
        field={fields.creditCard}
        fieldActions={actions.fields.creditCard}
        labelTextWhenNoError="credit card"
        errorMessages={creditCardFieldErrorMessages}
        formatter={createFormat(creditCardFormats, "~")}
      />
      <FormattedInputField 
        field={fields.money}
        fieldActions={actions.fields.money}
        labelTextWhenNoError="money"
        errorMessages={moneyFieldErrorMessages}
        formatter={createFormat(moneyFormats, "_")}
      />
      <button onClick={() => actions.form.clear()}>Clear the form</button>
    </div>
  );
};

export default ReduxFreeformExample;
