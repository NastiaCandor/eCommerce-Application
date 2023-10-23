const fieldsetParams = {
  fieldset: {
    tag: 'fieldset',
    cssClasses: ['reg-form__fieldset'],
  },

  input: {
    tag: 'input',
    cssClasses: ['reg-form__input'],
    required: 'true',
  },

  select: {
    tag: 'select',
    cssClasses: ['reg-form__select'],
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
};
export default fieldsetParams;
