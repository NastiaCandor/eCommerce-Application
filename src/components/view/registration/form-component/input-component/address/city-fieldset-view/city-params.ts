const CityInputParams = {
  input: {
    type: 'text',
    minLength: '1',
    pattern: '^[a-zA-Z]+$',
  },

  label: {
    for: 'city',
    textContent: 'City',
  },

  forId: {
    ship: 'city-ship',
    bill: 'city-bill',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default CityInputParams;
