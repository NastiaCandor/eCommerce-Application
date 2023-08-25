/* eslint-disable @typescript-eslint/ban-ts-comment */
import PostcodeInputView from '../src/components/view/registration/form-component/input-component/address/postcode-fieldset-view/postcode-input-view';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('PostcodeClass', () => {
  let postcodeInput = new PostcodeInputView();

  beforeEach(() => {
    postcodeInput = new PostcodeInputView();
  });

  it('Postcode InputView should be an ElementCreator instance', () => {
    expect(postcodeInput).toBeInstanceOf(ElementCreator);
  });

  it('should return an input element with proper attribute', () => {
    // @ts-ignore
    expect(postcodeInput.createInput('text').getAttribute('minLength')).toBe('1');
  });

  it('should create a label element with proper text content', () => {
    // @ts-ignore
    expect(postcodeInput.createLabel('label text').getElement().textContent).toBe('label text');
  });

  it('should return the proper instance of element', () => {
    // @ts-ignore
    expect(postcodeInput.createErrorText()).toBeInstanceOf(HTMLElement);
  });
});
