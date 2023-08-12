const firstNameInputParams = {
  input: {
    type: 'text',
    id: 'firstName',
    minLength: '1',
    pattern: '^[a-zA-Z]+$',
  },

  label: {
    for: 'firstName',
    textContent: 'First name',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default firstNameInputParams;
