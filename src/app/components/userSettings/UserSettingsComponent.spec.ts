import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing';

import {provide, Injector, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {UserSettingsComponent} from './UserSettingsComponent';
import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, PointerSize, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {Alert} from '../alerting/Alert';
import {AlertingService} from '../alerting/AlertingService';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserSettings} from '../../shared/models/UserSettings';

describe('UserSettingsComponent', function() {
  class ImagesServiceMock {
    getPointerImages() {
      var pointerImages = '["./app/assets/images/pointer/small.png", "./app/assets/images/pointer/big.png"]';
      var obj = JSON.parse(pointerImages);
      return Observable.of(obj);
    }
  }

  function getTestPointerColors(): PointerColor[] {
    return [
      PointerColor.White,
      PointerColor.Yellow
    ];
  }

  var instance: UserSettingsComponent = null;

  beforeEachProviders(() => [
    provide(AlertingService, { useClass: AlertingService }),
    provide(UserSettingsColorsService, { useClass: UserSettingsColorsService }),
    provide(ImagesService, { useClass: ImagesServiceMock }),
    UserSettingsComponent
  ]);

  it('UserSettingsComponent_getAvailableImages_shouldSetAllPointerImages',
    inject([UserSettingsComponent], (instance) => {
      // Arrange
      var allPointerImagesLocal: string[] = new Array<string>();
      allPointerImagesLocal = ['./app/assets/images/pointer/small.png', './app/assets/images/pointer/big.png'];
      spyOn(instance.imagesService, 'getPointerImages').and.callThrough();

      // Act
      instance.getAvailableImages();

      // Assert
      expect(instance.allImages).toEqual(allPointerImagesLocal);
    }));

  it('UserSettingsComponent_selectBackgroundColor_shouldSetBgColorAndRestorePointerDefaults', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
      // Arrange
      var nonDefaultPointerColor: PointerColor = PointerColor.Blue;
      var defaultPointerColor: PointerColor = PointerColor.White;
      var bgColor: BackgroundColor = BackgroundColor.BlackAndWhite;
      instance = fixture.componentInstance;
      instance.userSettings = new UserSettings();
      instance.userSettings.backgroundColor = BackgroundColor.InColor;
      instance.userSettings.pointerColor = nonDefaultPointerColor;
      fixture.detectChanges();
      spyOn(fixture.componentInstance.pointerColorService, 'getPointerColors').and.callFake(getTestPointerColors);

      // Act
      instance.selectBackgroundColor(bgColor);

      // Assert
      expect(fixture.componentInstance.pointerColorService.getPointerColors).toHaveBeenCalledWith(bgColor);
      expect(instance.userSettings.backgroundColor).toEqual(bgColor);
      expect(instance.userSettings.pointerColor).toEqual(defaultPointerColor);
      expect(instance.availablePointerColors).toEqual(getTestPointerColors());
    });
  }));

  it('UserSettingsComponent_selectPointerColor_shouldSetPointerColor', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
      // Arrange
      var defaultPointerColor: PointerColor = PointerColor.White;
      var newPointerColor: PointerColor = PointerColor.Blue;
      instance = fixture.componentInstance;
      instance.userSettings = new UserSettings();
      instance.userSettings.pointerColor = defaultPointerColor;
      fixture.detectChanges();

      // Act
      instance.selectPointerColor(newPointerColor);

      // Assert
      expect(instance.userSettings.pointerColor).toEqual(newPointerColor);
    });
  }));

  it('UserSettingsComponent_selectPointerSize_shouldSetPointerSize', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
      // Arrange
      var defaultPointerSize: PointerSize = PointerSize.Small;
      var newPointerSize: PointerSize = PointerSize.Medium;
      instance = fixture.componentInstance;
      instance.userSettings = new UserSettings();
      instance.userSettings.pointerSize = defaultPointerSize;
      fixture.detectChanges();

      // Act
      instance.selectPointerSize(newPointerSize);

      // Assert
      expect(instance.userSettings.pointerSize).toEqual(newPointerSize);
    });
  }));

  it('UserSettingsComponent_shouldApplySelectedPointerColorCss_shouldReturnTrue', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
      // Arrange
      var selectedPointerColor: PointerColor = PointerColor.White;
      instance = fixture.componentInstance;
      instance.userSettings = new UserSettings();
      instance.userSettings.pointerColor = selectedPointerColor;
      fixture.detectChanges();

      // Act
      var shouldApplyCss = instance.shouldApplySelectedPointerColorCss(selectedPointerColor);

      // Assert
      expect(shouldApplyCss).toBeTruthy();
    });
  }));

  it('UserSettingsComponent_shouldApplySelectedPointerSizeCss_shouldReturnFalse', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
      // Arrange
      var selectedPointerSize: PointerSize = PointerSize.Small;
      var otherPointerSize: PointerSize = PointerSize.Medium;
      instance = fixture.componentInstance;
      instance.userSettings = new UserSettings();
      instance.userSettings.pointerSize = selectedPointerSize;
      fixture.detectChanges();

      // Act
      var shouldApplyCss = instance.shouldApplySelectedPointerSizeCss(otherPointerSize);

      // Assert
      expect(shouldApplyCss).toBeFalsy();
    });
  }));
});
