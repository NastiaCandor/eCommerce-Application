const CheckboxInputParams = {
  fieldset: ['fieldset-chbx'],

  input: {
    tag: 'input',
    type: 'checkbox',
    id: 'address-choice',
    cssClasses: ['checkbox-adrs'],
    disabled: 'true',
  },

  label: {
    for: 'address-choice',
    textContent: 'This is also my billing address',
  },

  span: {
    textContent: 'Please fill in all shipping address fields',
    cssClasses: ['checkbox-adrs__span'],
  },
};
export default CheckboxInputParams;
