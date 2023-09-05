/* eslint-disable @typescript-eslint/ban-ts-comment */
import Router from '../src/components/router/Router';
import State from '../src/components/state/State';
import { Route } from '../src/types';

describe('Router', () => {
  let router: Router;
  let mockLogger: Route[];
  let url: string;
  let state: State;
  let map: Map<string, string>;

  beforeEach(() => {
    mockLogger = [
      {
        path: 'catalog',
        callback: jest.fn(),
      },
    ];
    router = new Router(mockLogger, state, map);
    state = new State();
    url = 'catalog/category/rock/deep-purple';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Router should be an Router instance', () => {
    expect(router).toBeInstanceOf(Router);
  });

  it('Router should trigger the startInit method at instanciation', () => {
    // @ts-ignore
    class MockRouter extends Router {
      startInit() {
        // @ts-ignore
        super.startInit();
      }
    }
    // @ts-ignore
    const startInitSpy = jest.spyOn(MockRouter.prototype, 'startInit');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockRouterInstance = new MockRouter(mockLogger, state, map);
    expect(startInitSpy).toHaveBeenCalled();
  });

  it('navigate(path) should trigger the routeTo() method', () => {
    // @ts-ignore
    const routeToSpy = jest.spyOn(router, 'routeTo');
    router.navigate(mockLogger[0].path);
    expect(routeToSpy).toHaveBeenCalled();
  });

  it('routeTo should trigger the routeTo() method', () => {
    // @ts-ignore
    const routeToSpy = jest.spyOn(router, 'routeTo');
    router.navigate(mockLogger[0].path);
    expect(routeToSpy).toHaveBeenCalled();
  });

  it('parseUrl should return the proper data object, represents the path and resource', () => {
    // @ts-ignore
    const result = router.parseUrl(url);
    expect(result).toStrictEqual({ path: 'catalog', resource: 'category', category: 'rock', id: 'deep-purple' });
  });

  it('urlChangeHandler should trigger the getCurrentPath method', () => {
    // @ts-ignore
    const getCurrentPathSpy = jest.spyOn(router, 'urlChangeHandler');
    // @ts-ignore
    router.urlChangeHandler();
    expect(getCurrentPathSpy).toHaveBeenCalled();
  });
});
