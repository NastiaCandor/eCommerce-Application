import CheckboxView from '../src/components/view/registration/form-component/input-component/address/checkbox-view/checkbox-view';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('checkboxView', () => {
  let checkboxView = new CheckboxView();

  beforeEach(() => {
    checkboxView = new CheckboxView();
  });

  it('CheckboxView should be an ElementCreator instance', () => {
    expect(checkboxView).toBeInstanceOf(ElementCreator);
  });
});
