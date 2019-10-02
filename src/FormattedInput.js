import React, { useState, useLayoutEffect, useRef } from "react";
import {
  format,
  unformat,
  getUniqueFormatDelimeters,
  formattedToUnformattedIndex,
  unformattedToFormattedIndex
} from "./utils";


export const createFormat = (formats, formatChar) => ({
  uniqueDelimeters: getUniqueFormatDelimeters(formats, formatChar),
  formats: formats,
  formatChar: formatChar
});

const FormattedInput = ({ value, formatter, onChange, props }) => {
  const inputEl = useRef(null);
  const [state, setState] = useState({
    selectionStart: 0,
    selectionEnd: 0,
    rawValue: value
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
        value={format(formatter)(value)}
        {...props}
        onKeyDown={event => {
          setState({
            rawValue: state.rawValue,
            selectionStart: event.target.selectionStart,
            selectionEnd: event.target.selectionEnd
          });
        }}
        onChange={event => {
          const unformattedNewValue = unformat(formatter.uniqueDelimeters)(
            event.target.value
          );

          const lengthDifference =
            unformattedNewValue.length - state.rawValue.length;

          const rawIndex =
            formattedToUnformattedIndex(
              state.selectionStart,
              state.rawValue,
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
            selectionEnd: newFormattedCursorPosition,
            rawValue: unformattedNewValue
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
