import test from 'ava';
import { createFormat } from '../src/FormattedInput';
import { phoneFormats, dateFormats } from "./utils";

test("creates a formatter correctly", t => {
  const phoneFormatsPlaceholder = "_";
  const formatter = createFormat(phoneFormats, phoneFormatsPlaceholder);
  const expectedUniqueDelimiters = ["+", " ", "(", ")", "-"];
  t.deepEqual(formatter.formatChar, phoneFormatsPlaceholder);
  t.deepEqual(formatter.formats, phoneFormats);
  t.deepEqual(formatter.uniqueDelimeters, expectedUniqueDelimiters);
});

test("creates a formatter correctly with a different placeholder", t => {
  const dateFormatsPlaceholder = "x";
  const formatter = createFormat(dateFormats, dateFormatsPlaceholder);
  const expectedUniqueDelimiters = ["/"];
  t.deepEqual(formatter.formatChar, dateFormatsPlaceholder);
  t.deepEqual(formatter.formats, dateFormats);
  t.deepEqual(formatter.uniqueDelimeters, expectedUniqueDelimiters);
});
