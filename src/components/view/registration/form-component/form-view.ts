import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import formParams from './form-params';
import EmailInputView from './input-component/email-input-view/email-input-view';
import FirstNameInputView from './input-component/firstName-input-view/firstName-input-view';

export default class FormView extends View {
  private emailInput: EmailInputView;

  private firstNameInput: FirstNameInputView;

  constructor() {
    super(formParams.form);
    this.emailInput = new EmailInputView();
    this.firstNameInput = new FirstNameInputView();
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
    this.addInnerElement(this.firstNameInput);
    const submitBtn = this.createSubmitBtn();
    this.addInnerElement(submitBtn);
  }

  private validateInput(): void {
    const formEl = this.getElement();
    const inputsArr = this.getInputsArr();
    const spansArr = this.getSpansArr();
    for (let i = 0; i < inputsArr.length; i += 1) {
      this.submitInvalid(formEl, inputsArr[i], spansArr[i]);
    }
  }

  private getInputsArr(): HTMLInputElement[] {
    const inputsArr = [];
    const inputEmail = this.emailInput.getElement().children[1] as HTMLInputElement;
    const inputFirstName = this.firstNameInput.getElement().children[1] as HTMLInputElement;
    inputsArr.push(inputEmail);
    inputsArr.push(inputFirstName);
    return inputsArr;
  }

  private getSpansArr(): HTMLElement[] {
    const spansArr = [];
    const errorSpanEmail = this.emailInput.getElement().children[2] as HTMLElement;
    const errorSpanFName = this.firstNameInput.getElement().children[2] as HTMLElement;
    spansArr.push(errorSpanEmail);
    spansArr.push(errorSpanFName);
    return spansArr;
  }

  private submitInvalid(el: HTMLElement, input: HTMLInputElement, errorMessage: HTMLElement): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    el.addEventListener('submit', (el) => {
      if (!input.validity.valid) {
        this.emailInput.showError(input, errorMessage);
        el.preventDefault();
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
// formEl.addEventListener('submit', (event) => {
//   if (!input.validity.valid) {
//     this.emailInput.showError(input, errorSpan);
//     event.preventDefault();
//   }
// });
