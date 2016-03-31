import {it, describe, expect, beforeEach} from 'angular2/testing';
import {UsersFilter} from './UsersFilter';
import {User} from '../models/User';

describe('UsersFilterTests', () => {
  let pipe: UsersFilter;

  beforeEach(() => {
    pipe = new UsersFilter();
  });

  it('transform_givenFilter_shouldFilterWithOneUser', () => {
    // Arrange
    let user = new User();
    user.name = 'Dragica';

    // Act
    var result = pipe.transform([user], ['dr']);

    // Assert
    expect(result).toEqual([user]);
  });

  it('transform_givenNoFilter_shouldReturnAllUsers', () => {
    // Arrange
    let user = new User();
    user.name = 'Dragica';
    let users: User[] = new Array<User>();
    users[0] = user;

    // Act
    var result = pipe.transform(users, ['']);

    // Assert
    expect(result).toEqual(users);
  });

  it('transform_givenNoUsers_shouldReturnNoUsers', () => {
    // Arrange
    let users: User[] = new Array<User>();

    // Act
    var result = pipe.transform(users, ['']);

    // Assert
    expect(result).toEqual(users);
  });

  it('transform_givenFilter_shouldFilterWithMultipleUsers', () => {
    // Arrange
    let user1 = new User();
    user1.name = 'Daniela';
    let user2 = new User();
    user2.name = 'Dragica';
    let users: User[] = new Array<User>();
    users[0] = user1;
    users[1] = user2;

    // Act
    var result = pipe.transform(users, ['d']);

    // Assert
    expect(result).toEqual(users);
  });
});
