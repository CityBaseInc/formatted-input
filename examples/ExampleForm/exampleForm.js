import React, { useState } from "react";
import { createFormat, FormattedInput, format } from "formatted-input";

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
  const phoneFormatter = createFormat(phoneFormats, "_");
  const dateFormatter = createFormat(dateFormats, "x");
  const formatPhone = format(phoneFormatter);
  const formatDate = format(dateFormatter);
  return (
    <form>
      <div>
        <FormattedInput
          value={phone}
          formatter={phoneFormatter}
          onChange={rawValue => setPhone(rawValue)}
        />
      </div>
      <div>
        <FormattedInput
          value={date}
          formatter={dateFormatter}
          onChange={rawValue => setDate(rawValue)}
        />
      </div>
      <div>{`Phone: ${formatPhone(phone)}`}</div>
      <div>{`Date: ${formatDate(date)}`}</div>
    </form>
  );
};

export default ExampleForm;
