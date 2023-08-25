const CheckboxInputParams = {
  fieldset: ['fieldset-chbx'],

  input: {
    tag: 'input',
    type: 'checkbox',
    cssClasses: ['checkbox-adrs'],
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

  forId: {
    sameAdrs: 'same-address',
    defaultShip: 'default-ship',
    defaultBill: 'default-bill',
  },

  span: {
    textContent: 'Please fill in all shipping address fields',
    cssClasses: ['checkbox-adrs__span'],
  },
};
export default CheckboxInputParams;
