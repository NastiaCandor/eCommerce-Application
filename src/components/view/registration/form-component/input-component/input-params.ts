const inputParams = {
  fieldset: {
    tag: 'fieldset',
    cssClasses: ['reg-form__fieldset'],
  },

  input: {
    tag: 'input',
    cssClasses: ['reg-form__input'],
    required: 'true',
  },

  label: {
    tag: 'label',
    cssClasses: ['reg-form__label'],
  },

  errorSpan: {
    tag: 'span',
    cssClasses: ['reg-form__error'],
  },

  button: {
    tag: 'button',
    cssClasses: ['reg-form__btn'],
    type: 'submit',
    textContent: 'Sign Up',
  },

  labelNames: ['Email', 'First name', 'Last name', 'Date of birth', 'Street', 'City', 'Country', 'Postcode'],
  inputTypes: ['email', 'Text', 'Text', 'Date', 'Text', 'Text', 'Text', 'Text'],
  // inputPatterns: ['', '[A-Za-z]', '[A-Za-z]', '', 'Text', 'Text', 'Text', 'Text'],
};
export default inputParams;
