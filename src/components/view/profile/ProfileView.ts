// import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import profileParams from './profile-params';
import BasicInfoView from './basic-info/BasicInfoView';
import BillAdrsView from './bill-adrs-view/BillAdrsView';
import ShipAdrsView from './ship-adrs-view/ShipAdrsView';
import Router from '../../router/Router';
import ElementCreator from '../../utils/ElementCreator';

export default class ProfileView extends View {
  private router: Router;

  constructor(router: Router) {
    super(profileParams.section);
    this.router = router;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const sideMenu = this.addSidemenu();
    this.addInnerElement(sideMenu);
    const formsWrapper = new ElementCreator(profileParams.wrapper);
    this.addInnerElement(formsWrapper);
    const basicInfoForm = new BasicInfoView();
    formsWrapper.addInnerElement(basicInfoForm);
    const billAdrsForm = new BillAdrsView();
    formsWrapper.addInnerElement(billAdrsForm);
    const shipAdrsForm = new ShipAdrsView();
    formsWrapper.addInnerElement(shipAdrsForm);
  }

  private addSidemenu(): ElementCreator {
    const sideMenuWrapper = new ElementCreator(profileParams.aside);
    return sideMenuWrapper;
  }
}
