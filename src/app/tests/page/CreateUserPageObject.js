var CreateUserPage = function() {




  var createBtnFirstPage = element(by.id("createUser"));
  var enterName = element(by.id("username"));
  var createBtnSecondPage = element(by.id("createNewUser"));
  var createdProfilMsg = element(by.xpath("/html/body/app/div/login/div/div/div[1]/label"));
  var alertmessage = element(by.id("messagelabel"));
  var image = element.all(by.className("img-circle"));
  var firstimage = element.all(by.className("img-circle")).get(1);
  var backBtn = element(by.id("backToLogin"));
  var name;
  var imageNumber;
  var randomNo;
  var autoGenerateUserName;
  var imageurl;
  var selectedProfileImg = element(by.css("body > app > div > undefined > div > div > div.col-md-2.col-sm-4 > div > div > div > div:nth-child(2) > img"));
  var profileName = element(by.css("body > app > div > undefined > div > div > div.col-md-2.col-sm-4 > div > div > div > div.title.text-center > label"));
  var nameProfile;
  var radiobtn = element.all(by.css('input[type="radio"]'));
  var colors = element.all(by.className('color-box'));
  var colorRed = element(by.id("pointer-color-4"));
  var countedcolors;
  var option;
  var selectedImage;
  var whiteColor = element(by.id("pointer-color-0"));
  var blueColor = element(by.id("pointer-color-3"));
  var greenColor = element(by.id("pointer-color-2"));
  var yellowColor = element(by.id("pointer-color-1"));
  var smallPointer = element(by.id("pointer-size-0"));
  var mediumPointer = element(by.id("pointer-size-1"));

  this.get = function(value) {
    browser.get(value);
  };


  this.clickCreateBtn = function() {
    createBtnFirstPage.click();
  };

  SelectRandomPicture = function() {

    randomNo = Math.floor(Math.random() * (12)) + 1;
    console.log("Random broj: " + randomNo);
    selectedImage = image.get(randomNo);
    imageurl = selectedImage.getAttribute('src');
    selectedImage.click();
    console.log("Kliknata slikicka");
  };

  this.clickCreateBtnAfter = function() {
    createBtnSecondPage.click();
  };

  AutoGenerateUserName = function() {
    autoGenerateUserName = "Auto-UserName-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 3; i++) {
      autoGenerateUserName += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    enterName.sendKeys(autoGenerateUserName);
  };

  this.CreateUserSettingsRandom = function() {
    createBtnFirstPage.click();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    autoGenerateUserName = "Auto-UserName-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 3; i++) {
      autoGenerateUserName += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    enterName.sendKeys(autoGenerateUserName);
    SelectRandomPicture();
  }

  this.CreateAutoGenerateUserName = function() {
    createBtnFirstPage.click();
    SelectRandomPicture();
    AutoGenerateUserName();
    createBtnSecondPage.click();
  };

  this.NumberOfColors = function() {
    return colors.count();
  };

  this.SelectRadioButton = function(option) {
    var radioselect = radiobtn.get(option);
    radioselect.getAttribute("innerHTML").then(function(text) {
      var selectedOption = text;
      console.log("Selektirana opcija" + selectedOption);
      radioselect.click();
    });
  };


  selectRadioButton = function(option) {
    var radioselect = radiobtn.get(option);
    radioselect.getAttribute("innerHTML").then(function(text) {
      var selectedOption = text;
      console.log("Selektirana opcija" + selectedOption);
      radioselect.click();
    });
  };

  this.CreatePredefinedUserName = function(name) {
    browser.sleep(500);
    createBtnFirstPage.click();
    browser.sleep(2000);
    SelectRandomPicture();
    enterName.sendKeys(name);
    createBtnSecondPage.click();
  };

  this.CreatePredefinedUserNameWithUserSettings = function(name) {
    createBtnFirstPage.click();
    browser.sleep(2000);
    SelectRandomPicture();
    enterName.sendKeys(name);
    browser.sleep(500);
    selectRadioButton("0");
    mediumPointer.click();
    colorRed.click();
    createBtnSecondPage.click();
  };


  this.writeName = function(name) {
    enterName.sendKeys(name);
  };

  this.selectPicture = function() {
    SelectRandomPicture();
  };

  this.checkText = function() {
    return createdProfilMsg.getText();
  };


  this.clickBack = function() {
    backBtn.click();
  };

  this.ReturnMessage = function() {
    return alertmessage.getText();

  };

  this.isCreateBtnEnabled = function() {
    return createBtnSecondPage.isEnabled();
  };

  this.FilterUsername = function(filter) {
    enterName.sendKeys(filter);

  };

  this.ClearFilter = function() {
    enterName.clear();
  };

  this.GetImageUrl = function() {
    return imageurl;
  };

  this.GetProfileImageUrl = function() {
    return selectedProfileImg.getAttribute('src');
  };

  this.GetCurrentUrl = function() {
    return browser.getCurrentUrl();
  };

  this.GetEnteredName = function() {
    return enterName.getText();
  };

  this.GetProfileName = function() {
    return profileName.getText()
  };

  this.IsRedPresent = function() {

    return colorRed.isPresent();
  }

  this.WaitforCreateBtn = function() {
    browser.wait(EC.visibilityOf(createBtnFirstPage), 5000);
  };

  this.selectMediumPointer = function() {
    mediumPointer.click();
  };

  this.selectSmallPointer = function() {
    smallPointer.click();
  };

  this.selectRedColor = function() {
    colorRed.click();
  };

  this.selectGreenColor = function() {
    greenColor.click();
  };

  this.selectBlueColor = function() {
    blueColor.click();
  };

  this.selectWhiteColor = function() {
    whiteColor.click();
  };

  this.selectYellowColor = function() {
    yellowColor.click();
  };


};

module.exports = new CreateUserPage();
