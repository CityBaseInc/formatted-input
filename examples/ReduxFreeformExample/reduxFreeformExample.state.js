import {
  createFormState,
  matchesField,
  numberLessThan,
  onlyIntegers,
  hasLength,
  required
} from "redux-freeform";

const formConfig = {
  age: {
    validators: [required(), onlyIntegers(), numberLessThan(99)]
  },
  name: {
    validators: [required()]
  },
  confirmName: {
    validators: [required(), matchesField("name")]
  },
  country: {
    defaultValue: "U.S.",
    validators: [required()]
  },
  fourDigitCode: {
    validators: [required(), hasLength(4, 4)],
    constraints: [onlyIntegers(), hasLength(0, 4)]
  },
  date: {
    validators: [required(), hasLength(8, 8)],
    constraints: [onlyIntegers(), hasLength(0, 8)]
  },
  phone: {
    validators: [required(), hasLength(11, 13)],
    constraints: [onlyIntegers(), hasLength(0, 13)]
  },
  creditCard: {
    validators: [required(), hasLength(16, 16)],
    constraints: [onlyIntegers(), hasLength(0, 16)]
  }
};

export const { reducer, mapStateToProps, mapDispatchToProps } = createFormState(
  formConfig
);
