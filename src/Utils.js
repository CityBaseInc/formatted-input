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

export const unformat = formatter => (formattedValue, formatIndex) => {
  if (formatIndex >= formatter.formats.length) {
    return formattedValue;
  }
  const format = formatter.formats[formatIndex];
  return formattedValue
    .split("")
    .filter((_, i) => !(format[i] != formatter.formatChar))
    .join("");
};

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
  if (maxFormatExceeded) {
    return rawIndex;
  } else {
    return (
      formatter.formats[rawValue.length]
        .split(formatter.formatChar)
        .slice(0, rawIndex)
        .reduce((acc, curr) => curr.length + acc, 0) + rawIndex
    );
  }
};
