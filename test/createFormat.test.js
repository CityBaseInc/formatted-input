import test from 'ava';
import { createFormat } from '../src/FormattedInput';

test("creates a formatter correctly", t => {
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
  const phoneFormatsPlaceholder = "_";
  const formatter = createFormat(phoneFormats, phoneFormatsPlaceholder);
  const expectedUniqueDelimiters = ["+", " ", "(", ")", "-"];
  t.is(formatter.formatChar, phoneFormatsPlaceholder);
  t.is(formatter.formats, phoneFormats);
  t.is(formatter.uniqueDelimeters, expectedUniqueDelimiters);
});

test("creates a formatter correctly with a different placeholder", t => {
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
  const dateFormatsPlaceholder = "x";
  const formatter = createFormat(dateFormats, dateFormatsPlaceholder);
  const expectedUniqueDelimiters = ["/"];
  t.is(formatter.formatChar, dateFormatsPlaceholder);
  t.is(formatter.formats, dateFormats);
  t.is(formatter.uniqueDelimeters, expectedUniqueDelimiters);
});
