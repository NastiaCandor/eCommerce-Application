import CountryInputView from '../src/components/view/registration/form-component/input-component/address/country-fieldset-view/country-input-view';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('cityInputView', () => {
  let countryInputView = new CountryInputView();

  beforeEach(() => {
    countryInputView = new CountryInputView();
  });

  it('countryInputView should be an ElementCreator instance', () => {
    expect(countryInputView).toBeInstanceOf(ElementCreator);
  });

  it('should return a select element with proper attribute', () => {
    expect(countryInputView.createInput().getAttribute('required')).toBe('true');
  });

  const mockedElementDOM = { value: 'this value' } as unknown as HTMLSelectElement;

  it('should return a value lavel of an element', () => {
    expect(countryInputView.getValue(mockedElementDOM)).toBe('this value');
  });

  it('should return the proper instance of element', () => {
    expect(countryInputView.createOption('', '')).toBeInstanceOf(HTMLElement);
  });

  it('should return the proper instance of element', () => {
    expect(countryInputView.createErrorText()).toBeInstanceOf(HTMLElement);
  });
});
