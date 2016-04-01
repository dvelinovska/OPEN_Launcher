import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {HomeComponent} from './HomeComponent';
import {AuthService} from '../../shared/services/AuthService';

describe('HomeComponentTests', () => {
  beforeEachProviders(() => [
    AuthService,
    HomeComponent
  ]);

  it('logout_givenAvailableAuthService_shouldLogOut', inject([HomeComponent], (instance) => {
    // Arrange
    spyOn(instance.authService, 'logout').and.callFake(() => { });

    // Act
    instance.logout();

    // Assert
    expect(instance.authService.logout).toHaveBeenCalled();
  }));
});
