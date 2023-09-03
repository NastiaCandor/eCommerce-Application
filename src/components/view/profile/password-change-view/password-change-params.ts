const PasswordChangeParams = {
  form: {
    tag: 'form',
    cssClasses: ['basic-info-form', 'profile-section__wrapper'],
  },

  heading: {
    tag: 'h4',
    cssClasses: ['wrapper__hdn', 'profile__hdn'],
    text: 'Reset your password',
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

  label: {
    currPassword: { for: 'current-password', textContent: 'Current password' },
    newPassword: { for: 'new-password', textContent: 'New password' },
    confirmPassword: { for: 'confirm-password', textContent: 'Confirm new password' },
  },

  input: {
    currPassword: { id: 'current-password' },
    newPassword: { id: 'new-password' },
    confirmPassword: { id: 'confirm-password' },
  },

  updateSuccessMessage: 'Your password was updated successfully!',
  wrongCurrPasswordErrorMessage: 'Your current password is incorrect',
  noMatchErrorMessage: 'Passwords do not match',
  errorMessage: 'Something went wrong. Please try again',
};

export default PasswordChangeParams;
