import {Injectable, bind} from 'angular2/core';

import {User} from '../models/User';

@Injectable()
export class UserValidationService {
    constructor() { }

    isValid(user: User): string {
        if (user.profileImg === './assets/images/avatars/default.jpg') {
            return 'За да креирате профил, ве молам изберете слика';
        }
        if (!user.name
            || !user.profileImg
            || !user.userSettings
            || user.userSettings.backgroundColor < 0
            || user.userSettings.pointerColor < 0
            || user.userSettings.pointerSize < 0
            || user.userSettings.pointerType < 0) {
            return 'Не се сите полиња пополнети.';
        }
        return '';
    }
}

export var userValidationServiceInjectables: Array<any> = [
    bind(UserValidationService).toClass(UserValidationService)
];
