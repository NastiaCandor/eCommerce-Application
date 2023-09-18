import { ACCESS_TOKEN, CUSTOMER_ID, COOKIE_RESET_DATE } from '../constants';

export default class State {
  private catalogState: Map<string, string>;

  constructor() {
    this.catalogState = new Map();
  }

  public deleteAccessToken(): void {
    document.cookie = `${ACCESS_TOKEN}${COOKIE_RESET_DATE}`;
    document.cookie = `${CUSTOMER_ID}${COOKIE_RESET_DATE}`;
  }

  public isAccessTokenValid(): boolean {
    const allCookies = document.cookie.split(';');
    const isAccessTokenExist = allCookies.some((token) => token.startsWith(`${ACCESS_TOKEN}=`));
    return isAccessTokenExist;
  }

  public pushState(url: string): void {
    window.history.pushState(`${url}`, '', url);
  }

  public replaceState(url: string): void {
    window.history.replaceState(null, '', url);
  }

  public setPageTitle(str: string, isFormated = false, isSlashPrefexed = false): void {
    if (isFormated) {
      document.title = `Vinyl Vibe Store - ${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
      return;
    }
    document.title = this.formatPageTitle(str, isSlashPrefexed);
  }

  public saveCatalogState(data: string) {
    if (this.catalogState.has('url')) {
      const url = this.catalogState.get('url');
      this.catalogState.set('prevurl', <string>url);
    }
    this.catalogState.set('url', data);
  }

  public formatPageTitle(url: string, isSlashPrefexed = false): string {
    if (!url || url === '/') return 'Vinyl Vibe Store';
    if (isSlashPrefexed) {
      return `Vinyl Vibe Store - ${url.slice(1, 2).toUpperCase()}${url.slice(2)}`;
    }
    return `Vinyl Vibe Store - ${url.slice(0, 1).toUpperCase()}${url.replace('-', ' ').slice(1)}`;
  }

  public get getCatalogState() {
    return this.catalogState;
  }
}
