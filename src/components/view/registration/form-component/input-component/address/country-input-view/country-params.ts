const CountryInputParams = {
  input: {
    type: 'text',
    id: 'country',
  },

  label: {
    for: 'country',
    textContent: 'Country',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default CountryInputParams;
