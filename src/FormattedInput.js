import React, { useState, useLayoutEffect, useRef } from "react";
import {
  format,
  unformat,
  inject,
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
    delete: false,
    formattedValue: format(formatter)(value)
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
          rawValue: value,
          selectionStart: event.target.selectionStart,
          selectionEnd: event.target.selectionEnd,
          delete: event.key === "Backspace" || event.key === "Delete",
          formattedValue: event.target.value
        });
      }}
      onChange={event => {
        var injectionLength =
          event.target.value.length - state.formattedValue.length;
        const end =
          state.selectionStart === state.selectionEnd
            ? state.selectionStart + injectionLength
            : state.selectionEnd - 1;
        const injection = event.target.value.substring(
          state.selectionStart,
          end
        );

        const rawInjectionPointStart = formattedToUnformattedIndex(
          state.selectionStart,
          state.rawValue,
          formatter
        );
        const rawInjectionPointEnd = formattedToUnformattedIndex(
          state.selectionEnd,
          state.rawValue,
          formatter
        );
        const unformattedOldValue = unformat(formatter)(
          state.formattedValue,
          state.rawValue.length
        );

        const injectIntoOldValue = inject(unformattedOldValue);
        const unformattedNewValue = state.delete
          ? rawInjectionPointStart === rawInjectionPointEnd
            ? injectIntoOldValue(
                rawInjectionPointStart - 1,
                rawInjectionPointStart,
                ""
              )
            : injectIntoOldValue(
                rawInjectionPointStart,
                rawInjectionPointEnd,
                ""
              )
          : injectIntoOldValue(
              rawInjectionPointStart,
              rawInjectionPointEnd,
              injection
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
          rawValue: state.rawValue,
          delete: false,
          formattedValue: state.formattedValue
        });
        if (onChange) {
          onChange(unformattedNewValue);
        };
      }}
    />
  );
};

export default FormattedInput;
