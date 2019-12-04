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
    // A lot of the work here is cursor manipulation
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
        // Keep track of the state of the input before onChange, including if user is hitting delete
        setState({
          rawValue: value,
          selectionStart: event.target.selectionStart,
          selectionEnd: event.target.selectionEnd,
          delete: event.key === "Backspace" || event.key === "Delete",
          formattedValue: event.target.value
        });
      }}
      onChange={event => {
        /* At the beginning of onChange, event.target.value is a concat of the previous formatted value
         * and an unformatted injection at the start, end, or in the middle (maybe a deletion). To prepare 
         * the unformatted value for the user's onChange, the formatted string and unformatted injection need
         * to be separated, then unformat the formatted string, then insert (or delete) the injection from the
         * old unformatted value.
         */
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
        // Injection is the new unformatted piece of the input
        // Need to find where to put it
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

        // Unformat the previous formatted value for injection
        // Using the relevant format string, strips away chars not marked with the formatChar
        const unformattedOldValue = unformat(formatter)(
          state.formattedValue,
          state.rawValue.length
        );

        // Edit the previous unformatted value (either add, update or delete)
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

        // Find the new cursor position for the potential formatted value
        // Applied by useLayoutEffect
        const newFormattedCursorPosition =
          state.selectionStart == state.selectionEnd
            ? unformattedToFormattedIndex(
                rawIndex,
                unformattedNewValue,
                formatter,
                state.delete
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
        // Apply the external onChange function to the raw underlying string
        // This is where the user generally updates the input value
        if (onChange) {
          onChange(unformattedNewValue);
        }
      }}
    />
  );
};

export default FormattedInput;
