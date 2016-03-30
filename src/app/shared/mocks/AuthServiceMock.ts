import {IAuthService} from '../services/AuthService';
import {User} from '../models/User';

export class AuthServiceMock implements IAuthService {
  login(username: string) {
    return true;
  }

  logout() { }

  getUser() {
    var userName = 'userName';
    return userName;
  }

  isLogged() {
    return true;
  }
}
