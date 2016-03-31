import {
  beforeEachProviders,
  it
} from 'angular2/testing';

import {AlertingService} from './AlertingService';

describe('AlertingServiceTests', function() {
  var instance: AlertingService = null;

  beforeEach(function() {
    instance = new AlertingService();
  });

  it('addAlert_givenAlert_currentAlertsLengthShouldBeEqualToOne', function() {
    // Act
    instance.addAlert('type', 'message');

    // Assert
    expect(instance.currentAlerts.length).toEqual(1);
  });

  it('addSuccess_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeSuccess', function() {
    // Act
    instance.addSuccess('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('success');
  });

  it('addInfo_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeInfo', function() {
    // Act
    instance.addInfo('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('info');
  });

  it('addWarning_givenAlertAndCurrentAlertsArrayIsEmpty_typeOfTheAddedAlertShouldBeWarning', function() {
    // Act
    instance.addWarning('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('warning');
  });

  it('addDanger_givenAlertAndCurrentAlertsArrayIsEmpty_TypeOfTheAddedAlertShouldBeDanger', function() {
    // Act
    instance.addDanger('message');

    // Assert
    expect(instance.currentAlerts[0].type).toEqual('danger');
  });

  it('removeAlert_givenCurrentAlertsArrayHasOneAlert_shouldRemoveAndCurrentAlertsArrayShouldBeEmpty', function() {
    // Arrange
    instance.addDanger('message');
    var noAlerts = instance.currentAlerts.length;

    // Act
    instance.removeAlert(instance.currentAlerts[0]);

    // Assert
    expect(instance.currentAlerts.length).toEqual(noAlerts - 1);
  });
});
