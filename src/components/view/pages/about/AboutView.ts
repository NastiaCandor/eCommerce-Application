import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import aboutParams from './about-params';
import '../../../../assets/img/girl.png';
import '../../../../assets/img/The_Gershwin_Song.jpg';
import '../../../../assets/img/vinyl.png';

export default class AboutView extends View {
  constructor() {
    super(aboutParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const sloganImgWrapper = new ElementCreator(aboutParams.sloganImgWrapper);

    const imgWrapper = new ElementCreator(aboutParams.imgWrapper);
    sloganImgWrapper.addInnerElement(imgWrapper);

    const sloganWrapper = new ElementCreator(aboutParams.sloganWrapper);
    sloganImgWrapper.addInnerElement(sloganWrapper);

    const sloganHeading = new ElementCreator(aboutParams.sloganHeading);
    sloganWrapper.addInnerElement(sloganHeading);

    const shopInfo = new ElementCreator(aboutParams.infoText);
    shopInfo.getElement().innerHTML = aboutParams.infoText.textContent;

    const shopInfo2 = new ElementCreator(aboutParams.infoText2);
    shopInfo2.getElement().innerHTML = aboutParams.infoText2.textContent;
    sloganWrapper.addInnerElement([shopInfo, shopInfo2]);

    sloganImgWrapper.addInnerElement([sloganWrapper, imgWrapper]);

    const mainImg = new ElementCreator(aboutParams.img);
    imgWrapper.addInnerElement(mainImg);

    const JazzWrapper = new ElementCreator(aboutParams.innerWrapper);
    this.addInnerElement(JazzWrapper);

    const sloganWrapper2 = new ElementCreator(aboutParams.sloganWrapper);
    const sloganHeading2 = new ElementCreator(aboutParams.sloganHeading2);
    const shopInfoJazz = new ElementCreator(aboutParams.infoTextJazz);
    const shopInfoJazz2 = new ElementCreator(aboutParams.infoTextJazz2);
    sloganWrapper2.addInnerElement([sloganHeading2, shopInfoJazz, shopInfoJazz2]);

    const imgWrapperJazz = new ElementCreator(aboutParams.imgWrapperJazz);
    const jazzImg = new ElementCreator(aboutParams.imgJazz);

    const vinylImg = new ElementCreator(aboutParams.imgVinyl);

    imgWrapperJazz.addInnerElement([vinylImg, jazzImg]);

    // shopInfo.getElement().innerHTML = aboutParams.infoText.textContent;

    JazzWrapper.addInnerElement([imgWrapperJazz, sloganWrapper2]);
    this.addInnerElement([sloganImgWrapper, JazzWrapper]);
  }
}
