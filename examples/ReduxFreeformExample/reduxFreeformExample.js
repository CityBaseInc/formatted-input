import React from "../../node_modules/react";
import FormattedInput, { createFormat } from "../../src/FormattedInput";

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


const ReduxFreeformExample = () => {
  return (
    <div>
      <FormattedInput value={""} formatter={createFormat(phoneFormats, "_")} />
      <FormattedInput value={""} formatter={createFormat(dateFormats, "x")}/>
    </div>
  );
};

export default ReduxFreeformExample;
