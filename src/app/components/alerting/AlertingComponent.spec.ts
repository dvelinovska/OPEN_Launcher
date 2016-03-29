import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Alert} from './Alert';
import {AlertingComponent} from './AlertingComponent';
import {AlertingService} from './AlertingService';

describe('AlertingComponentTests', function() {
    var instance: AlertingComponent = null;
    class AlertingServiceMock {
        currentAlerts: Array<Alert> = new Array<Alert>();

        addAlert(type: string, message: string) {
            var alert = new Alert(type, message);
            this.currentAlerts.push(alert);
        }

        removeAlert(alert: Alert) {
            for (var index = 0; index < this.currentAlerts.length; index++) {
                if (this.currentAlerts[index] === alert) {
                    this.currentAlerts.splice(index, 1);
                    break;
                }
            }
        }
    }

    beforeEachProviders(() => [
        provide(AlertingService, { useClass: AlertingServiceMock }),
        AlertingComponent
    ]);

    it('getCurrentAlerts_shouldBeEqualToAlertingServiceCurrentAlerts',
        inject([AlertingComponent], (instance) => {
            // Arrange
            var expectedResult = instance.alertingService.currentAlerts;

            // Act
            var result = instance.getCurrentAlerts();

            // Assert
            expect(result).toEqual(expectedResult);
        }));

    it('hasAlerts_givenAlertingServiceHasAlerts_shouldReturnTrue',
        inject([AlertingComponent], (instance) => {
            // Arrange
            instance.alertingService.addAlert('info', 'message');

            // Act
            var result = instance.hasAlerts();

            // Assert
            expect(result).toBeTruthy();
        }));

    it('hasAlerts_givenAlertingServiceDoesntHaveAlerts_shouldReturnFalse',
        inject([AlertingComponent], (instance) => {
            // Act
            var result = instance.hasAlerts();

            // Assert
            expect(result).toBeFalsy();
        }));

    it('removeAlert_givenServiceAlertsHasOneCurrentAlert_shouldRemoveAndCurrentAlertsArrayShouldBeEmpty',
        inject([AlertingComponent], (instance) => {
            // Arrange
            var alert: Alert = new Alert('info', 'message');
            instance.alertingService.currentAlerts = [alert];

            // Act    
            instance.removeAlert(alert);

            // Assert
            expect(instance.hasAlerts()).toBeFalsy();
        }));
});
