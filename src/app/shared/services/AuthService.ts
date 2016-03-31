import {Injectable, provide} from 'angular2/core';

export interface IAuthService {
  login(user: string): boolean;
  logout(): void;
  getUser(): any;
  isLogged(): boolean;
}

@Injectable()
export class AuthService implements IAuthService {
  login(user: string): boolean {
    if (user.length > 0) {
      localStorage.setItem('username', user);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLogged(): boolean {
    return this.getUser() !== null;
  }
}

export var AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, { useClass: AuthService })
];
