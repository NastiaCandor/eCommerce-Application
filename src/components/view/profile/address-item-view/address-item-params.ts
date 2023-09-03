const AddressItemParams = {
  wrapper: {
    tag: 'div',
    cssClasses: ['address-item__wrapper'],
  },

  spansImgWrapper: {
    tag: 'div',
    cssClasses: ['spans-img__wrapper'],
  },

  defaultAdrsBtn: {
    tag: 'button',
    cssClasses: ['default-adrs__wrapper'],
    type: 'button',
  },

  form: {
    tag: 'form',
    cssClasses: ['profile-form'],
  },

  heading: {
    tag: 'h4',
    cssClasses: ['wrapper__hdn', 'profile__hdn'],
    text: 'Personal details',
  },

  wrapperTop: {
    tag: 'div',
    cssClasses: ['profile__top'],
  },

  buttonSave: {
    tag: 'button',
    cssClasses: ['save-profile__btn', 'button'],
    type: 'submit',
    textContent: 'Save',
  },

  leftInnerWrapper: {
    tag: 'div',
    cssClasses: ['left-inner__wrapper'],
  },

  rightInnerWrapper: {
    tag: 'div',
    cssClasses: ['right-inner__wrapper'],
  },

  buttonEdit: {
    tag: 'button',
    cssClasses: ['edit-profile__btn', 'button'],
    type: 'button',
  },

  buttonEditImg: {
    tag: 'img',
    cssClasses: ['edit-btn__img'],
    alt: 'edit-button',
    src: '../assets/img/pencil.svg',
  },

  buttonDelete: {
    tag: 'button',
    cssClasses: ['delete-profile__btn', 'button'],
    type: 'button',
  },

  buttonDeleteImg: {
    tag: 'img',
    cssClasses: ['delete-btn__img'],
    alt: 'delete-button',
    src: '../assets/img/delete.svg',
  },

  fieldset: {
    noDisplay: ['no-display'],
    showDisplay: ['show-display'],
  },

  adrsLocationImg: {
    tag: 'img',
    cssClasses: ['location__img'],
    alt: 'location',
    src: '../assets/img/location-pin.svg',
  },

  addressInnerWrapper: {
    tag: 'div',
    cssClasses: ['address-item__inner-wrapper'],
  },

  addressSpanStreet: {
    tag: 'span',
    cssClasses: ['address-span', 'address-span_street'],
  },

  addressSpanCountry: {
    tag: 'span',
    cssClasses: ['address-span', 'address-span_country'],
  },

  addressSpanPostcode: {
    tag: 'span',
    cssClasses: ['address-span', 'address-span_postcode'],
  },

  addressSpanCity: {
    tag: 'span',
    cssClasses: ['address-span', 'address-span_city'],
  },

  updateAdrsMessage: 'Billing address was changed successfully',
  updateErrorAdrsMessage: 'Something went wrong. Please try again',
  deleteAdrsMessage: 'Billing address was deleted successfully',
  setDefaultAdrsMessage: 'Default billing address was updated successfully',
};

export default AddressItemParams;
