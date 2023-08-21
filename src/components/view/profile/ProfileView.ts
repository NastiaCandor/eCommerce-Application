import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import profileParams from './profile-params';

export default class ProfileView extends View {
  constructor() {
    super(profileParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    this.addInnerElement(new ElementCreator(profileParams.wrapper));
  }
}
