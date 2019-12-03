import test from 'ava';
import { createFormat } from '../src';
import { phoneFormats, dateFormats } from "./utils";

test("creates a formatter correctly", t => {
  const phoneFormatsPlaceholder = "_";
  const formatter = createFormat(phoneFormats, phoneFormatsPlaceholder);
  t.deepEqual(formatter.formatChar, phoneFormatsPlaceholder);
  t.deepEqual(formatter.formats, phoneFormats);
});

test("creates a formatter correctly with a different placeholder", t => {
  const dateFormatsPlaceholder = "x";
  const formatter = createFormat(dateFormats, dateFormatsPlaceholder);
  t.deepEqual(formatter.formatChar, dateFormatsPlaceholder);
  t.deepEqual(formatter.formats, dateFormats);
});
