import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from 'angular2/testing';

import {AlertingService} from './AlertingService';

describe('AlertingService', function() {
  var instance: AlertingService = null;

  beforeEach(() => {
    instance = new AlertingService();
  });

  it('AlertingService_NewInstance_CurrentAlertsLengthIsEqualZero', function() {
    // Assert
    expect(instance.currentAlerts.length).toEqual(0);
  });

  it('AlertingService_addAlert_CurrentAlertsLengthIsEqualOne', function() {
    // Act
    instance.addAlert('type', 'message');

    // Assert
    expect(instance.currentAlerts.length).toEqual(1);
  });

  it('AlertingService_addSuccess_TypeOfTheAddedAlertIsSuccess', function() {
    // Act
    instance.addSuccess('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('success');
  });

  it('AlertingService_addInfo_TypeOfTheAddedAlertIsInfo', function() {
    // Act
    instance.addInfo('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('info');
  });

  it('AlertingService_addWarning_TypeOfTheAddedAlertIsWarning', function() {
    // Act
    instance.addWarning('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('warning');
  });

  it('AlertingService_addDanger_TypeOfTheAddedAlertIsDanger', function() {
    // Act
    instance.addDanger('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('danger');
  });

  it('AlertingService_removeAlert_ValidateThatAlertIsDismissed', function() {
    // Act
    instance.addDanger('message');
    instance.addDanger('message');

    var noAlerts = instance.currentAlerts.length;
    instance.removeAlert(instance.currentAlerts[0]);

    // Assert
    expect(instance.currentAlerts.length).toEqual(noAlerts - 1);
  });
});

