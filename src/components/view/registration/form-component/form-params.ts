const formParams = {
  form: {
    tag: 'form',
    cssClasses: ['reg-form'],
  },

  heading: {
    tag: 'h4',
    cssClasses: ['adrs-wrapper__hdn'],
    shipping: {
      text: 'Shipping Address',
    },
    billing: {
      text: 'Billing Address',
    },
  },

  addressDiv: {
    cssClasses: ['adrs-wrapper'],
  },

  button: {
    tag: 'button',
    cssClasses: ['reg-form__btn'],
    type: 'submit',
    textContent: 'Sign Up',
  },

  fieldset: {
    noDisplay: ['no-display'],
    showDisplay: ['show-display'],
  },
};

export default formParams;
