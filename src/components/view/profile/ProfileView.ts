import View from '../View';
import ElementCreator from '../../utils/ElementCreator';
import profileParams from './profile-params';
import BasicInfoView from './basic-info/BasicInfoView';
import BillAdrsView from './bill-adrs-view/BillAdrsView';
import ShipAdrsView from './ship-adrs-view/ShipAdrsView';
import PasswordChangeView from './password-change-view/passwordChangeView';
import Router from '../../router/Router';
import ClientAPI from '../../utils/Client';

export default class ProfileView extends View {
  private router: Router;

  private clientAPI: ClientAPI;

  constructor(router: Router, clienAPI: ClientAPI) {
    super(profileParams.section);
    this.router = router;
    this.clientAPI = clienAPI;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const sideMenuWrapper = new ElementCreator(profileParams.aside);
    this.addInnerElement(sideMenuWrapper);
    const nav = this.addSidemenu(profileParams.navItemsNames);
    sideMenuWrapper.addInnerElement(nav);
    const formsWrapper = new ElementCreator(profileParams.wrapper);
    this.addInnerElement(formsWrapper);
    const basicInfoForm = new BasicInfoView(this.clientAPI);
    formsWrapper.addInnerElement(basicInfoForm);
    const billAdrsForm = new BillAdrsView(this.clientAPI);
    formsWrapper.addInnerElement(billAdrsForm);
    const shipAdrsForm = new ShipAdrsView(this.clientAPI);
    formsWrapper.addInnerElement(shipAdrsForm);
    const passwordForm = new PasswordChangeView(this.clientAPI);
    formsWrapper.addInnerElement(passwordForm);
    const basicInfoItem = nav.getChildren()[0];
    basicInfoItem.classList.add('active-item');
    const billAdrsItem = nav.getChildren()[1];
    const shipAdrsItem = nav.getChildren()[2];
    const passwordItem = nav.getChildren()[3];
    basicInfoItem.addEventListener('click', () => {
      basicInfoItem.classList.add('active-item');
      billAdrsItem.classList.remove('active-item');
      shipAdrsItem.classList.remove('active-item');
      passwordItem.classList.remove('active-item');
      basicInfoForm.getElement().classList.remove('no-show');
      billAdrsForm.getElement().classList.add('no-show');
      shipAdrsForm.getElement().classList.add('no-show');
      passwordForm.getElement().classList.add('no-show');
    });
    billAdrsItem.addEventListener('click', () => {
      basicInfoItem.classList.remove('active-item');
      billAdrsItem.classList.add('active-item');
      shipAdrsItem.classList.remove('active-item');
      passwordItem.classList.remove('active-item');
      basicInfoForm.getElement().classList.add('no-show');
      billAdrsForm.getElement().classList.remove('no-show');
      shipAdrsForm.getElement().classList.add('no-show');
      passwordForm.getElement().classList.add('no-show');
    });
    shipAdrsItem.addEventListener('click', () => {
      basicInfoItem.classList.remove('active-item');
      billAdrsItem.classList.remove('active-item');
      shipAdrsItem.classList.add('active-item');
      passwordItem.classList.remove('active-item');
      basicInfoForm.getElement().classList.add('no-show');
      billAdrsForm.getElement().classList.add('no-show');
      shipAdrsForm.getElement().classList.remove('no-show');
      passwordForm.getElement().classList.add('no-show');
    });
    passwordItem.addEventListener('click', () => {
      basicInfoItem.classList.remove('active-item');
      billAdrsItem.classList.remove('active-item');
      shipAdrsItem.classList.remove('active-item');
      passwordItem.classList.add('active-item');
      basicInfoForm.getElement().classList.add('no-show');
      billAdrsForm.getElement().classList.add('no-show');
      shipAdrsForm.getElement().classList.add('no-show');
      passwordForm.getElement().classList.remove('no-show');
    });
  }

  private addSidemenu(names: string[]): ElementCreator {
    const nav = new ElementCreator(profileParams.nav);
    names.forEach((name) => {
      const navItem = new ElementCreator(profileParams.navItem);
      navItem.setTextContent(name);
      nav.addInnerElement(navItem);
    });
    return nav;
  }
}
