import ElementCreator from '../../../../../../utils/element-creator';
import View from '../../../../../view';
import fieldsetParams from '../../input-params';
import CheckboxInputParams from './checkbox-params';

export default class CheckboxView extends View {
  public sameAdrs: boolean;

  constructor() {
    super(fieldsetParams.fieldset);
    this.render();
    this.sameAdrs = false;
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFieldsetItems();
    this.setCssClasses(CheckboxInputParams.fieldset);
  }

  public insertFieldsetItems(): void {
    // const input = this.createInput(CheckboxInputParams.input.type);
    // this.addInnerElement(input);
    // this.changeChecked(input);
  }

  public createInput(type: string, id: string): void {
    const input = new ElementCreator(CheckboxInputParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('required', fieldsetParams.input.required);
    this.addInnerElement(input);
  }

  public createLabel(forAttr: string, text: string): void {
    const label = new ElementCreator(fieldsetParams.label);
    label.setAttribute('for', forAttr);
    label.setTextContent(text);
    this.addInnerElement(label);
  }

  private changeChecked(element: HTMLInputElement) {
    element.addEventListener('change', () => {
      if (!this.sameAdrs) {
        this.sameAdrs = true;
      } else this.sameAdrs = false;
    });
  }
}
