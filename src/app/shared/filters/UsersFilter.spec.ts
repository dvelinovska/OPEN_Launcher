
import {it, describe, expect, beforeEach, inject} from 'angular2/testing';

import {UsersFilter} from './UsersFilter';
import {User} from '../models/User';

describe('UsersFilter', () => {
  let pipe: UsersFilter;

  beforeEach(() => {
    pipe = new UsersFilter();
  });

  it('Transform_GivenFilter_ShouldFilterWithOneUser', () => {
    // Arrange
    let user = new User();
    user.name = 'Dragica';

    // Act
    var result = pipe.transform([user], ['dr']);

    // Assert
    expect(result).toEqual([user]);
  });

  it('Transform_WithNoFilter_ShouldReturnAllUsers', () => {
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

  it('Transform_WithNoUsers_ShouldReturnNoUsers', () => {
    // Arrange
    let users: User[] = new Array<User>();

    // Act
    var result = pipe.transform(users, ['']);

    // Assert
    expect(result).toEqual(users);
  });

  it('Transform_GivenFilter_ShouldFilterWithMultipleUsers', () => {
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

  it('Transform_GivenFilter_ShouldFilterWithMultipleUsers2', () => {
    // Arrange
    let user1 = new User();
    user1.name = 'Daniela';
    let user2 = new User();
    user2.name = 'Dragica';
    let users: User[] = new Array<User>();
    users[0] = user1;
    users[1] = user2;
    let expectedUsers: User[] = new Array<User>();
    expectedUsers[0] = user2;

    // Act
    var result = pipe.transform(users, ['dr']);

    // Assert
    expect(result).toEqual(expectedUsers);
  });
});
