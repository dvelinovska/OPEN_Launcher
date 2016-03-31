describe("Game menu edit user settings", function() {


  var CreateUserPage = require("../page/CreateUserPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");
  var DeleteUser = require("../page/DeletePageObject.js");
  var UserSettingsEditPage = require("../page/UserSettingsEditPageObject.js");


  beforeEach(function() {
    console.log(" Before Method : Before Each Function");
    UserSettingsEditPage.get("http://localhost:3000/#/login");
    browser.sleep(1000);

  });

  it("User can create new user with default settings", function() {
    CreateUserPage.CreatePredefinedUserName("Josi");
    browser.sleep(1000);
    LogInPage.FilterUsernameJosi();
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isWhiteColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isSmallPointerSelected()).toBe(true);
    browser.get("http://localhost:3000/#/login");
    LogInPage.FilterUsernameJosi();
    DeleteUser.DeleteFilteredUser();

  });

  it("User can create new user with pointer size m and pointer color red", function() {
    CreateUserPage.CreatePredefinedUserNameWithUserSettings("Daniela");
    browser.sleep(1000);
    LogInPage.FilterUsernameDaniela();
    browser.sleep(1000);
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isRedColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBe(true);
    browser.get("http://localhost:3000/#/login");
    LogInPage.FilterUsernameDaniela();
    DeleteUser.DeleteFilteredUser();
  });

  it("User can create new user with default settings and change them", function() {
    CreateUserPage.CreatePredefinedUserName("Dragica");
    browser.sleep(1000);
    LogInPage.FilterUsernameDragica();
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectRedColor();
    UserSettingsEditPage.userSettingsSave();
    browser.get("http://localhost:3000/#/login");
    UserSettingsEditPage.openUserSettings();
    expect(UserSettingsEditPage.isRedColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBe(true);
    browser.get("http://localhost:3000/#/login");
    LogInPage.FilterUsernameDragica();
    DeleteUser.DeleteFilteredUser();
  });


});
