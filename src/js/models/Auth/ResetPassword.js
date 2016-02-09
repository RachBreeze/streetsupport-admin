var ajax = require('basic-ajax')
var adminUrls = require('../../admin-urls')
var browser = require('../../browser')
var cookies = require('../../cookies')
var ko = require('knockout')
var BaseViewModel = require('../BaseViewModel')

function ResetPasswordModel () {
  var self = this

  self.password = ko.observable('')
  self.isSubmitting = false

  self.submit = function () {
    var self = this
    if (!self.isSubmitting) {
      self.isSubmitting = true
      self.message('Loading, please wait')
      ajax.postJson(self.endpointBuilder.sessions().build() + '/create', {
        'username': self.username(),
        'password': self.password()
      })
      .then(function (result) {
        cookies.set('session-token', result.json.sessionToken)
        cookies.set('auth-claims', result.json.authClaims)
        browser.redirect(adminUrls.redirector)
      }, function (error) {
        self.setErrors(error)
        self.message('')
        self.isSubmitting = false
      })
    }
  }
}

ResetPassword.prototype = new BaseViewModel()

module.exports = ResetPassword