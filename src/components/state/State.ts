import { ACCESS_TOKEN, CUSTOMER_ID, COOKIE_RESET_DATE } from '../constants';

export default class State {
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
    window.history.pushState(null, '', url);
  }

  public replaceState(url: string): void {
    window.history.replaceState(null, '', url);
  }

  public setPageTitle(url: string, slice = true): void {
    document.title = this.formatPageTitle(url, slice);
  }

  public formatPageTitle(url: string, slice = true): string {
    if (!url || url === '/') return 'Vinyl Vibe Store';
    if (slice) {
      return `Vinyl Vibe Store - ${url.slice(1).slice(0, 1).toUpperCase()}${url.replace('_', ' ').slice(2)}`;
    }
    return `Vinyl Vibe Store - ${url.toUpperCase().split('-').join(' ')}`;
  }
}
