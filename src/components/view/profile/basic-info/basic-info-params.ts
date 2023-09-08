const BasicInfoParams = {
  form: {
    tag: 'form',
    cssClasses: ['basic-info-form', 'profile-section__wrapper'],
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

  buttonEditSpan: {
    tag: 'span',
    cssClasses: ['edit-btn_span'],
    textContent: 'Edit',
  },

  fieldset: {
    noDisplay: ['no-display'],
    showDisplay: ['show-display'],
  },

  updateSuccessMessage: 'Your information was updated successfully!',
  errorMessage: 'Something went wrong. Please try again',
};

export default BasicInfoParams;
