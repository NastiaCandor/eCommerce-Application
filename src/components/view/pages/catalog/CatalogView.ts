/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
import {
  Attribute,
  LocalizedString,
  Price,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { EndPointsObject, ImageArr, PrefetchedData } from '../../../../types';
import Router from '../../../router/Router';
import ClientAPI from '../../../utils/Client';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import catalogParams from './catalog-params';
import { filterParams } from './filter/filter-params';
import FilterView from './filter/FilterView';
import '../../../../assets/img/filter-svgrepo-com.svg';
import SearchView from './search/SearchView';
import PAGES from '../../../router/utils/pages';
import SpinnerView from '../../../utils/SpinnerView';

export default class CatalogView extends View {
  private clientApi: ClientAPI;

  private filterView: FilterView;

  private router: Router;

  private wrapper: ElementCreator | null;

  private cardsView: HTMLElement | null;

  private categoriesBtn: Array<HTMLElement>;

  private prefetchedData: PrefetchedData;

  private searchView: SearchView;

  private bcWrapper: HTMLElement;

  private itemsCount: number;

  private totalCount: number;

  private isLoadingData: boolean;

  private endpoints: EndPointsObject | null;

  private spinner: SpinnerView;

  private previousView: HTMLElement | null;

  constructor(clientApi: ClientAPI, router: Router, spinner: SpinnerView) {
    super(catalogParams.section);
    this.clientApi = clientApi;
    this.prefetchedData = this.clientApi.getPrefetchedData;
    this.filterView = new FilterView(this.clientApi);
    this.searchView = new SearchView(this.clientApi);
    this.spinner = spinner;
    this.searchFunctionality();
    this.router = router;
    this.itemsCount = 0;
    this.totalCount = 0;
    this.cardsView = null;
    this.endpoints = null;
    this.previousView = null;
    this.isLoadingData = false;
    this.wrapper = null;
    this.bcWrapper = this.breadCrumbWrapper;
    this.categoriesBtn = [];
  }

  public async render() {
    await this.configure();
  }

  protected async configure(productInfo?: ProductProjectionPagedQueryResponse, cardsView?: ElementCreator) {
    await this.init(productInfo, cardsView);
    await this.categoriesCbHandler();
  }

  private async init(productInfo?: ProductProjectionPagedQueryResponse, cardsView?: ElementCreator): Promise<void> {
    const wrapper = new ElementCreator(catalogParams.wrapper);
    const mobileMenuBtn = this.createMobileMenuBtn();
    const sideBar = this.assamleSideBar();
    mobileMenuBtn.getElement().addEventListener('click', () => {
      sideBar.getElement().classList.toggle('no-show__aside');
      mobileMenuBtn.getElement().classList.toggle('mobile-btn__active');
    });
    const assambledCards = cardsView || (await this.assambleCards(productInfo));
    wrapper.addInnerElement([mobileMenuBtn, this.bcWrapper, sideBar, assambledCards, this.searchView]);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sideBar.getElement().classList.remove('no-show__aside');
      }
    });
    this.wrapper = wrapper;
    if (cardsView) {
      return this.addInnerElement(this.wrapper);
    }
    this.addInnerElement(this.wrapper);
  }

  public assamleSideBar() {
    const asideWrapper = new ElementCreator(catalogParams.aside);
    const categories = this.assembleCategories();
    const buttons = this.assambleBtnWrapper();
    asideWrapper.addInnerElement([categories, this.filterView.render(), buttons]);
    return asideWrapper;
  }

  public async fetchAllCardsData(offsetCount?: number) {
    const data = await this.clientApi.getAllCardsData(offsetCount);
    if (data) {
      return data;
    }
  }

  public async assambleCards(fetchedData?: ProductProjectionPagedQueryResponse, wrapper?: ElementCreator, id?: string) {
    const items = fetchedData || (await this.fetchAllCardsData());
    const cardsWrapper = wrapper || new ElementCreator(catalogParams.productCards);
    if (items) {
      this.totalCount = items.total ?? 0;
      this.itemsCount += items.count;
    }
    // this.totalCount = items?.total;
    // this.itemsCount += items?.count;
    const cardsData = items?.results;
    if (cardsData && <ProductProjection[]>cardsData) {
      cardsData.forEach((data) => {
        if (data.masterVariant.attributes && data.masterVariant.images) {
          const attributesArray = data.masterVariant.attributes.map((item) => item);
          this.assambleCard(
            cardsWrapper,
            data.id,
            data.name,
            attributesArray,
            data.masterVariant.images,
            data.masterVariant.prices
          );
        }
      });
      if (!wrapper) {
        cardsWrapper.setAttribute('id', catalogParams.productCards.id);
        this.scrollHandler(cardsWrapper, id);
      }
    }
    this.cardsView = cardsWrapper.getElement();
    return cardsWrapper;
  }

  private scrollHandler(element: ElementCreator, id?: string) {
    element.getElement().addEventListener('scroll', async (evt) => {
      if (evt.target instanceof HTMLElement) {
        const pxHeight = evt.target.scrollHeight - evt.target.scrollTop - evt.target.clientHeight;
        element.addInnerElement(this.spinner.getElement());
        if (pxHeight < 50 && !this.isLoadingData && this.isStillPages()) {
          this.isLoadingData = true;
          if (this.endpoints) {
            const data = await this.filterView.getFilterData(this.endpoints, this.itemsCount);
            if (data) {
              await this.assambleCards(data, element);
            }
          } else {
            const data = id
              ? await this.clientApi.getSpecificGenreById(id, this.itemsCount)
              : await this.fetchAllCardsData(this.itemsCount);
            if (data) {
              await this.assambleCards(data, element);
            }
          }
          this.spinner.removeSelfFromNode();
          this.isLoadingData = false;
        }
        if (this.itemsCount >= this.totalCount) {
          this.spinner.removeSelfFromNode();
        }
      }
    });
  }

  private isStillPages() {
    return this.totalCount >= this.itemsCount && this.totalCount > 0 && this.itemsCount > 0;
  }

  public resetPageCounters() {
    this.totalCount = 0;
    this.itemsCount = 0;
    this.endpoints = null;
  }

  private assambleCard(
    wrapper: ElementCreator,
    id: string,
    songName: LocalizedString,
    attrArr: Attribute[],
    imagesArr: ImageArr[],
    prices?: Price[]
  ) {
    const productCard = new ElementCreator(catalogParams.card.wrapper);
    productCard.setAttribute('data-id', id);
    const songTitle = this.assambleSongTitle(songName);
    const attributesArray = attrArr.map((item) => item);
    const singer = this.assambleSingerTitle(attributesArray);
    const image = this.assambleImage(imagesArr, songName);
    const priceElement = this.assamblePrice(prices);
    const cartBtn = this.assambleCartBtn();
    productCard.addInnerElement([image, singer, songTitle, priceElement, cartBtn]);
    productCard.setMouseEvent((evt) => this.cardsClickHandler(evt));
    wrapper.addInnerElement(productCard);
  }

  private cardsClickHandler(evt: Event) {
    if (evt.target instanceof HTMLElement) {
      let { target } = evt;

      while (!target.dataset.id) {
        target = target.parentElement as HTMLElement;
      }
      const { id } = target.dataset;
      if (id) {
        this.updateCrumbNavigation();
        const productLink = this.prefetchedData.productsUrl.ids.get(id);
        const path = `${PAGES.PRODUCT}/${productLink || ''}`;
        this.router.navigate(path, id);
        this.createBreadCrumbs();
        return;
      }
      console.error("Don't know how you're able to do it, but there is no such Id! ");
      this.router.navigate(PAGES.PRODUCT, id);
    }
  }

  private assambleImage(data: ImageArr[], name: LocalizedString): HTMLElement {
    const image = new ElementCreator(catalogParams.card.img);
    if (data) {
      if (data[0].url !== undefined) {
        image.setImageLink(data[0].url, name['en-US']);
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
    let listItem = new ElementCreator(catalogParams.categoryListItem);
    let categoryLink = new ElementCreator(catalogParams.categories.categoryLink);
    listItem.addInnerElement(categoryLink);
    categoryLink.setTextContent('All Categories');
    categoryLink.setAttribute('href', '/catalog/categories');
    this.categoriesBtn.push(categoryLink.getElement());
    const categoryBox = new ElementCreator(catalogParams.categories.categoryBox);
    const list = new ElementCreator(catalogParams.categoriesList);
    list.addInnerElement(listItem);
    const listItems = data.map((item) => {
      listItem = new ElementCreator(catalogParams.categoryListItem);
      categoryLink = new ElementCreator(catalogParams.categories.categoryLink);
      categoryLink.setTextContent(item.name);
      categoryLink.setAttribute('href', `/catalog/categories/${item.key}`);
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
        btn.classList.remove('active');
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          if (e.target instanceof HTMLAnchorElement) {
            e.target.classList.add('active');
            this.router.navigate(e.target.href);
          }
        });
      });
    }
  }

  public async mountCategory(key: string) {
    const categoryKey = this.prefetchedData.genres.find((item) => item.key === key);
    const id = categoryKey?.id;
    this.updateCrumbNavigation();
    this.filterView.resetInputs();
    this.filterView.resetEndpoints();
    this.resetPageCounters();
    if (id) {
      this.replaceCardsContent(this.wrapper as ElementCreator, this.spinner);
      const data = await this.clientApi.getSpecificGenreById(id);
      if (data && data.results.length > 0) {
        const cardsView = await this.assambleCards(data, undefined, id);
        if (cardsView) {
          if (this.wrapper) {
            this.replaceCardsContent(this.wrapper, cardsView);
          } else {
            this.configure(data);
          }
        }
      }
    }
  }

  public replaceCardsAndReturnElement(wrapper: ElementCreator, cardsView: ElementCreator) {
    this.replaceCardsContent(wrapper, cardsView);
    return this;
  }

  public replaceCardsContent(wrapper: ElementCreator, content: ElementCreator) {
    const prevCards = wrapper.getElement().querySelector('#products-content');
    if (content === this.spinner && prevCards) {
      prevCards.replaceChildren(content.getElement());
      return;
    }
    if (prevCards) {
      wrapper.getElement().replaceChild(content.getElement(), prevCards);
    }
  }

  private assambleSongTitle(title: LocalizedString): HTMLElement {
    const songTitle = new ElementCreator(catalogParams.card.title);
    songTitle.setTextContent(title['en-US']);
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
  }

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
      this.resetPageCounters();
      this.endpoints = this.filterView.endPoints;
      if (this.wrapper) {
        this.replaceCardsContent(this.wrapper, this.spinner);
      }
      const cardsData = await this.filterView.getFilterData();
      if (cardsData && cardsData.results.length > 0) {
        this.router.navigate(PAGES.FILTER);
        this.filterView.resetEndpoints();
        await this.assambleCards(cardsData).then((cardsView) => {
          if (this.wrapper) {
            this.replaceCardsContent(this.wrapper, cardsView);
          }
        });
      } else {
        this.showNoResults('', true);
        this.filterView.resetEndpoints();
      }
    });
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
      this.resetPageCounters();
      this.getSearchedProducts(<HTMLInputElement>input);
    });
  }

  private getSearchedProducts(input: HTMLInputElement) {
    const search = (<HTMLInputElement>input).value;
    if (search) {
      const response = this.clientApi.getSearchProduct(search, 50);
      response
        .then((data) => {
          const { body } = data;
          if (body.results.length === 0) {
            this.showNoResults(search);
          } else {
            this.assambleCards(body).then((cardsView) => {
              if (this.wrapper) {
                this.replaceCardsContent(this.wrapper, cardsView);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // search is blank
      this.assambleCards().then((cardsView) => {
        if (this.wrapper) {
          this.replaceCardsContent(this.wrapper, cardsView);
        }
      });
    }
  }

  private showNoResults(search: string, filter = false) {
    const container = new ElementCreator(catalogParams.noResults.container);
    const title = new ElementCreator(catalogParams.noResults.title);
    const message = new ElementCreator(catalogParams.noResults.message);
    if (filter) {
      message.getElement().innerHTML = 'No Results Found. Please, choose another filter';
    } else {
      message.getElement().innerHTML = `No Results for <span>"${search}"</span>. Please, try another search.`;
    }
    container.addInnerElement([title, message]);
    if (this.wrapper) {
      this.replaceCardsContent(this.wrapper, container);
    }
  }

  private async getCategoriesView() {
    const productCards = new ElementCreator(catalogParams.productCards);
    productCards.setAttribute('id', catalogParams.productCards.id);
    const promises = this.prefetchedData.genres.map(async (item) => {
      const data = await this.clientApi.getSpecificGenreById(item.id, undefined, 4);
      if (data) {
        const cardsContent = new ElementCreator(catalogParams.categoriesPage.cardsContent);
        const cards = await this.assambleCards(data, cardsContent);
        const categoryWrapper = new ElementCreator(catalogParams.categoriesPage.categoryWrapper);
        const categoryHeading = new ElementCreator(catalogParams.categoriesPage.categoryHeading);
        const overlayLink = new ElementCreator(catalogParams.categoriesPage.overlay);
        const overlayText = new ElementCreator(catalogParams.categoriesPage.overlayText);
        overlayText.setTextContent(`Proceed to ${item.name}`);
        overlayLink.setAttribute('href', `/${PAGES.CATEGORIES}/${item.key}`);
        overlayLink.addInnerElement(overlayText);
        cards.addInnerElement(overlayLink);
        this.categoriesContentHandler(overlayLink.getElement(), cards.getElement(), overlayText.getElement());
        categoryHeading.setTextContent(item.name);
        categoryWrapper.addInnerElement([categoryHeading, cards]);
        productCards.addInnerElement(categoryWrapper);
      }
    });

    await Promise.all(promises);

    return productCards;
  }

  private categoriesContentHandler(element: HTMLElement, collection: HTMLElement, textElement: HTMLElement) {
    const elements = Array.from(collection.children);
    element.addEventListener('mouseenter', (evt) => {
      if (evt.target instanceof HTMLElement) {
        evt.target.classList.add('active');
        textElement.classList.remove('hidden');
        elements.forEach((card) => {
          if (card !== evt.target) {
            card.classList.add('blured');
          }
        });
      }
    });
    element.addEventListener('mouseleave', (evt) => {
      if (evt.target instanceof HTMLElement) {
        evt.target.classList.remove('active');
        textElement.classList.add('hidden');
        elements.forEach((card) => {
          if (card !== evt.target) {
            card.classList.remove('blured');
          }
        });
      }
    });
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (evt.target instanceof HTMLAnchorElement) {
        this.router.navigate(evt.target.href);
      }
    });
  }

  public async proceedToCategories() {
    this.replaceCardsContent(this.wrapper as ElementCreator, this.spinner);
    const productCards = await this.getCategoriesView();
    this.updateCrumbNavigation();
    if (productCards) {
      if (!this.wrapper) {
        this.configure(undefined, productCards);
      } else {
        this.replaceCardsContent(this.wrapper, productCards);
      }
    }
  }

  public async proceedToCatalog() {
    const productCards = await this.getCategoriesView();
    this.updateCrumbNavigation();
    if (productCards) {
      if (!this.wrapper) {
        this.configure(undefined, productCards);
      } else {
        this.replaceCardsContent(this.wrapper, productCards);
      }
    }
  }

  public updateCrumbNavigation() {
    this.bcWrapper.replaceChildren(...this.createBreadCrumbs());
  }

  private createBreadCrumbs() {
    const url = this.router.currentPath.split('/');
    const crumbs = url
      .filter((item) => item !== '')
      .map((item, i, arr) => {
        const itemWrapper = new ElementCreator(catalogParams.breadCrumbs.linkContainer);
        let link = new ElementCreator(catalogParams.breadCrumbs.bcLink);
        if (arr.length === i + 1) {
          link = new ElementCreator(catalogParams.breadCrumbs.bcLinkActive);
        }
        link.setTextContent(item.split('_').join(' '));
        const path = `#${arr[0]}/${arr.slice(1, i + 1).join('/')}`;
        link.setAttribute('href', path);
        link.setMouseEvent((evt) => {
          evt.preventDefault();
          if (evt.target instanceof HTMLAnchorElement) {
            this.router.navigate(path);
          }
        });
        itemWrapper.addInnerElement(link);
        return itemWrapper.getElement();
      });
    return crumbs;
  }

  public get breadCrumbWrapper() {
    const wrapper = new ElementCreator(catalogParams.breadCrumbs.wrapper);
    wrapper.addInnerElement(this.createBreadCrumbs());
    return wrapper.getElement();
  }

  public get getWrapper() {
    if (this.wrapper) {
      return this.wrapper;
    }
    return console.error('catalog wrapper not found!');
  }
}
