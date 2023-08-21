/* eslint-disable @typescript-eslint/ban-ts-comment */
import DateInputView from '../src/components/view/registration/form-component/input-component/date-fieldset-view/date-input-view';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('dateInputView', () => {
  let dateView = new DateInputView();

  beforeEach(() => {
    dateView = new DateInputView();
  });

  it('dateView should be an ElementCreator instance', () => {
    expect(dateView).toBeInstanceOf(ElementCreator);
  });

  it('should return an input element with proper id', () => {
    // @ts-ignore
    expect(dateView.createInput('text', 'date-input-id').getAttribute('id')).toBe('date-input-id');
  });

  it('should create a label element with proper text content', () => {
    // @ts-ignore
    expect(dateView.createLabel('for', 'label text').getElement().textContent).toBe('label text');
  });

  it('should return the proper instance of element', () => {
    // @ts-ignore
    expect(dateView.createErrorText()).toBeInstanceOf(HTMLElement);
  });

  it('should validate date correctly', () => {
    // @ts-ignore
    expect(dateView.checkDate('2015-05-05')).toBeFalsy();
    // @ts-ignore
    expect(dateView.checkDate('20-12-2023')).toBeTruthy();
  });
});
