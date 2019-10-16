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

const countDelims = (formatter, index) => {
  let count = 0;
  const format = formatter.formats[index];
  if (!format) return 0;
  formatter.uniqueDelimeters.forEach(delim => count += format.split(delim).length - 1);
  return count;
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
  const maxFormatExceeded = rawValue.length >= formatter.formats.length;
  if (maxFormatExceeded) {
    return formattedIndex;
  } else {
    const formatString = formatter.formats[rawValue.length];
    const beforeString = formatString.slice(0, formattedIndex);
    return beforeString.split("").filter(c => c === formatter.formatChar)
      .length;
  }
};

export const unformattedToFormattedIndex = (rawIndex, rawValue, formatter) => {
  const maxFormatExceeded = rawValue.length >= formatter.formats.length;
  // if forced to stay formatted, offset by delims - 1
  if (maxFormatExceeded) {
    const delims = countDelims(formatter, rawValue.length - 1);
    return delims > 0 ? rawIndex + delims - 1 : rawIndex;
  } else {
    return (
      formatter.formats[rawValue.length]
        .split(formatter.formatChar)
        .slice(0, rawIndex)
        .reduce((acc, curr) => curr.length + acc, 0) + rawIndex
    );
  }
};
