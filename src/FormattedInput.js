import React, { useState, useLayoutEffect, useRef } from "react";
import {
  format,
  unformat,
  getUniqueFormatDelimeters,
  formattedToUnformattedIndex,
  unformattedToFormattedIndex
} from "./Utils";

export const createFormat = (name, formats, formatChar) => {
  return {
    name,
    type: `formatter/${name.toUpperCase()}`,
    uniqueDelimeters: getUniqueFormatDelimeters(formats, formatChar),
    formats: formats,
    formatChar: formatChar
  };
};

const FormattedInput = ({ value, formatter, onChange, props }) => {
  const inputEl = useRef(null);
  const [state, setState] = useState({
    selectionStart: 0,
    selectionEnd: 0
  });
  useLayoutEffect(() => {
    if (inputEl.current) {
      inputEl.current.setSelectionRange(
        state.selectionStart,
        state.selectionEnd
      );
    }
  });
  return (
    <div>
      <input
        ref={inputEl}
        value={format(formatter)(value.rawValue)}
        {...props}
        onKeyDown={event => {
          setState({
            selectionStart: event.target.selectionStart,
            selectionEnd: event.target.selectionEnd
          });
        }}
        onChange={event => {
          const unformattedNewValue = unformat(formatter.uniqueDelimeters)(
            event.target.value
          );

          const lengthDifference =
            unformattedNewValue.length - value.rawValue.length;

          const rawIndex =
            formattedToUnformattedIndex(
              state.selectionStart,
              value.rawValue,
              formatter
            ) + lengthDifference;

          const newFormattedCursorPosition =
            state.selectionStart == state.selectionEnd
              ? unformattedToFormattedIndex(
                  rawIndex,
                  unformattedNewValue,
                  formatter
                )
              : state.selectionStart;

          setState({
            selectionStart: newFormattedCursorPosition,
            selectionEnd: newFormattedCursorPosition
          });
          if (onChange) {
            onChange(unformattedNewValue);
          }
        }}
      />
    </div>
  );
};

export default FormattedInput;
