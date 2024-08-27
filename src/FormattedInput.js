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
    formattedValue: format(formatter)(value)
  });
  const stateRefs = useRef({
    selectionStart: 0,
    selectionEnd: 0,
    isDelete: false,
    rawValue: '',
  })
  useLayoutEffect(() => {
    // A lot of the work here is cursor manipulation
    if (inputEl.current && inputEl.current === document.activeElement) {
      inputEl.current.setSelectionRange(
        state.selectionStart,
        state.selectionEnd
      );
    }
  });
  const handleChange = (event) => {
    /* At the beginning of onChange, event.target.value is a concat of the previous formatted value
    * and an unformatted injection at the start, end, or in the middle (maybe a deletion). To prepare 
    * the unformatted value for the user's onChange, the formatted string and unformatted injection need
    * to be separated, then unformat the formatted string, then insert (or delete) the injection from the
    * old unformatted value.
    */
    const injectionLength =
      event.target.value.length - state.formattedValue.length;
    const end =
      stateRefs.current.selectionStart === stateRefs.current.selectionEnd
        ? stateRefs.current.selectionStart + injectionLength
        : stateRefs.current.selectionEnd - 1;
    const injection = event.target.value.substring(
      stateRefs.current.selectionStart,
      end
    );
    // Injection is the new unformatted piece of the input
    // Need to find where to put it
    const rawInjectionPointStart = formattedToUnformattedIndex(
      stateRefs.current.selectionStart,
      stateRefs.current.rawValue,
      formatter
    );
    const rawInjectionPointEnd = formattedToUnformattedIndex(
      stateRefs.current.selectionEnd,
      stateRefs.current.rawValue,
      formatter
    );

    // Unformat the previous formatted value for injection
    // Using the relevant format string, strips away chars not marked with the formatChar
    const unformattedOldValue = unformat(formatter)(
      state.formattedValue,
      stateRefs.current.rawValue.length
    );

    // Edit the previous unformatted value (either add, update or delete)
    const injectIntoOldValue = inject(unformattedOldValue);
    const deleteKeyPressed = stateRefs.current.isDelete;
    const unformattedNewValue = deleteKeyPressed
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
      unformattedNewValue.length - stateRefs.current.rawValue.length;

    const rawIndex =
      formattedToUnformattedIndex(
        stateRefs.current.selectionStart,
        stateRefs.current.rawValue,
        formatter
      ) + lengthDifference;

    // Find the new cursor position for the potential formatted value
    // Applied by useLayoutEffect
    const newFormattedCursorPosition =
      stateRefs.current.selectionStart === stateRefs.current.selectionEnd
        ? unformattedToFormattedIndex(
          rawIndex,
          unformattedNewValue,
          formatter,
          deleteKeyPressed
        )
        : deleteKeyPressed
          ? stateRefs.current.selectionStart
          : stateRefs.current.selectionEnd;

    setState({
      selectionStart: newFormattedCursorPosition,
      selectionEnd: newFormattedCursorPosition,
      rawValue: unformattedNewValue,
      formattedValue: format(formatter)(unformattedNewValue),
    });
    // Apply the external onChange function to the raw underlying string
    // This is where the user generally updates the input value
    if (onChange) {
      onChange(unformattedNewValue);
    }
  };

  return (
    <input
      {...props}
      ref={inputEl}
      value={format(formatter)(value)}
      onKeyDown={(event) => {
        // Keep track of the state of the input before onChange
        stateRefs.current = {
          isDelete: event.key === "Backspace" || event.key === "Delete",
          selectionStart: event.target.selectionStart,
          selectionEnd: event.target.selectionEnd,
          rawValue: value,
        }
      }}
      onChange={handleChange}
    />
  );
};

export default FormattedInput;
