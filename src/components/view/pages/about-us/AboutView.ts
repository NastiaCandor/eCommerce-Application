import { DeveloperInfo } from '../../../../types';
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
    const persons = new ElementCreator(aboutParams.personsInnerWrapper);

    persons.addInnerElement(this.assamblePersonCard());
    personsWrapper.addInnerElement([personsHeading, persons]);

    this.addInnerElement(personsWrapper);
  }

  private assamblePersonCard(): HTMLElement[] {
    const developersData = developersInfo;
    const personsArr = new Array<HTMLElement>();
    Object.keys(developersData).forEach((id) => {
      const devInfo: DeveloperInfo = developersData[id];
      const personWrapper = new ElementCreator(aboutParams.personWrapper);
      const topWrapper = new ElementCreator(aboutParams.personTopContainer);
      const image = new ElementCreator(aboutParams.personImg);
      const roleWrapper = new ElementCreator(aboutParams.personRoleContainer);
      const name = new ElementCreator(aboutParams.personName);
      const role = new ElementCreator(aboutParams.personRole);
      const contributionTitle = new ElementCreator(aboutParams.personContributionTitle);
      const contributionsList = new ElementCreator(aboutParams.personContributionItems);
      contributionsList.addInnerElement(contributionTitle);
      const contributionsListItems = devInfo.contributions.map((item) => {
        const listItem = new ElementCreator(aboutParams.personContribution);
        listItem.setTextContent(item);
        return listItem;
      });
      const bio = new ElementCreator(aboutParams.personBio);
      const link = new ElementCreator(aboutParams.personLink);
      contributionsList.addInnerElement(contributionsListItems);
      image.getElement().classList.add(`${id}-img`);
      role.setTextContent(devInfo.role);
      name.setTextContent(devInfo.name);
      bio.setTextContent(`« ${devInfo.bio} »`);
      link.setAttribute('href', devInfo.link);

      roleWrapper.addInnerElement([name, role]);
      topWrapper.addInnerElement([image, roleWrapper]);
      personWrapper.addInnerElement([topWrapper, contributionsList, bio, link]);

      personsArr.push(personWrapper.getElement());
    });
    return personsArr;
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
