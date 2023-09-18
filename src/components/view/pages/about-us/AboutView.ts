import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import { aboutParams, developersInfo } from './about-params';

export default class AboutView extends View {
  constructor() {
    super(aboutParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    console.log(developersInfo);
    this.assambleHeading();
    this.assamblePersons();
    this.assambleSchoolInfo();
  }

  private assambleHeading(): void {
    const headingWrapper = new ElementCreator(aboutParams.aboutHeading);
    const headingTitle1 = new ElementCreator(aboutParams.aboutHeadingTitle1);
    const headingTitle2 = new ElementCreator(aboutParams.aboutHeadingTitle2);
    const headingImage = new ElementCreator(aboutParams.aboutHeadingImage);
    headingWrapper.addInnerElement([headingTitle1, headingImage, headingTitle2]);
    this.addInnerElement(headingWrapper);
  }

  private assamblePersons(): void {
    const personsWrapper = new ElementCreator(aboutParams.personsWrapper);
    const personsHeading = new ElementCreator(aboutParams.personsWrapperTitle);
    personsWrapper.addInnerElement(personsHeading);
    personsWrapper.addInnerElement(this.assamblePerson());

    this.addInnerElement(personsWrapper);
  }

  private assamblePerson(): HTMLElement {
    const personWrapper = new ElementCreator(aboutParams.personWrapper);

    return personWrapper.getElement();
  }

  private assambleSchoolInfo(): void {
    const schoolWrapper = new ElementCreator(aboutParams.rsWrapper);
    const rsTitle1 = new ElementCreator(aboutParams.rsTitle1);
    const rsTitle2 = new ElementCreator(aboutParams.rsTitle2);
    const rsLink = new ElementCreator(aboutParams.rsLogo);
    schoolWrapper.addInnerElement([rsTitle1, rsLink, rsTitle2]);

    this.addInnerElement(schoolWrapper);
  }
}
