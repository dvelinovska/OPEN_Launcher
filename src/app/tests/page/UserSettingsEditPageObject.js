var UserSettingsEditPage = function() {



  var userSettings = element(by.id("userSettingsEdit"));
  var yellowColor = element(by.id("pointer-color-1"));
  var whiteColor = element(by.className("pointer-color-0 color-box img-circle selected"));
  var blueColor = element(by.id("pointer-color-3"));
  var greenColor = element(by.id("pointer-color-2"));
  var smallPointer = element(by.className("img-circle selected"));
  var mediumPointer = element(by.className("img-circle selected"));
  var colorRedSelected = element(by.className("pointer-color-4 color-box img-circle selected"));
  var radiobtn = element.all(by.css('input[type="radio"]'));
  var someProfile = element.all(by.className("img-circle")).get(0);
  var signBtn = element(by.id("btn-login"));

  this.get = function(value) {
    browser.get(value);
  };

  this.openUserSettings = function() {
    userSettings.click();
  }

  this.isRedColorSelected = function() {
    return colorRedSelected.isPresent();
  };

  this.isWhiteColorSelected = function() {
    return whiteColor.isPresent();
  };

  this.isMediumPointerSelected = function() {
    return mediumPointer.isPresent();
  };

  this.isSmallPointerSelected = function() {
    return smallPointer.isPresent();
  };

  this.logInFilteredUser = function() {
    someProfile.click();
    signBtn.click();
  };

};

module.exports = new UserSettingsEditPage();
