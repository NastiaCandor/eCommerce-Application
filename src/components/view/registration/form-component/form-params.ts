const formParams = {
  form: {
    tag: 'form',
    cssClasses: ['reg-form'],
  },

  heading: {
    tag: 'h4',
    cssClasses: ['wrapper__hdn'],
    basicInfo: {
      text: 'Create account',
    },
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
  basicInfoDiv: {
    cssClasses: ['info-wrapper'],
  },

  button: {
    tag: 'button',
    cssClasses: ['reg-form__btn', 'button'],
    type: 'submit',
    textContent: 'Sign Up',
  },

  fieldset: {
    noDisplay: ['no-display'],
    showDisplay: ['show-display'],
  },
  signUpMessage: 'Account has been created successfully!',
  errorLoginMessage: 'Login attempt has failed. Please go to the login page and try again',
  errorSignUpMessage: 'Please check your information and try again',
  serverProblemMessage: 'Please check your connection and try again',
};

export default formParams;
