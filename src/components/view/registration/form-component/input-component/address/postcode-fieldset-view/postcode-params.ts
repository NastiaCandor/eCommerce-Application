const PostcodeInputParams = {
  input: {
    type: 'text',
    id: 'postcode',
    minLength: '1',
    cssClassesInvalid: 'reg-form__input-invalid',
  },

  label: {
    for: 'postcode',
    textContent: 'Postcode',
  },

  errorSpan: {
    tag: 'span',
    cssClasses: 'reg-form__error',
    cssClassesActive: 'reg-form__error-active',
  },
};
export default PostcodeInputParams;
