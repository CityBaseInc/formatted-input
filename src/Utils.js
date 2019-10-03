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
  const maxFormatExceeded = rawValue.length >= formatter.formats.length - 2;
  if (maxFormatExceeded) {
    return formattedIndex + formatter.uniqueDelimeters.length + 1;
  } else {
    const formatString = formatter.formats[rawValue.length];
    const beforeString = formatString.slice(0, formattedIndex);
    return (
      beforeString.split("").filter(c => c === formatter.formatChar).length
    );
  }
};

export const unformattedToFormattedIndex = (rawIndex, rawValue, formatter) => {
  const maxFormatExceeded = rawValue.length >= formatter.formats.length - 1;
  if (maxFormatExceeded) {
    return rawIndex + formatter.uniqueDelimeters.length + 1;
  } else {
    return (
      formatter.formats[rawValue.length]
        .split(formatter.formatChar)
        .slice(0, rawIndex)
        .reduce((acc, curr) => curr.length + acc, 0) + rawIndex
    );
  }
};
