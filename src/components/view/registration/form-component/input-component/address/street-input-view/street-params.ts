const StreetInputParams = {
  input: {
    type: 'text',
    id: 'street',
    minLength: '1',
  },

  label: {
    for: 'street',
    textContent: 'Street',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default StreetInputParams;
