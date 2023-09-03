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

  public setPageTitle(url: string): void {
    document.title = this.formatPageTitle(url);
  }

  public formatPageTitle(url: string): string {
    if (!url) return 'Vinyl Vibe Store';
    return `Vinyl Vibe Store - ${url.slice(0, 1).toUpperCase()}${url.replace('_', ' ').slice(1)}`;
  }
}
