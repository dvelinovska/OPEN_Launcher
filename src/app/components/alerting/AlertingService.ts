import {Injectable, bind} from 'angular2/core';
import {Alert} from './Alert';

@Injectable()
export class AlertingService {
    public currentAlerts: Array<Alert> = new Array<Alert>();

    constructor() { }

    addAlert = function(type: string, message: string) {
        var alert = new Alert(type, message);
        this.currentAlerts.push(alert);
        setTimeout(() => this.removeAlert(alert), 3500);
    };

    addSuccess(message: string) {
        this.addAlert('success', message);
    }

    addInfo(message: string) {
        this.addAlert('info', message);
    }

    addWarning(message: string) {
        this.addAlert('warning', message);
    }

    addDanger(message: string) {
        this.addAlert('danger', message);
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

export var alertingServiceInjectables: Array<any> = [
    bind(AlertingService).toClass(AlertingService)
];
