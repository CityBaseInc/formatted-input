FORMATTED INPUT by CB
This Formatted Input is a small component library where user's are able to add custom input formatting to their forms. No matter the type of formatting your form needs, you are able to customize what type of format the input takes and the symbols being used in between the characters or digits. You use the function createFormat, and you pass it two arguments. The first is an array of chronological formats that the input will take on as it gets filled out. The second argument is the format character which is the symbol that will be in between the digits and characters. For instance, when formatting a phone number, you might want to have parentheses around the area code, and then dashes in between the area code, first 3 digits and the last 4 digits. You would pass createFormat the arrary phoneFormats.
```javascript
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
```