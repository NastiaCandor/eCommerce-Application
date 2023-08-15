/* abstract class view, all Views must be inherited from him */

import { ElementParamsType } from '../../types';
import Router from '../router/router';
import ElementCreator from '../utils/element-creator';

export default abstract class View extends ElementCreator {
  protected constructor(params: ElementParamsType) {
    super(params);
  }

  protected abstract render(): void;

  protected abstract configure(router?: Router): void;
}
