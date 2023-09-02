// import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
// import profileParams from '../profile-params';
import ShipAdrsParams from './ship-adrs-view-params';

export default class ShipAdrsView extends View {
  constructor() {
    super(ShipAdrsParams.form);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    // const profileWrapper = new ElementCreator(profileParams.wrapper);
    // // profileWrapper.addInnerElement(new FormView());
    // this.addInnerElement(profileWrapper);
  }
}
