import React, { useState, useLayoutEffect, useRef } from "react";
import {
  format,
  unformat,
  getUniqueFormatDelimiters,
  formattedToUnformattedIndex,
  unformattedToFormattedIndex
} from "./Utils";

export const createFormat = (formats, formatChar) => ({
  uniqueDelimiters: getUniqueFormatDelimiters(formats, formatChar),
  formats: formats,
  formatChar: formatChar
});

const FormattedInput = ({ value, formatter, onChange, ...props }) => {
  const inputEl = useRef(null);
  const [state, setState] = useState({
    selectionStart: 0,
    selectionEnd: 0,
    rawValue: value,
    delete: false
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
    <input
      {...props}
      ref={inputEl}
      value={format(formatter)(value)}
      onKeyDown={event => {
        setState({
          rawValue: state.rawValue,
          selectionStart: event.target.selectionStart,
          selectionEnd: event.target.selectionEnd,
          delete: event.key === "Backspace" || event.key === "Delete"
        });
      }}
      onChange={event => {
        const unformattedNewValue = unformat(formatter.uniqueDelimiters)(
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
            : state.delete
            ? state.selectionStart
            : state.selectionEnd;

        setState({
          selectionStart: newFormattedCursorPosition,
          selectionEnd: newFormattedCursorPosition,
          rawValue: unformattedNewValue,
          delete: false
        });
        if (onChange) {
          onChange(unformattedNewValue);
        };
      }}
    />
  );
};

export default FormattedInput;
