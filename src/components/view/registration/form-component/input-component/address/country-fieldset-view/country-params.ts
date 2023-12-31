const CountryInputParams = {
  input: {
    type: 'text',
    id: 'country',
  },

  forId: {
    ship: 'country-ship',
    bill: 'country-bill',
  },

  option: {
    tag: 'option',
    cssClasses: ['country__option'],
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

  countries: [
    {
      countryName: 'Please choose a country',
      code: '',
    },
    {
      countryName: 'Russia (Россия)',
      code: 'RU',
    },
    {
      countryName: 'United States',
      code: 'US',
    },
    {
      countryName: 'Belarus (Беларусь)',
      code: 'BY',
    },
    {
      countryName: 'Australia',
      code: 'AU',
    },
    {
      countryName: 'Canada',
      code: 'CA',
    },
    {
      countryName: 'Ukraine (Україна)',
      code: 'UA',
    },
    {
      countryName: 'Germany (Deutschland)',
      code: 'DE',
    },
  ],
};
export default CountryInputParams;
