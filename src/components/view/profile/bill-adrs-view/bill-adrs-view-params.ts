const BillAdrsParams = {
  addressWrapper: {
    tag: 'div',
    cssClasses: ['bill-adrs__wrapper', 'profile-section__wrapper', 'no-show'],
  },

  addressItemsWrapper: {
    tag: 'div',
    cssClasses: ['adrs-items__wrapper'],
  },

  noAddresses: {
    tag: 'div',
    cssClasses: ['no-adrs__wrapper'],
    textContent: "You don't have any billing addresses.",
  },

  form: {
    tag: 'form',
    cssClasses: ['adrs-form', 'profile-form', 'add-adrs-form'],
  },

  heading: {
    tag: 'h4',
    cssClasses: ['wrapper__hdn', 'profile__hdn'],
    text: 'Billing Addresses',
  },

  wrapperTop: {
    tag: 'div',
    cssClasses: ['bill-adrs__top'],
  },

  popUpCloseBtn: {
    tag: 'div',
    cssClasses: ['popup-close__btn'],
  },

  popUpCloseBtnImg: {
    tag: 'div',
    cssClasses: ['popup-close__btn__img'],
    textContent: '+',
  },

  popUpBack: {
    tag: 'div',
    cssClasses: ['popup-back'],
  },
  addressDiv: {
    cssClasses: ['adrs-wrapper'],
  },
  basicInfoDiv: {
    cssClasses: ['info-wrapper'],
  },

  buttonSave: {
    tag: 'button',
    cssClasses: ['save-profile__btn', 'button'],
    type: 'submit',
    textContent: 'Save',
  },

  buttonEdit: {
    tag: 'button',
    cssClasses: ['edit-profile__btn', 'button'],
    type: 'button',
  },
  buttonEditSpan: {
    tag: 'span',
    cssClasses: ['edit-btn_span'],
    textContent: 'Edit',
  },

  buttonEditImg: {
    tag: 'img',
    cssClasses: ['edit-btn__img'],
    alt: 'edit-button',
    src: '../assets/img/pencil.svg',
  },

  fieldset: {
    noDisplay: ['no-display'],
    showDisplay: ['show-display'],
  },

  signInDiv: {
    tag: 'div',
    cssClasses: ['sign-in__wrapper'],
    textContent: 'Returning customer?   ',
  },
  signInLink: {
    tag: 'a',
    cssClasses: ['sign-in__link'],
    textContent: '  Log in!',
  },

  buttonAddAdrs: {
    tag: 'button',
    cssClasses: ['add-adrs__btn', 'button'],
    type: 'button',
  },

  buttonAddAdrsImg: {
    tag: 'img',
    cssClasses: ['add-adrs__location__img'],
    alt: 'location',
    src: '../assets/img/location-pin.svg',
  },

  buttonAddAdrsSpan: {
    tag: 'span',
    cssClasses: ['add-adrs_span'],
    textContent: 'Add new billing address',
  },

  addAddressMessage: 'Billing address was created successfully!',
  addAdrsErrorMessage: 'Please check your information and/or connection and try again',
};

export default BillAdrsParams;
