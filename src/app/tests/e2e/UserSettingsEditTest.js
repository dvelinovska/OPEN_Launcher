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


  it("User can create new user in color version with pointer size m and pointer color red and change settings", function() {
    CreateUserPage.CreatePredefinedUserName("Josif");
    browser.sleep(1000);
    browser.ignoreSynchronization = false;
    LogInPage.FilterUsername("Josif");
    UserSettingsEditPage.logInFilteredUser();
    console.log("user name filtered");
    UserSettingsEditPage.clickUserSettings();
    console.log("user settings edit open");
    expect(UserSettingsEditPage.isWhiteColorSelected()).toEqual("true");
    expect(UserSettingsEditPage.isSmallPointerSelected()).toEqual("true");
    console.log("nfasofnkfnaf");
  });

});
