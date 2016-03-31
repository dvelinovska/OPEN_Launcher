var DeleteUser = function() {

  var someProfile = element.all(by.className("img-circle")).get(0);
  var deleteBtn = element(by.id("deleteBtn"));
  var yesBtn = element(by.id("daBtn"));
  var noBtn = element(by.id("neBtn"));
  var modal = element(by.id("myModal"));
  var alertmessage = element(by.id("messagelabel"));

  this.get = function(value) {
    browser.get(value);
  };

  this.deleteProfile = function() {
    someProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    yesBtn.click();

  };

  this.deleteFilteredUser = function() {
    someProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    yesBtn.click();

  };

  this.deleteBtnIsVisible = function() {
    return deleteBtn.isPresent();
  };
  this.cancelDelete = function() {
    someProfile.click();
    deleteBtn.click();
    browser.wait(EC.visibilityOf(modal), 5000);
    noBtn.click();

  };

  this.isDeleteBtnIsVisible = function() {
    return deleteBtn.isPresent();
  };


  this.returnMessage = function() {
    return alertmessage.getText();
  };
};
module.exports = new DeleteUser();
