const formParams = {
  form: {
    tag: 'form',
    cssClasses: ['reg-form'],
  },
  input: {
    tag: 'input',
    cssClasses: ['reg-form__input'],
  },

  label: {
    tag: 'label',
    cssClasses: ['reg-form__label'],
  },

  labelNames: ['Email', 'First name', 'Last name', 'Date of birth', 'Street', 'City', 'Postcode', 'Country'],
  inputTypes: ['email', 'Text', 'Text', 'Date', 'Text', 'Text', 'Text', 'Country'],
};

export default formParams;
