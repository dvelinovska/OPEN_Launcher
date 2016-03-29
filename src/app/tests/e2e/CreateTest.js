describe("Game menu log in user", function() {


  var CreateUserPage = require("../page/CreateUserPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");
  var DeleteUser = require("../page/DeletePageObject.js");




  beforeEach(function() {
    console.log(" Before Method : Before Each Function");
    CreateUserPage.get("http://localhost:3000/#/login");
    browser.sleep(1000);

  });

  it("User can create new user ", function() {
    CreateUserPage.CreateAutoGenerateUserName();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can not create new user with same name ", function() {
    CreateUserPage.CreatePredefinedUserName("Josif");
    console.log("Kreiran korisnik");
    CreateUserPage.WaitforCreateBtn();
    CreateUserPage.CreatePredefinedUserName("Josif");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Корисничкото име веќе постои, обидете се да се регистрирате со друго име");
    CreateUserPage.clickBack();
    LogInPage.FilterUsername("Josif");
    DeleteUser.DeleteFilteredUser();
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User with same name already exists");
  });

  it("User can choose random picture", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.selectPicture();
  });

  it("When color game is selected there should be 5 colors to select", function() {
    CreateUserPage.clickCreateBtn();
    AutoGenerateUserName();
    CreateUserPage.selectPicture();
    CreateUserPage.SelectRadioButton(0);
    expect(CreateUserPage.NumberOfColors()).toEqual(5);
  });

  it("When black and white game is selected there should be 2 colors to select", function() {
    CreateUserPage.clickCreateBtn();
    AutoGenerateUserName();
    CreateUserPage.selectPicture();
    CreateUserPage.SelectRadioButton(1);
    expect(CreateUserPage.NumberOfColors()).toEqual(2);
  });

  it("When color game is selected there should be red color to select", function() {
    CreateUserPage.clickCreateBtn();
    AutoGenerateUserName();
    CreateUserPage.selectPicture();
    expect(CreateUserPage.IsRedPresent()).toBe(true);
  });


  it("User can not be created without selecting picture", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.writeName("Dani");
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("За да креирате профил, ве молам изберете слика");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User can not be created");

  });

  it("User can not be created without entering name ", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.selectPicture();
    CreateUserPage.clickCreateBtnAfter();
    expect(CreateUserPage.isCreateBtnEnabled()).toBe(false);
    console.log("Finishing : User can not be created");

  });

  it("Button back is clickable", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.clickBack();
    expect(CreateUserPage.GetCurrentUrl()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when name is populated", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.writeName("Daniela123");
    CreateUserPage.clickBack();
    expect(CreateUserPage.GetCurrentUrl()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when picture is selected", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.selectPicture();
    CreateUserPage.clickBack();
    expect(CreateUserPage.GetCurrentUrl()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });

  it("Button back is clickable when picture is selected and name is populated", function() {
    CreateUserPage.clickCreateBtn();
    CreateUserPage.selectPicture();
    CreateUserPage.writeName("DAni");
    CreateUserPage.clickBack();
    expect(CreateUserPage.GetCurrentUrl()).toEqual("http://localhost:3000/#/login");
    console.log("Button back is clickable")
  });


  /*it("Selected picture should match profile picure while creating a profile", function() {
  CreateUserPage.clickCreateBtn();
  SelectRandomPicture();
  expect(CreateUserPage.GetImageUrl()).toMatch(CreateUserPage.GetProfileImageUrl());
});



it("Entered name should match profile name while creating a profile", function() {
  CreateUserPage.clickCreateBtn();
  CreateUserPage.writeName("Dani");
  SelectRandomPicture();
  expect(CreateUserPage.GetProfileName()).toEqual("Dani");
});
*/

  it("User can create new user in color version with pointer size m and pointer color red", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectRedColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m and pointer color white", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m and pointer color blue", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectBlueColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m and pointer color green", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectGreenColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size m and pointer color yellow", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });


  it("User can create new user in color version with pointer size s and pointer color red", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectRedColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s and pointer color white", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s and pointer color blue", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectBlueColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s and pointer color green", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectGreenColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s and pointer color yellow", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("0");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

   it("User can create new user in color version with pointer size m and pointer color white", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

   it("User can create new user in color version with pointer size m and pointer color yellow", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("1");
    CreateUserPage.selectMediumPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in color version with pointer size s and pointer color white", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("1");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectWhiteColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });

  it("User can create new user in BW version with pointer size s and pointer color yellow", function() {
    CreateUserPage.CreateUserSettingsRandom();
    CreateUserPage.SelectRadioButton("1");
    CreateUserPage.selectSmallPointer();
    CreateUserPage.selectYellowColor();
    CreateUserPage.clickCreateBtnAfter();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(CreateUserPage.ReturnMessage()).toEqual("Успешно внесен корисник.");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    console.log("Finishing : User created");
  });



});
