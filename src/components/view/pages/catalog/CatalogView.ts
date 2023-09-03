import { Attribute, Price, ProductData } from '@commercetools/platform-sdk';
import { PrefetchedGenres } from '../../../../types';
import Router from '../../../router/Router';
import ClientAPI from '../../../utils/Client';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import catalogParams from './catalog-params';
import FilterView from './filter/FilterView';
import SearchView from './search/SearchView';

export default class CatalogView extends View {
  private clientApi: ClientAPI;

  private filterView: HTMLElement;

  private router: Router;

  private wrapper: ElementCreator | null;

  private categoriesBtn: Array<HTMLElement>;

  private prefetchedGenres: PrefetchedGenres[];

  private searchView: SearchView;

  constructor(clientApi: ClientAPI, router: Router) {
    super(catalogParams.section);
    this.clientApi = clientApi;
    this.prefetchedGenres = this.clientApi.getPrefetchedData.genres;
    // test
    this.searchView = new SearchView(this.clientApi);
    this.searchFunctionality();
    // tets
    this.filterView = new FilterView(this.clientApi).render();
    this.router = router;
    this.wrapper = null;
    this.categoriesBtn = [];
  }

  public async render() {
    await this.configure();
  }

  protected async configure(productInfo?: ProductData[]) {
    await this.init(productInfo);
    await this.categoriesCbHandler();
  }

  private async init(productInfo?: ProductData[]): Promise<void> {
    const wrapper = new ElementCreator(catalogParams.wrapper);
    const sideBar = this.assamleSideBar();
    const assambledCards = await this.assembleDefaultCardsView(productInfo);
    wrapper.addInnerElement([sideBar, assambledCards]);
    this.wrapper = wrapper;
    wrapper.addInnerElement(this.searchView);
    this.addInnerElement(wrapper);
  }

  public async assembleDefaultCardsView(productInfo?: ProductData[]) {
    const productData = productInfo || undefined;
    const assambledCards = await this.assamleCards(productData);
    return assambledCards;
  }

  public assamleSideBar() {
    const asideWrapper = new ElementCreator(catalogParams.aside);
    const categories = this.assembleCategories();
    asideWrapper.addInnerElement(categories);
    return asideWrapper;
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

  private assembleCategories(): HTMLElement {
    const data = this.clientApi.getPrefetchedData.genres;
    const categoriesWrapper = new ElementCreator(catalogParams.categories.wrapper);
    const categoriesHeading = new ElementCreator(catalogParams.asideHeading);
    categoriesWrapper.addInnerElement(categoriesHeading);
    const categoryBox = new ElementCreator(catalogParams.categories.categoryBox);
    const list = new ElementCreator(catalogParams.categoriesList);
    const listItems = data.map((item) => {
      const listItem = new ElementCreator(catalogParams.categoryListItem);
      const categoryLink = new ElementCreator(catalogParams.categories.categoryLink);
      categoryLink.setTextContent(item.name);
      categoryLink.setAttribute('href', `/catalog/category/${item.key}`);
      categoryLink.setAttribute('data-genre', item.key);
      listItem.addInnerElement(categoryLink);
      this.categoriesBtn.push(categoryLink.getElement());
      return listItem;
    });
    list.addInnerElement(listItems);
    categoryBox.addInnerElement(list);
    categoriesWrapper.addInnerElement(categoryBox);
    return categoriesWrapper.getElement();
  }

  private async categoriesCbHandler() {
    if (this.categoriesBtn) {
      this.categoriesBtn.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          if (e.target instanceof HTMLAnchorElement) {
            this.router.navigate(e.target.href);
          }
        });
      });
    }
  }

  public async mountCategory(key: string) {
    const categoryKey = this.prefetchedGenres.find((item) => item.key === key);
    const id = categoryKey?.id;
    if (id) {
      const data = await this.clientApi.getSpecificGenreById(id);
      if (data) {
        const dataResults = data.results as ProductData[];
        await this.assamleCards(dataResults).then((cardsView) => {
          if (this.wrapper) {
            const replacedNode = this.wrapper.getElement().childNodes[1];
            this.wrapper.getElement().replaceChild(cardsView.getElement(), replacedNode);
            return;
          }
          this.configure(dataResults);
        });
      }
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

  private searchFunctionality() {
    this.searchView.render();
    const [box] = this.searchView.getChildren();
    const [input, btn] = box.childNodes;
    input.addEventListener('keypress', (e) => {
      const { key } = e as KeyboardEvent;
      if (key === 'Enter') {
        e.preventDefault();
        this.getSearchedProducts(<HTMLInputElement>input);
      }
    });
    btn.addEventListener('click', () => {
      this.getSearchedProducts(<HTMLInputElement>input);
    });
  }

  private getSearchedProducts(input: HTMLInputElement) {
    const search = (<HTMLInputElement>input).value;
    if (search) {
      const response = this.clientApi.getSearchProduct(search, 50);
      response
        .then((data) => {
          const { results } = data.body;
          if (results.length === 0) {
            this.showNoResults();
          }
          this.assamleCards(results as ProductData[]).then((cardsView) => {
            if (this.wrapper) {
              const replacedNode = this.wrapper.getElement().childNodes[1];
              this.wrapper.getElement().replaceChild(cardsView.getElement(), replacedNode);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // search is blank
      this.assamleCards().then((cardsView) => {
        if (this.wrapper) {
          const replacedNode = this.wrapper.getElement().childNodes[1];
          this.wrapper.getElement().replaceChild(cardsView.getElement(), replacedNode);
        }
      });
    }
  }

  private showNoResults() {
    console.log('no results');
  }
}
