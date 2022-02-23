export { UI_COMPONENTS }

const UI_COMPONENTS = {
  CHAT: {
    WINDOW: document.querySelector('.chat__window'),
    WINDOW_WRAPPER: document.querySelector('.chat__window-wrapper'),
    INPUT: document.querySelector('.chat__input'),
  },

  SETTINGS: {
    FORM: document.getElementById('settings-form'),
    INPUT: document.getElementById('settings-input'),
    BUTTON: document.getElementById('settings-button'),
    POPUP: document.querySelector('.chat__popup--settings'),
  },

  MESSAGE: {
    FORM: document.getElementById('message-form'),
    TEMPLATE: document.getElementById('message-template'),
  },

  ACCOUNT: {
    MAIL_POPUP: document.querySelector('.chat__popup-account--mail'),
    CODE_POPUP: document.querySelector('.chat__popup-account--code'),
  },

  MAIL: {
    FORM: document.getElementById('mail-form'),
    FIELD: document.getElementById('mail-field'),
  },

  CODE: {
    FORM: document.getElementById('code-form'),
    FIELD: document.getElementById('code-field'),
  },

  SIGN: {
    BUTTON: document.getElementById('sign-button'),
  },

  CLOSE_BUTTONS: document.querySelectorAll('#close-button'),
}