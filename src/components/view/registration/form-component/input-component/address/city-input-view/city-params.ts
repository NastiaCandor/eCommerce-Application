const CityInputParams = {
  input: {
    type: 'text',
    id: 'city',
    minLength: '1',
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    pattern: '/^p{L}+$/u',
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
