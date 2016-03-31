import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing';

import {provide, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {UserSettingsComponent} from './UserSettingsComponent';
import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, PointerSize, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {Alert} from '../alerting/Alert';
import {AlertingService} from '../alerting/AlertingService';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserSettings} from '../../shared/models/UserSettings';

describe('UserSettingsComponentTests', function() {
  var instance: UserSettingsComponent = null;

  class ImagesServiceMock {
    getPointerImages() {
      var pointerImages = '["./app/assets/images/pointer/small.png", "./app/assets/images/pointer/big.png"]';
      var obj = JSON.parse(pointerImages);
      return Observable.of(obj);
    }
  }

  beforeEachProviders(() => [
    provide(AlertingService, { useClass: AlertingService }),
    provide(UserSettingsColorsService, { useClass: UserSettingsColorsService }),
    provide(ImagesService, { useClass: ImagesServiceMock }),
    UserSettingsComponent
  ]);

  it('getAvailableImages_givenAvailableImageService_shouldSetAllPointerImages',
    inject([UserSettingsComponent], (instance) => {
      // Arrange
      var allPointerImagesLocal: string[] = new Array<string>();
      allPointerImagesLocal = ['./app/assets/images/pointer/small.png', './app/assets/images/pointer/big.png'];
      spyOn(instance.imagesService, 'getPointerImages').and.callThrough();

      // Act
      instance.getAvailableImages();

      // Assert
      expect(instance.allPointerImages).toEqual(allPointerImagesLocal);
    }));

  it('setBackgroundColorAndPointerColors_givenBlackAndWhiteBgColor_shouldSetBgColorAndLoadPointerColors',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        var bgColor: BackgroundColor = BackgroundColor.BlackAndWhite;
        instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.backgroundColor = BackgroundColor.InColor;
        fixture.detectChanges();
        spyOn(fixture.componentInstance.pointerColorService, 'getPointerColors').and.callFake(() => { });

        // Act
        instance.setBackgroundColorAndPointerColors(bgColor);

        // Assert
        expect(instance.userSettings.backgroundColor).toEqual(bgColor);
        expect(fixture.componentInstance.pointerColorService.getPointerColors).toHaveBeenCalledWith(bgColor);
      });
    }));

  it('selectBackgroundColor_givenBlackAndWhiteBgColor_shouldCallSetBackgroundMethodAndSetPointerDefaults',
    injectAsync([TestComponentBuilder], (tcb) => {
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
        spyOn(instance, 'setBackgroundColorAndPointerColors').and.callThrough();
        spyOn(instance, 'selectPointerColor').and.callThrough();

        // Act
        instance.selectBackgroundColor(bgColor);

        // Assert
        expect(instance.setBackgroundColorAndPointerColors).toHaveBeenCalledWith(bgColor);
        expect(instance.selectPointerColor).toHaveBeenCalledWith(defaultPointerColor);
      });
    }));

  it('selectPointerColor_givenPointerColor_shouldSetPointerColor',
    injectAsync([TestComponentBuilder], (tcb) => {
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

  it('selectPointerSize_givenPointerSize_shouldSetPointerSize',
    injectAsync([TestComponentBuilder], (tcb) => {
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

  it('shouldBeChecked_givenSelectedBgColor_shouldBeTruthy',
    injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.overrideTemplate(UserSettingsComponent, '').createAsync(UserSettingsComponent).then((fixture) => {
        // Arrange
        var selectedBgColor: BackgroundColor = BackgroundColor.InColor;
        instance = fixture.componentInstance;
        instance.userSettings = new UserSettings();
        instance.userSettings.backgroundColor = selectedBgColor;
        fixture.detectChanges();

        // Act
        var checked = instance.shouldBeChecked(selectedBgColor);

        // Assert
        expect(checked).toBeTruthy();
      });
    }));

  it('shouldApplySelectedPointerColorCss_givenSelectedPointerColor_shouldBeTruthy',
    injectAsync([TestComponentBuilder], (tcb) => {
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

  it('shouldApplySelectedPointerSizeCss_givenPointerSizeDiffenrentThanSelected_shouldBeFalsy',
    injectAsync([TestComponentBuilder], (tcb) => {
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
