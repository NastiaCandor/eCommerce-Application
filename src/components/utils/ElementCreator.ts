import { ElementParamsType } from '../../types/index';

type ElementOrCreator = HTMLElement | ElementCreator;
type ArrayOfElementsOrCreators = Array<ElementOrCreator>;

export default class ElementCreator {
  private element: HTMLElement;

  constructor(params: ElementParamsType) {
    this.element = document.createElement('div');
    this.createElement(params);
  }

  private createElement(params: ElementParamsType): void {
    /* main element creating method. check if params passed
    consist a value and call the bounded inner method */

    this.element = document.createElement(params.tag);

    if (params.cssClasses) this.setCssClasses(params.cssClasses);

    if (params.textContent) this.setTextContent(params.textContent);

    if (params.mouseEvent) this.setMouseEvent(params.mouseEvent);

    if (params.link) this.setLink(params.link);

    if (params.src && params.alt) this.setImageLink(params.src, params.alt);
  }

  public addInnerElement(element: ElementOrCreator | HTMLElement | ArrayOfElementsOrCreators): void {
    /* method for adding inner elements to a this.element defined at constructor.
    you can pass single HTMLElement, Array of HTMLElements, ElementCreator instance,
    Array of ElementCreator instances */
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else if (element instanceof HTMLElement) {
      this.element.append(element);
    } else if (element instanceof Array) this.arrayHandler(element);
  }

  private arrayHandler(array: ArrayOfElementsOrCreators): void {
    /* handler method for proper work of addInnerElement method,
     have no signature calls outside the class */
    array.forEach((element) => {
      if (element instanceof ElementCreator) {
        this.addInnerElement(element.getElement());
      } else if (element instanceof HTMLElement) {
        this.addInnerElement(element);
      } else {
        throw new Error(`Instance of ${element} - ${Object.getPrototypeOf(element).constructor}, 
        which is not a correct type!`);
      }
    });
  }

  public getElement(): HTMLElement | HTMLInputElement {
    /* it's quite self-descriptive. returns the created HTMLElement.
    probably you'll need it before you wish to insert element to DOM;
    like const element = myElement.getElement() */
    return this.element;
  }

  public getChildren(): HTMLCollection {
    return this.getElement().children;
  }

  public setCssClasses(classes: string[]): void {
    /* set the provided classes from ARRAY of strings, if any. */
    classes.forEach((className) => this.element.classList.add(className));
  }

  public setTextContent(textContent: string): void {
    /* set the provided text content from string, if any. */
    if (typeof textContent === 'string') {
      this.element.append(textContent);
    }
  }

  public setMouseEvent(callback: (evt: Event) => void): void {
    /* set the provided callback from passed function, if any. works only with mouse events.
    not really usefull, because of a little usage without enviroment context.
    you can ask me for clarifry and providing more info about */
    if (typeof callback === 'function') this.element.addEventListener('click', (evt: Event) => callback(evt));
  }

  public setScrollEvent(callback: (evt: Event) => void): void {
    /* set the provided callback from passed function, if any. works only with mouse events.
    not really usefull, because of a little usage without enviroment context.
    you can ask me for clarifry and providing more info about */
    if (typeof callback === 'function') {
      this.element.addEventListener('scroll', (evt: Event) => callback(evt));
    }
  }

  private setLink(link: string): void {
    /* set the provided href link from passed string, if any. */
    this.element.setAttribute('href', link);
  }

  public setAttribute(attr: string, attrValue: string): void {
    this.element.setAttribute(attr, attrValue);
  }

  public setImageLink(src: string, alt: string): void {
    /* add the new method what can assign links to images.
    method takes two arguments: link to src image and alt for 'alt' attribute */
    if (this.element.tagName === 'IMG') {
      this.element.setAttribute('src', src);
      this.element.setAttribute('alt', alt);
    } else {
      throw new Error('Element use the img tag!');
    }
  }
}

/* Here's how params may look like
pagination = {
  container: {
    tag: 'div',
    cssClasses: ['pagination'],
  },
  paginationArrowLeft: {
    tag: 'a',
    cssClasses: ['pagi-btn', 'pagi-prev'],
    textContent: '<',
  },
  paginationCurrentPage: {
    tag: 'a',
    cssClasses: ['pagi-btn', 'pagi-counter'],
    textContent: '1',
  },
  paginationArrowRight: {
    tag: 'a',
    cssClasses: ['pagi-btn', 'pagi-next'],
    textContent: '>',
  },
};

Usage:

const newElement = new ElementCreator(pagination.container);
const paginationLeftArrow = new ElementCreator(pagination.paginationArrowLeft);
const paginationLeftElement = paginationLeftArrow.getElement();
paginationLeftElement.setMouseEvent(() => ('Hello world'));
newElement.addInnerElement(paginationLeftElement);

body.append(newElement.getElement());

if something broked down due refactoring, contact me ASAP :)
*/
