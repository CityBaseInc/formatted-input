import React, { useState } from "../../node_modules/react";
import { createFormat, FormattedInput } from "../../src";

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

export default ExampleForm;
