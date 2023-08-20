import CityInputView from '../src/components/view/registration/form-component/input-component/address/city-fieldset-view/city-input-view';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('cityInputView', () => {
  let cityInputView = new CityInputView();

  beforeEach(() => {
    cityInputView = new CityInputView();
  });

  it('cityInputView should be an ElementCreator instance', () => {
    expect(cityInputView).toBeInstanceOf(ElementCreator);
  });

  it('should return the proper instance of input element', () => {
    expect(cityInputView.createInput()).toBeInstanceOf(HTMLInputElement);
  });

  it('should createa lavel of label element with proper text content', () => {
    expect(cityInputView.createLabel('string').getElement().textContent).toBe('string');
  });

  it('should return the proper instance of element', () => {
    expect(cityInputView.createErrorText()).toBeInstanceOf(HTMLElement);
  });
});
