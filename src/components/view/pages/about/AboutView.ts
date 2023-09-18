import { CartDiscountValueRelative, DiscountCode } from '@commercetools/platform-sdk';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import '../../../../assets/img/girl.png';
import '../../../../assets/img/The_Gershwin_Song.jpg';
import '../../../../assets/img/vinyl.png';
import ClientAPI from '../../../utils/Client';
import { DISCOUNT_PHOTOS, aboutParams, discountCodeParams } from './about-params';

export default class AboutView extends View {
  private clientAPI: ClientAPI;

  constructor(clientAPI: ClientAPI) {
    super(aboutParams.section);
    this.clientAPI = clientAPI;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    this.injectSloganSection();
    this.injectJazzSection();

    this.injectPromocodeSections();
  }

  private injectSloganSection(): void {
    const container = new ElementCreator(aboutParams.container);
    container.setCssClasses(['main__slogan']);
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

    container.addInnerElement(sloganImgWrapper);
    this.addInnerElement(container);
  }

  private injectJazzSection(): void {
    const container = new ElementCreator(aboutParams.container);
    container.setCssClasses(['main__jazz']);
    const JazzWrapper = new ElementCreator(aboutParams.innerWrapper);

    const sloganWrapper2 = new ElementCreator(aboutParams.sloganWrapper);
    const sloganHeading2 = new ElementCreator(aboutParams.sloganHeading2);
    const shopInfoJazz = new ElementCreator(aboutParams.infoTextJazz);
    const shopInfoJazz2 = new ElementCreator(aboutParams.infoTextJazz2);
    sloganWrapper2.addInnerElement([sloganHeading2, shopInfoJazz, shopInfoJazz2]);

    const imgWrapperJazz = new ElementCreator(aboutParams.imgWrapperJazz);
    const jazzImg = new ElementCreator(aboutParams.imgJazz);

    const vinylImg = new ElementCreator(aboutParams.imgVinyl);

    imgWrapperJazz.addInnerElement([vinylImg, jazzImg]);

    JazzWrapper.addInnerElement([imgWrapperJazz, sloganWrapper2]);
    container.addInnerElement([JazzWrapper]);
    this.addInnerElement(container);
  }

  private injectPromocodeSections(): void {
    const cartDiscounts = this.clientAPI.getDiscountCodes();
    cartDiscounts
      .then((data) => {
        const { results } = data.body;
        results.forEach((code, ind) => {
          const wrapper = new ElementCreator(discountCodeParams.container);
          this.injectDiscountCodeSection(wrapper, code, ind);
          this.addInnerElement(wrapper);
        });
      })
      .catch((error) => console.error(`Error while fetching cart discounts: ${error}`));
  }

  private async injectDiscountCodeSection(wrapper: ElementCreator, code: DiscountCode, ind: number): Promise<void> {
    wrapper.setCssClasses([`discount_${code.code}`]);
    const container = new ElementCreator(aboutParams.container);
    container.setCssClasses(['main__discount']);
    const photoContainer = new ElementCreator(discountCodeParams.photoContainer);
    const img = new ElementCreator(discountCodeParams.photoIMG);
    img.setImageLink(DISCOUNT_PHOTOS[ind].imgSRC, DISCOUNT_PHOTOS[ind].imgALT);
    photoContainer.addInnerElement(img);

    const infoContainer = new ElementCreator(discountCodeParams.info.container);
    const subtitle = new ElementCreator(discountCodeParams.info.subtitle);
    const cartDiscountData = await this.getCartDiscount(code.cartDiscounts[0].id);
    const discountPersent = cartDiscountData.value;
    const persent = (<CartDiscountValueRelative>discountPersent).permyriad / 100;
    subtitle.setTextContent(`Discount ${persent}%`);
    const title = new ElementCreator(discountCodeParams.info.title);
    if (!code.name) return;
    title.setTextContent(code.name['en-US']);
    const codeText = new ElementCreator(discountCodeParams.info.codeText);
    const discount = new ElementCreator(discountCodeParams.info.code);
    discount.setTextContent(`${code.code}`);
    codeText.addInnerElement(discount);
    const description = new ElementCreator(discountCodeParams.info.description);
    if (!code.description) return;
    description.setTextContent(`${code.description['en-US']}`);

    infoContainer.addInnerElement([subtitle, title, description, codeText]);

    if (cartDiscountData.validUntil) {
      const validUntil = new ElementCreator(discountCodeParams.info.validUntil);
      const date = new Date(cartDiscountData.validUntil);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      validUntil.setTextContent(`Ends ${day}/${month}/${year}`);
      infoContainer.addInnerElement(validUntil);
    }

    const comment = new ElementCreator(discountCodeParams.info.comment);
    infoContainer.addInnerElement(comment);

    if (code.maxApplicationsPerCustomer) {
      const applications = new ElementCreator(discountCodeParams.info.maxApplic);
      applications.setTextContent(`**Maximum application per customer: ${code.maxApplicationsPerCustomer}`);
      infoContainer.addInnerElement(applications);
    }

    container.addInnerElement([photoContainer, infoContainer]);
    wrapper.addInnerElement(container);
  }

  private async getCartDiscount(id: string) {
    const cartDiscount = await this.clientAPI.getCartDiscountByID(id);
    const { body } = cartDiscount;
    return body;
  }
}
