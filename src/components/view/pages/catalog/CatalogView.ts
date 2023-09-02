import { Attribute, Price, ProductData } from '@commercetools/platform-sdk';
import Router from '../../../router/Router';
import ClientAPI from '../../../utils/Client';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import catalogParams from './catalog-params';
import FilterView from './filter/FilterView';

export default class CatalogView extends View {
  private clientApi: ClientAPI;

  private filterView: HTMLElement;

  private cards: Promise<ElementCreator>;

  private router: Router;

  private wrapper: ElementCreator;

  private categoriesBtn: Array<HTMLElement>;

  constructor(clientApi: ClientAPI, router: Router) {
    super(catalogParams.section);
    this.clientApi = clientApi;
    this.filterView = new FilterView(this.clientApi).render();
    this.router = router;
    this.cards = this.assamleCards();
    this.wrapper = new ElementCreator(catalogParams.wrapper);
    this.categoriesBtn = [];
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private async renderInnerWrapper(): Promise<void> {
    const asideWrapper = new ElementCreator(catalogParams.aside);
    const categories = await this.assembleCategories();
    if (categories) asideWrapper.addInnerElement(categories);
    asideWrapper.addInnerElement(this.filterView);
    this.wrapper.addInnerElement([asideWrapper, await this.cards]);
    this.addInnerElement(this.wrapper);
    await this.categoriesCbHandler();
  }

  private async fetchAllCardsData() {
    const data = await this.clientApi.getAllCardsData();
    if (data) {
      return data.map((item) => item.masterData.current);
    }
  }

  private async assamleCards(fetchedData?: ProductData[]) {
    const cardsData = fetchedData || (await this.fetchAllCardsData());
    const cardsWrapper = new ElementCreator(catalogParams.productCards);
    if (cardsData) {
      cardsData.forEach((data) => {
        const productCard = new ElementCreator(catalogParams.card.wrapper);
        if (data.masterVariant.attributes && data.masterVariant.images) {
          const songTitle = this.assambleSongTitle(data);
          const attributesArray = data.masterVariant.attributes.map((item) => item);
          const singer = this.assambleSingerTitle(attributesArray);
          const image = this.assambleImage(data);
          const priceElement = this.assamblePrice(data.masterVariant.prices);
          const cartBtn = this.assambleCartBtn();
          productCard.addInnerElement([singer, songTitle, image, priceElement, cartBtn]);
          cardsWrapper.addInnerElement(productCard);
        }
      });
    }
    return cardsWrapper;
  }

  private assambleImage(data: ProductData): HTMLElement {
    const image = new ElementCreator(catalogParams.card.img);
    if (data.masterVariant.images) {
      image.setImageLink(data.masterVariant.images[0].url, data.name['en-US']);
    }
    return image.getElement();
  }

  private assambleSingerTitle(data: Attribute[]): HTMLElement {
    const singer = new ElementCreator(catalogParams.card.singer);
    singer.setTextContent(data[0].value);
    return singer.getElement();
  }

  private async assembleCategories(): Promise<HTMLElement> {
    const id = await this.clientApi.getCategoryId('genres');
    const data = await this.clientApi.getGenresById(id);
    const categoriesWrapper = new ElementCreator(catalogParams.categories.wrapper);
    const categoriesHeading = new ElementCreator(catalogParams.asideHeading);
    categoriesWrapper.addInnerElement(categoriesHeading);
    const categoryBox = new ElementCreator(catalogParams.categories.categoryBox);
    const list = new ElementCreator(catalogParams.categoriesList);
    if (data !== undefined) {
      const genres = data.map((item) => [item.name['en-US'], item.key]);
      const listItems = genres.map(([name, key]) => {
        const listItem = new ElementCreator(catalogParams.categoryListItem);
        const categoryLink = new ElementCreator(catalogParams.categories.categoryLink);
        if (name && key) {
          categoryLink.setTextContent(name);
          categoryLink.setAttribute('href', `catalog/category/${key}`);
          categoryLink.setAttribute('data-genre', key);
          listItem.addInnerElement(categoryLink);
          this.categoriesBtn.push(categoryLink.getElement());
        }
        return listItem;
      });
      list.addInnerElement(listItems);
      categoryBox.addInnerElement(list);
      categoriesWrapper.addInnerElement(categoryBox);
    }
    return categoriesWrapper.getElement();
  }

  private async categoriesCbHandler() {
    if (this.categoriesBtn) {
      this.categoriesBtn.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          if (e.target instanceof HTMLAnchorElement) {
            const id = await this.clientApi.getCategoryId(`${e.target.dataset.genre}`);
            const pop = await this.clientApi.getSpecificGenreById(id);
            console.log(pop);
            this.router.navigate(e.target.href);
          }
        });
      });
    }
  }

  public async mountCategory(key: string) {
    const categoryKey = await this.clientApi.getCategoryId(key);
    const data = await this.clientApi.getSpecificGenreById(categoryKey);
    if (data !== undefined) {
      const results = data.results as ProductData[];
      const res = (await this.assamleCards(results)).getElement();
      const child = this.wrapper.getElement().childNodes[1];
      const filter = this.filterView;
      if (child) {
        this.wrapper.getElement().replaceChild(res, child);
        return;
      }
      const wrapper = new ElementCreator(catalogParams.wrapper);
      const asideWrapper = new ElementCreator(catalogParams.aside);
      this.categoriesBtn = [];
      const categories = await this.assembleCategories();
      if (categories) asideWrapper.addInnerElement([categories]);
      asideWrapper.addInnerElement(filter);
      console.log(this.filterView);
      wrapper.addInnerElement([asideWrapper, res]);
      this.wrapper = wrapper;
      await this.categoriesCbHandler();
      return wrapper.getElement();
    }
  }

  private assambleSongTitle(data: ProductData): HTMLElement {
    const songTitle = new ElementCreator(catalogParams.card.title);
    songTitle.setTextContent(data.name['en-US']);
    return songTitle.getElement();
  }

  private assambleCartBtn(): HTMLElement {
    const addCartBtn = new ElementCreator(catalogParams.card.addToCartBtn);
    return addCartBtn.getElement();
  }

  private assamblePrice(priceArray: Price[] | undefined): HTMLElement {
    const priceWrapper = new ElementCreator(catalogParams.card.priceWrapper);
    if (priceArray) {
      const priceObj = priceArray[0];
      const currency = priceObj.value.currencyCode === 'USD' ? '$' : '€';
      const price = new ElementCreator(catalogParams.card.price);
      const priceStr = `${priceObj.value.centAmount / 100}${currency}`;
      price.setTextContent(priceStr);
      if (priceObj.discounted) {
        const discountedPrice = new ElementCreator(catalogParams.card.price);
        const discountPriceStr = `${priceObj.discounted.value.centAmount / 100}${currency}`;
        discountedPrice.setTextContent(discountPriceStr);
        price.getElement().classList.add('striked');
        priceWrapper.addInnerElement([price, discountedPrice]);
        return priceWrapper.getElement();
      }
      priceWrapper.addInnerElement(price);
    }
    return priceWrapper.getElement();
  }
}
