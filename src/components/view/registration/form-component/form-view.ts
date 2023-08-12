import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import formParams from './form-params';
import EmailInputView from './input-component/email-input-view.ts/email-input-view';

export default class FormView extends View {
  private emailInput: EmailInputView;

  constructor() {
    super(formParams.form);
    this.emailInput = new EmailInputView();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFormItems();
    this.setAttribute('novalidate', 'true');
    this.validateInput();
  }

  private insertFormItems(): void {
    this.addInnerElement(this.emailInput);
    const submitBtn = this.createSubmitBtn();
    this.addInnerElement(submitBtn);
  }

  private validateInput(): void {
    const formEl = this.getElement();
    const input = this.emailInput.getElement().children[1] as HTMLInputElement;
    const errorSpan = this.emailInput.getElement().children[2] as HTMLElement;
    formEl.addEventListener('submit', (event) => {
      if (!input.validity.valid) {
        this.emailInput.showError(input, errorSpan);
        event.preventDefault();
      }
    });
  }

  private createSubmitBtn(): ElementCreator {
    const btn = new ElementCreator(formParams.button);
    btn.setType(formParams.button.type);
    btn.setTextContent(formParams.button.textContent);
    return btn;
  }

  // private createInputItems(items: string[]): ElementCreator[] {
  //   const inputsArray: ElementCreator[] = [];
  //   items.forEach((item, i) => {
  //     const label = new ElementCreator(formParams.label);
  //     const input = new ElementCreator(formParams.input);
  //     label.setTextContent(item);
  //     label.addInnerElement(input);
  //     input.setType(formParams.inputTypes[i]);
  //     // input.setPatternAttr(formParams.input.pattern);
  //     input.setRequiredAttr(formParams.input.required); // ??????????
  //     inputsArray.push(label);
  //   });
  //   return inputsArray;
  // }
}
