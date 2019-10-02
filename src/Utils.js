export const getUniqueFormatDelimeters = (formats, formatChar) => [
  ...new Set(
    formats
      .join("")
      .split(formatChar)
      .join("")
      .split("")
  )
];

export const format = formatter => value => {
  const usedFormat = formatter.formats[value.length];
  if (!usedFormat) {
    return value;
  }
  const formatPieces = usedFormat.split(formatter.formatChar);
  const valuePieces = value.split("");
  const zipped = formatPieces.map((v, i) => v + (valuePieces[i] || ""));
  return zipped.join("");
};

export const unformat = uniqueDelimeters => formattedValue =>
  formattedValue
    .split("")
    .filter(s => !uniqueDelimeters.includes(s))
    .join("");

export const formattedToUnformattedIndex = (
  formattedIndex,
  rawValue,
  formatter
) => {
  const formatString =
    rawValue.length < formatter.formats.length
      ? formatter.formats[rawValue.length]
      : formatter.formats[formatter.formats.length - 1];
  const beforeString = formatString.slice(0, formattedIndex);
  return beforeString.split("").filter(c => c === formatter.formatChar).length;
};

export const unformattedToFormattedIndex = (rawIndex, rawValue, formatter) => {
  const formatString =
    rawValue.length < formatter.formats.length
      ? formatter.formats[rawValue.length]
      : formatter.formats[formatter.formats.length - 1];
  return (
    formatString
      .split(formatter.formatChar)
      .slice(0, rawIndex)
      .reduce((acc, curr) => curr.length + acc, 0) + rawIndex
  );
};
