const CityInputParams = {
  input: {
    type: 'text',
    id: 'city',
    minLength: '1',
    pattern: '^[a-zA-Z]+$',
  },

  label: {
    for: 'city',
    textContent: 'City',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default CityInputParams;
