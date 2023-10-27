import { getCookie, setCookie } from 'typescript-cookie';
import { jwtDecode } from 'jwt-decode';
import { last } from 'lodash';

export const JwtKey = 'Authorization';
export const BearerKey = 'Bearer';
type AuthModel = {
  userName: string;
};

export class AuthCookie {
  public readonly model: AuthModel = {
    userName: ''
  };

  constructor() {
    this.parse();
  }

  public setBearer(token: string): void {
    setCookie(JwtKey, `${BearerKey} ${token}`);
  }

  private parse(): void {
    const cookie = getCookie(JwtKey);
    if (!cookie) {
      return;
    }
    const array = cookie.split(' ');
    const decoded = jwtDecode(last(array)!) as any;
    if (!decoded) {
      return;
    }
    this.model.userName = decoded.username;
    console.info(this.model);
    Object.freeze(this.model);
  }
}
