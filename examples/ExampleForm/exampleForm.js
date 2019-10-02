import React, { useState } from "../../node_modules/react";
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

const ExampleForm = () => {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  return (
    <form>
      <FormattedInput
        value={phone}
        formatter={createFormat(phoneFormats, "_")}
        onChange={rawValue => setPhone(rawValue)}
      />
      <FormattedInput
        value={date}
        formatter={createFormat(dateFormats, "x")}
        onChange={rawValue => setDate(rawValue)}
      />
    </form>
  );
};

export default ExampleForm;
