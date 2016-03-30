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
    LogInPage.FilterUsername("Josi");
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isWhiteColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isSmallPointerSelected()).toBe(true);
  });

  it("User can create new user with default settings", function() {
    CreateUserPage.CreatePredefinedUserNameWithUserSettings("Daniela");
    browser.sleep(1000);
    LogInPage.FilterUsername("D");
    LogInPage.FilterUsername("a");
    LogInPage.FilterUsername("n");
    LogInPage.FilterUsername("i");
    LogInPage.FilterUsername("e");
    LogInPage.FilterUsername("l");
    LogInPage.FilterUsername("a");
    browser.sleep(1000);
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.openUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isRedColorSelected()).toBe(true);
    expect(UserSettingsEditPage.isMediumPointerSelected()).toBe(true);
  });

  it("User can create new user with default settings", function() {
    CreateUserPage.CreatePredefinedUserName("Dragica");
    browser.sleep(1000);
    LogInPage.FilterUsername("D");
    LogInPage.FilterUsername("r");
    LogInPage.FilterUsername("a");
    LogInPage.FilterUsername("g");
    LogInPage.FilterUsername("i");
    LogInPage.FilterUsername("c");
    LogInPage.FilterUsername("a");
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
  });


});
