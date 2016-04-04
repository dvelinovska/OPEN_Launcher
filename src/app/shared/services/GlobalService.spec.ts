import {
  beforeEach,
  describe,
  expect,
  it
} from 'angular2/testing';

import {GlobalService} from './GlobalService';

describe('GlobalServiceTests', () => {
  var instance: GlobalService = null;

  beforeEach(() => {
    instance = new GlobalService();
  });

  it('URL_GETUSER_givenUsername_shouldGetApiUserPath', () => {
    expect(instance.URL_GETUSER('eljesa')).toEqual('http://localhost:3000/api/getAllUsers/eljesa');
  });

  it('URL_DELETEUSER_givenUsername_shouldGetApiDeleteUserPath', () => {
    expect(instance.URL_DELETEUSER('eljesa')).toEqual('http://localhost:3000/api/deleteUser/eljesa');
  });

  it('URL_GET_USERSETTINGS_givenUsername_shouldGetApiUserSettingsPath', () => {
    expect(instance.URL_GET_USERSETTINGS('eljesa')).toEqual('http://localhost:3000/api/getUserSettings/eljesa');
  });

  it('URL_SAVE_USERSETTINGS_givenUsername_shouldGetApiSaveUserSettingsPath', () => {
    expect(instance.URL_SAVE_USERSETTINGS('eljesa')).toEqual('http://localhost:3000/api/saveUserSettings/eljesa');
  });
});
