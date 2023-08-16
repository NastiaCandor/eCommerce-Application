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
    tag: 'label',
    cssClasses: ['reg-form__label'],
    for: 'address-choice',
  },

  labelTextContent: {
    sameAdrs: 'This is also my billing address',
    defaultShip: 'Save as default shipping address',
    defaultBill: 'Save as default billing address',
  },
  span: {
    textContent: 'Please fill in all shipping address fields',
    cssClasses: ['checkbox-adrs__span'],
  },
};
export default CheckboxInputParams;
