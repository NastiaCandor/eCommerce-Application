import { NotFoundType } from '../../../types';

const notFoundParams: NotFoundType = {
  section: {
    tag: 'section',
    cssClasses: ['not-found'],
  },
  innerWrapper: {
    tag: 'div',
    cssClasses: ['not-found__section'],
  },
  title: {
    tag: 'h2',
    cssClasses: ['not-found__title'],
    textContent: 'Page not found',
  },
  subtitle: {
    tag: 'p',
    cssClasses: ['not-found__subtitle'],
    textContent: 'The page  you were looking for does not exist',
  },
  errorNumber: {
    tag: 'p',
    cssClasses: ['not-found__error-number'],
    textContent: '404',
  },
  backToCatalogBtn: {
    tag: 'a',
    cssClasses: ['not-found__catalog-btn', 'button'],
    textContent: 'Back to Catalog',
  },
};

export default notFoundParams;
