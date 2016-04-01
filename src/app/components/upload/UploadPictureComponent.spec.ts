import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {UploadPictureComponent} from './UploadPictureComponent';
import {UploadPictureService} from './UploadPictureService';
import {GlobalService} from '../../shared/services/GlobalService';
import {AlertingService} from '../alerting/AlertingService';

describe('UploadPictureComponentTests', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, defaultOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    GlobalService,
    AlertingService,
    UploadPictureService,
    UploadPictureComponent
  ]);

  it('uploadFile_givenAvailableUploadPictureService_shouldResetSelectedImageAndFile', inject([UploadPictureComponent], (instance) => {
    // Arrange
    instance.selectedFiles = new Array<File>();
    spyOn(instance.uploadPictureService, 'upload').and.callFake(() => { });
    spyOn(instance, 'resetSelected').and.callFake(() => { });

    // Act
    instance.uploadFile();

    // Assert
    expect(instance.selectedImage).toEqual('');
    expect(instance.selectedFiles).toEqual(null);
    expect(instance.uploadPictureService.upload).toHaveBeenCalledWith(instance.selectedFiles[0]);
    expect(instance.resetSelected).toHaveBeenCalled();
  }));
});
