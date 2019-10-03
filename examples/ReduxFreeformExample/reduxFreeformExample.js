import React from "../../node_modules/react";
import FormattedInput, { createFormat } from "../../src/FormattedInput";
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
      <div>
        <FormattedInput
          value={fields.date.rawValue}
          formatter={createFormat(dateFormats, "x")}
          onChange={e => actions.fields.date.set(e)}
          style={{
            color: "green",
            padding: "4px 4px",
            margin: "4px 4px"
          }}
        />
      </div>
      <div>
        <FormattedInput
          value={fields.phone.rawValue}
          formatter={createFormat(phoneFormats, "_")}
          onChange={e => actions.fields.phone.set(e)}
          style={{
            color: "red",
            padding: "4px 4px",
            margin: "4px 4px"
          }}
        />
      </div>
      <div>
        <FormattedInput
        value={fields.creditCard.rawValue}
        formatter={createFormat(creditCardFormats, "~")}
        onChange={e => actions.fields.creditCard.set(e)}
        />
      </div>
      <button onClick={() => actions.form.clear()}>Clear the form</button>
    </div>
  );
};

export default ReduxFreeformExample;
