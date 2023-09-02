import { Attribute, Price, ProductDiscount, ProductProjection, TypedMoney, Image } from '@commercetools/platform-sdk';
import { Splide } from '@splidejs/splide';
import { wrapperParams } from '../../constants';
import ClientAPI from '../../utils/Client';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import productParams from './product-params';
import sliderParams from './slider-params';
import Modal from '../../utils/Modal';

export default class ProductView extends View {
  private clientAPI: ClientAPI;

  private productKey: string;

  constructor(clientAPI: ClientAPI, productKey: string) {
    super(productParams.section);
    this.productKey = productKey;
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
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(productParams.innerWrapper);

    this.injectProductSection(innerWrapper);

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
        this.fillAdditionalSide(productDisplay, body);
      })
      .catch((error: Error) => {
        if (error.name === 'NotFound') {
          this.injectNotFoundMessage(wrapper);
        }
        console.log(error);
      });

    wrapper.addInnerElement(productDisplay);
  }

  private fillProductInfoSide(wrapper: ElementCreator, body: ProductProjection) {
    const productSide = new ElementCreator(productParams.infoSide);
    const { name, masterVariant } = body;
    this.injectProductTitle(productSide, name['en-US']);
    if ('attributes' in masterVariant) {
      const { attributes } = masterVariant;
      if (!attributes) return;
      this.injectProductSubtitle(productSide, attributes[0].value);
      this.injectProductInfo(productSide, attributes);
    }
    this.fillProductAside(productSide, body);
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
    const LP = attributes[2].value.label;
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

  private fillProductPhotoSide(wrapper: ElementCreator, body: ProductProjection): void {
    const productSide = new ElementCreator(productParams.photoSide);

    const { masterVariant } = body;
    const { images } = masterVariant;
    if (!images) return;
    this.injectPhoto(productSide, images);

    wrapper.addInnerElement(productSide);
  }

  private injectPhoto(productSide: ElementCreator, images: Image[]): void {
    if (images.length === 0) {
      this.injectNoImage(productSide);
    } else {
      const mainCarousel = this.injectPhotoSlider(productSide, images);
      this.mainCarouselModal(mainCarousel, images);
    }
  }

  private injectNoImage(wrapper: ElementCreator): void {
    const noImage = new ElementCreator(productParams.noImage);
    noImage.setImageLink('../assets/img/no-image-available.png', 'No Image Available');
    wrapper.addInnerElement(noImage);
  }

  private injectPhotoSlider(wrapper: ElementCreator, images: Image[]): ElementCreator {
    const mainCarousel = new ElementCreator(sliderParams.maincarousel);
    const track = new ElementCreator(sliderParams.track);
    const list = new ElementCreator(sliderParams.list);

    const thubnails = new ElementCreator(sliderParams.thubnails);
    const thubnailArr: HTMLElement[] = [];

    images.forEach((img) => {
      const slide = new ElementCreator(sliderParams.slide);
      const image = new ElementCreator(sliderParams.img);
      image.setImageLink(img.url, img.label ? img.label : 'vinyl photo');
      slide.addInnerElement(image);
      list.addInnerElement(slide);

      const thubnail = new ElementCreator(sliderParams.thubnail);
      const thubimg = new ElementCreator(sliderParams.img);
      thubimg.setImageLink(img.url, img.label ? img.label : 'vinyl photo');
      thubnail.addInnerElement(thubimg);
      thubnailArr.push(thubnail.getElement());
      thubnails.addInnerElement(thubnail);
    });
    track.addInnerElement(list);
    mainCarousel.addInnerElement(track);

    const splide = new Splide(mainCarousel.getElement(), {
      pagination: false,
    });

    thubnailArr.forEach((thub, ind) => {
      thub.addEventListener('click', () => {
        splide.go(ind);
      });
    });
    let current = thubnailArr[0];
    splide.on('mounted move', () => {
      const thumbnail = thubnailArr[splide.index];
      if (thumbnail) {
        if (current) {
          current.classList.remove('is-active');
        }
        thumbnail.classList.add('is-active');
        current = thumbnail;
      }
    });

    splide.mount();
    wrapper.addInnerElement([mainCarousel, thubnails]);
    return mainCarousel;
  }

  private mainCarouselModal(mainCarousel: ElementCreator, images: Image[]): void {
    mainCarousel.getElement().addEventListener('click', () => {
      const modal = new Modal(['modal__product-slider']);
      const content = new ElementCreator(productParams.modalConent);
      this.injectPhotoSlider(content, images);
      modal.buildModal(content.getElement());
    });
  }

  private fillProductAside(wrapper: ElementCreator, body: ProductProjection): void {
    const productSide = new ElementCreator(productParams.productAside);
    const { masterVariant } = body;
    this.injectAsideTitle(productSide);
    if ('prices' in masterVariant) {
      const { prices } = masterVariant;
      if (prices) this.priceDisplay(productSide, prices);
    }
    const addCartBtn = new ElementCreator(productParams.addToCartBtn);
    if ('availability' in masterVariant) {
      const { availability } = masterVariant;
      if (availability !== undefined && availability.availableQuantity) {
        this.injectAviabilityInfo(productSide, availability.availableQuantity);
      }
    } else {
      addCartBtn.setAttribute('disabled', 'true');
    }
    productSide.addInnerElement(addCartBtn);

    wrapper.addInnerElement(productSide);
  }

  private priceDisplay(wrapper: ElementCreator, prices: Price[]): void {
    if (prices.length === 0) {
      const currPrice = new ElementCreator(productParams.productPriceCurrent).getElement();
      currPrice.textContent = 'Sorry, there is no price yet';
      wrapper.addInnerElement(currPrice);
    } else {
      this.injectProductPrice(wrapper, prices[0]);
    }
  }

  private injectAsideTitle(wrapper: ElementCreator): void {
    const title = new ElementCreator(productParams.priceTitle);
    wrapper.addInnerElement(title);
  }

  private injectProductPrice(wrapper: ElementCreator, prices: Price): void {
    const priceBox = new ElementCreator(productParams.productPriceBox);
    if (prices.discounted) {
      this.injectDiscountedPrices(priceBox, prices);
    } else {
      const currPrice = new ElementCreator(productParams.productPriceCurrent).getElement();
      currPrice.textContent = this.formatMoney(prices.value);
      priceBox.addInnerElement(currPrice);
    }
    wrapper.addInnerElement(priceBox);
  }

  private injectDiscountedPrices(priceBox: ElementCreator, prices: Price): void {
    const currPrice = new ElementCreator(productParams.productPriceCurrent).getElement();
    if (prices.discounted === undefined) return;
    currPrice.textContent = this.formatMoney(prices.discounted.value);
    currPrice.classList.add('_discounted-price');
    const prevPriceBox = new ElementCreator(productParams.productPricePrevious).getElement();
    const prevPrice = new ElementCreator(productParams.productPricePrevText).getElement();
    prevPrice.textContent = this.formatMoney(prices.value);
    const discountText = new ElementCreator(productParams.discountText).getElement();
    const discountInfo = this.clientAPI.getDiscountById(prices.discounted.discount.id);
    discountInfo
      .then((data) => {
        const { body } = data;
        if (body.value.type === 'relative') {
          const amount = body.value.permyriad / 100;
          discountText.textContent += ` ${amount}%`;
        } else {
          const amount = body.value;
          discountText.textContent += ` $${amount}`;
        }
        prevPriceBox.append(prevPrice, discountText);
        priceBox.addInnerElement([currPrice, prevPriceBox]);
        this.injectDiscountInfo(priceBox, body);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private injectDiscountInfo(aside: ElementCreator, body: ProductDiscount): void {
    const discountBox = new ElementCreator(productParams.discountInfoBox);
    const discountTitle = new ElementCreator(productParams.discountInfoTitle).getElement();
    discountTitle.textContent = body.name['en-US'];
    discountBox.addInnerElement(discountTitle);
    if (body.description) {
      const dicountText = new ElementCreator(productParams.discountInfoText).getElement();
      dicountText.textContent = body.description['en-US'];
      discountBox.addInnerElement(dicountText);
    }
    aside.addInnerElement(discountBox);
  }

  private formatMoney(price: TypedMoney): string {
    const moneyNumber = price.centAmount / 10 ** price.fractionDigits;
    const moneyText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(moneyNumber);
    return moneyText;
  }

  private injectAviabilityInfo(wrapper: ElementCreator, quantity: number): void {
    const box = new ElementCreator(productParams.availabilityBox);
    const label = new ElementCreator(productParams.availabilityLabel);
    const text = new ElementCreator(productParams.availabilityText).getElement();
    text.textContent += String(quantity);
    box.addInnerElement([label, text]);

    wrapper.addInnerElement(box);
  }

  private fillAdditionalSide(wrapper: ElementCreator, body: ProductProjection): void {
    const productSide = new ElementCreator(productParams.additionalSide);
    const { description, masterVariant } = body;
    this.injectAdditionalTitle(productSide);
    if (description) this.injectDescription(productSide, description['en-US']);
    const { attributes } = masterVariant;
    if (attributes && attributes[3].name === 'track-list') this.injectTrackList(productSide, attributes[3].value);

    wrapper.addInnerElement(productSide);
  }

  private injectAdditionalTitle(wrapper: ElementCreator): void {
    const title = new ElementCreator(productParams.additionalTitle);
    wrapper.addInnerElement(title);
  }

  private injectDescription(wrapper: ElementCreator, text: string): void {
    const description = new ElementCreator(productParams.descriptionProduct).getElement();
    description.textContent = text;
    wrapper.addInnerElement(description);
  }

  private injectTrackList(wrapper: ElementCreator, text: string): void {
    const trackListTitle = new ElementCreator(productParams.trackListTitle);
    const trackList = new ElementCreator(productParams.trackList).getElement();
    const trackArr = text.split('\n');
    trackArr.forEach((track) => {
      const item = new ElementCreator(productParams.trackListItem).getElement();
      item.textContent = track;
      trackList.append(item);
    });

    trackList.append();
    wrapper.addInnerElement([trackListTitle, trackList]);
  }

  private injectNotFoundMessage(wrapper: ElementCreator): void {
    const error = new ElementCreator(productParams.errorSection);
    const title = new ElementCreator(productParams.errorTitle);
    const text = new ElementCreator(productParams.errorText);
    error.addInnerElement([title, text]);
    wrapper.addInnerElement(error);
  }
}
