const DateInputParams = {
  input: {
    type: 'text',
    id: 'date',
    cssClassesValid: 'reg-form__input-valid',
  },

  label: {
    for: 'date',
    textContent: 'Date of birth',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default DateInputParams;
