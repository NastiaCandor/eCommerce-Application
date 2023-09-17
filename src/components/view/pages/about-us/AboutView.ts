import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import contactsParams from './about-params';

export default class ContactsView extends View {
  constructor() {
    super(contactsParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    this.addInnerElement(new ElementCreator(contactsParams.wrapper));
  }
}
