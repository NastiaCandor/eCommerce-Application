import { Attribute, Price, ProductData } from '@commercetools/platform-sdk';
import { PrefetchedGenres } from '../../../../types';
import Router from '../../../router/Router';
import ClientAPI from '../../../utils/Client';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import catalogParams from './catalog-params';
import { filterParams } from './filter/filter-params';
import FilterView from './filter/FilterView';
import '../../../../assets/img/settings.svg';
import SearchView from './search/SearchView';

export default class CatalogView extends View {
  private clientApi: ClientAPI;

  private filterView: FilterView;

  private router: Router;

  private wrapper: ElementCreator | null;

  private categoriesBtn: Array<HTMLElement>;

  private prefetchedGenres: PrefetchedGenres[];

  private searchView: SearchView;

  constructor(clientApi: ClientAPI, router: Router) {
    super(catalogParams.section);
    this.clientApi = clientApi;
    this.prefetchedGenres = this.clientApi.getPrefetchedData.genres;
    this.filterView = new FilterView(this.clientApi);
    this.searchView = new SearchView(this.clientApi);
    this.searchFunctionality();
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
    const mobileMenuBtn = this.createMobileMenuBtn();
    wrapper.addInnerElement(mobileMenuBtn);
    const sideBar = this.assamleSideBar();


    mobileMenuBtn.getElement().addEventListener('click', () => {
      sideBar.getElement().classList.toggle('no-show');
      sideBar.getElement().classList.toggle('mobile-menu');
    });
  
    const assambledCards = await this.assamleCards(productInfo);
    wrapper.addInnerElement([sideBar, assambledCards]);
    this.wrapper = wrapper;
    wrapper.addInnerElement(this.searchView);
    this.addInnerElement(wrapper);
  }

  public assamleSideBar() {
    const asideWrapper = new ElementCreator(catalogParams.aside);
    const categories = this.assembleCategories();
    const buttons = this.assambleBtnWrapper();
    asideWrapper.addInnerElement([categories, this.filterView.render(), buttons]);
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
      if (data.masterVariant.images[0].url !== undefined) {
        image.setImageLink(data.masterVariant.images[0].url, data.name['en-US']);
      } else {
        console.log('not Found!');
      }
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
            this.replaceCards(this.wrapper, cardsView);
          } else {
            this.configure(dataResults);
          }
        });
      }
    }
  }

  public replaceCards(wrapper: ElementCreator, cardsView: ElementCreator) {
    const replacedNode = wrapper.getElement().childNodes[1];
    wrapper.getElement().replaceChild(cardsView.getElement(), replacedNode);
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

  private createMobileMenuBtn() {
    const btn = new ElementCreator(catalogParams.mobileBtn);
    const btnImg = new ElementCreator(catalogParams.mobileBtnImg);
    btn.addInnerElement(btnImg);
    return btn;
  private assambleBtnWrapper() {
    const wrapper = new ElementCreator(filterParams.submitResetBtnWrapper);
    const submitBtn = this.createSubmitBtn();
    const resetBtn = this.createResetBtn();

    wrapper.addInnerElement([resetBtn, submitBtn]);
    return wrapper;
  }

  private createSubmitBtn() {
    const submitBtn = new ElementCreator(filterParams.submitBtn).getElement();
    this.submitBtnHandler(submitBtn);
    return submitBtn;
  }

  private createResetBtn() {
    const resetBtn = new ElementCreator(filterParams.resetBtn).getElement();
    this.resetBtnHandler(resetBtn);
    return resetBtn;
  }

  public resetBtnHandler(element: HTMLElement) {
    element.addEventListener('click', () => {
      this.filterView.resetInputs();
      this.filterView.resetEndpoints();
    });
  }

  public submitBtnHandler(element: HTMLElement) {
    element.addEventListener('click', async () => {
      this.filterView.createQuaryString();
      const cardsData = await this.filterView.getFilterData();
      if (cardsData) {
        this.filterView.resetEndpoints();
        await this.assamleCards(cardsData as ProductData[]).then((cardsView) => {
          if (this.wrapper) {
            this.replaceCards(this.wrapper, cardsView);
          }
        });
      }
    });
    
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
            this.showNoResults(search);
          } else {
            this.assamleCards(results as ProductData[]).then((cardsView) => {
              if (this.wrapper) {
                const replacedNode = this.wrapper.getElement().childNodes[1];
                this.wrapper.getElement().replaceChild(cardsView.getElement(), replacedNode);
              }
            });
          }
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

  private showNoResults(search: string) {
    const container = new ElementCreator(catalogParams.noResults.container);
    const title = new ElementCreator(catalogParams.noResults.title);
    const message = new ElementCreator(catalogParams.noResults.message);
    message.getElement().innerHTML = `No Results for <span>"${search}"</span>. Please, try another search.`;
    container.addInnerElement([title, message]);
    if (this.wrapper) {
      const replacedNode = this.wrapper.getElement().childNodes[1];
      this.wrapper.getElement().replaceChild(container.getElement(), replacedNode);
    }
  }
}
