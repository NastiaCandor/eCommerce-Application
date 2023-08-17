import ElementCreator from '../../../../../../utils/ElementCreator';
import View from '../../../../../View';
import fieldsetParams from '../../input-params';
import CheckboxInputParams from './checkbox-params';

export default class CheckboxView extends View {
  // public sameAdrs: boolean;

  constructor() {
    super(fieldsetParams.fieldset);
    this.render();
    // this.sameAdrs = false;
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.setCssClasses(CheckboxInputParams.fieldset);
  }

  public createInput(type: string, id: string): void {
    const input = new ElementCreator(CheckboxInputParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    this.addInnerElement(input);
  }

  public createLabel(forAttr: string, text: string): void {
    const label = new ElementCreator(fieldsetParams.label);
    label.setAttribute('for', forAttr);
    label.setTextContent(text);
    this.addInnerElement(label);
  }

  // public changeChecked(element: HTMLInputElement) {
  //   element.addEventListener('change', () => {
  //     if (!this.sameAdrs) {
  //       this.sameAdrs = true;
  //     } else this.sameAdrs = false;
  //   });
  // }
}
