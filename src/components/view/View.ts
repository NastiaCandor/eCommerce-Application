/* abstract class view, all Views must be inherited from him */

import { ElementParamsType } from '../../types';
import ElementCreator from '../utils/element-creator';

export default abstract class View extends ElementCreator {
  protected constructor(params: ElementParamsType) {
    super(params);
  }

  protected abstract render(): void;

  protected abstract configure(): void;
}
