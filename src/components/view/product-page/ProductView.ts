// import Noty from 'noty';
import { Attribute, ProductProjection } from '@commercetools/platform-sdk';
import { wrapperParams } from '../../constants';
// import PAGES from '../../router/utils/pages';
import Router from '../../router/Router';
import ClientAPI from '../../utils/Client';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import productParams from './product-params';

export default class ProductView extends View {
  clientAPI: ClientAPI;

  private router: Router;

  private productKey: string;

  constructor(router: Router, productKey: string) {
    super(productParams.section);
    this.router = router;
    this.productKey = productKey;
    this.clientAPI = new ClientAPI();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(productParams.innerWrapper);

    this.injectProductSection(innerWrapper);
    // this.injectLoginForm(innerWrapper);
    // this.injectFormSubtitle(innerWrapper);

    // this.injectProductSection();

    wrapper.getElement().classList.add('product__wrapper');
    wrapper.addInnerElement(innerWrapper);
    super.addInnerElement(wrapper);
  }

  private injectProductSection(wrapper: ElementCreator) {
    const productDisplay = new ElementCreator(productParams.productDisplay);

    const getProduct = this.clientAPI.getProductById(this.productKey);
    getProduct
      .then((data) => {
        const { body } = data;
        this.fillProductPhotoSide(productDisplay, body);
        this.fillProductInfoSide(productDisplay, body);
      })
      .catch((error) => {
        console.log(error);
      });

    wrapper.addInnerElement(productDisplay);
  }

  private fillProductInfoSide(wrapper: ElementCreator, body: ProductProjection) {
    const productSide = new ElementCreator(productParams.infoSide);
    const { name, masterVariant } = body;
    this.injectProductTitle(productSide, name['en-US']);
    const { attributes } = masterVariant;
    if (attributes) {
      this.injectProductSubtitle(productSide, attributes[0].value);
      this.injectProductInfo(productSide, attributes);
    }
    // this.injectProductSubtitle(productSide, attributes[0]);
    console.log(body, masterVariant);

    wrapper.addInnerElement(productSide);
  }

  private injectProductTitle(wrapper: ElementCreator, titleText: string): void {
    const title = new ElementCreator(productParams.productTitle).getElement();
    title.textContent = titleText;
    wrapper.addInnerElement(title);
  }

  private injectProductSubtitle(wrapper: ElementCreator, titleText: string): void {
    const title = new ElementCreator(productParams.productSubtitle).getElement();
    title.textContent = titleText;
    wrapper.addInnerElement(title);
  }

  private injectProductInfo(wrapper: ElementCreator, attributes: Attribute[]): void {
    const infoList = new ElementCreator(productParams.productInfo);

    const label = attributes[1].value;
    this.injectInfoItem(infoList, 'Label:', label);
    const LP = attributes[2].value;
    this.injectInfoItem(infoList, 'LP:', LP);
    const condition = attributes.length > 4 ? attributes[4].value : attributes[3].value;
    this.injectInfoItem(infoList, 'Condition:', condition);

    wrapper.addInnerElement(infoList);
  }

  private injectInfoItem(list: ElementCreator, label: string, text: string): void {
    const infoItem = new ElementCreator(productParams.productInfoItem);
    const itemLabel = new ElementCreator(productParams.productInfoItemLabel).getElement();
    itemLabel.textContent = label;
    const itemText = new ElementCreator(productParams.productInfoItemText).getElement();
    itemText.textContent = text;

    infoItem.addInnerElement([itemLabel, itemText]);
    list.addInnerElement(infoItem);
  }

  private fillProductPhotoSide(wrapper: ElementCreator, body: ProductProjection) {
    const productSide = new ElementCreator(productParams.photoSide);

    const { masterVariant } = body;
    const { images } = masterVariant;

    // TESTING
    if (!images) return;
    const imgParams = {
      tag: 'img',
      cssClasses: ['product__img'],
    };
    const img = new ElementCreator(imgParams);
    img.setImageLink(images[0].url, 'vinyl photo');
    productSide.addInnerElement(img);
    console.log(body, masterVariant);

    wrapper.addInnerElement(productSide);
  }
}
