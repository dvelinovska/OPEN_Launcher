import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';

import {UsersPipe} from './UsersPipe';
import {User} from '../models/User';

describe('UsersPipeTests', () => {
  function getUser() {
    var user = new User();
    user.name = 'dragica';
    return user;
  }

  beforeEachProviders(() => [
    UsersPipe
  ]);

  it('transform_givenPipe_shouldReturnOneUser',
    inject([UsersPipe], (instance) => {
      // Arrange
      let user = getUser();

      // Act
      var result = instance.transform([user], ['dr']);

      // Assert
      expect(result).toEqual([user]);
    }));

  it('transform_givenNoPipe_shouldReturnAllUsers',
    inject([UsersPipe], (instance) => {
      // Arrange
      let user = getUser();
      let users: User[] = new Array<User>();
      users[0] = user;

      // Act
      var result = instance.transform(users, ['']);

      // Assert
      expect(result).toEqual(users);
    }));

  it('transform_givenNoUsers_shouldReturnNoUsers',
    inject([UsersPipe], (instance) => {
      // Arrange
      let users: User[] = new Array<User>();

      // Act
      var result = instance.transform(users, ['']);

      // Assert
      expect(result).toEqual(users);
    }));

  it('transform_givenPipe_shouldReturnMultipleUsers',
    inject([UsersPipe], (instance) => {
      // Arrange
      let user1 = new User();
      user1.name = 'Daniela';
      let user2 = new User();
      user2.name = 'Dragica';
      let users: User[] = new Array<User>();
      users[0] = user1;
      users[1] = user2;

      // Act
      var result = instance.transform(users, ['d']);

      // Assert
      expect(result).toEqual(users);
    }));
});
