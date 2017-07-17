// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets
//= require_tree .
//= require serviceworker-companion
function buildToast(message, timeout){
  if(timeout <= 0){
    timeout = 2750;
  }
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: message,
      timeout: timeout
    }
  );
}
function buildSnackbar(message, timeout, actionHandler, actionText){
  if(timeout <= 0){
    timeout = 2750;
  }
  var notification = document.querySelector('.mdl-js-snackbar');
  var data = {
    message: message,
    actionHandler: actionHandler,
    actionText: actionText,
    timeout: timeout
  };
  notification.MaterialSnackbar.showSnackbar(data);
}
