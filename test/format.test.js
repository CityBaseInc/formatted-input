import test from "ava";
import { createFormat, format } from "../src";
import { phoneFormats } from "./utils";

test("formats a string correctly", t => {
  const phoneFormatsPlaceholder = "_";
  const formatter = createFormat(phoneFormats, phoneFormatsPlaceholder);
  const formatPhone = format(formatter);
  t.is(formatPhone("12345678900"), "+1 (234) 567 - 8900");
});
