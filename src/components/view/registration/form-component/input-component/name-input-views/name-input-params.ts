const nameInputParams = {
  input: {
    type: 'text',
    minLength: '1',
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    pattern: '^[a-zA-Z]+$',
    firstName: {
      id: 'firstName',
    },
    lastName: {
      id: 'lastName',
    },
  },

  label: {
    firstName: {
      for: 'firstName',
      textContent: 'First name',
    },
    lastName: {
      for: 'lastName',
      textContent: 'Last name',
    },
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default nameInputParams;
