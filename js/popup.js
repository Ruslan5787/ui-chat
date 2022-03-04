import { UI_COMPONENTS } from './view.js';
import { addScroll } from './helper.js'

UI_COMPONENTS.SETTINGS.BUTTON.addEventListener('click', () => {
  UI_COMPONENTS.SETTINGS.POPUP.classList.add('chat__popup--active')
})

UI_COMPONENTS.CLOSE_BUTTONS.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup()
  })
});

UI_COMPONENTS.SIGN.BUTTON.addEventListener('click', () => {
  UI_COMPONENTS.ACCOUNT.MAIL_POPUP.classList.add('chat__popup--active')
})

function closePopup() {
  const popups = document.querySelectorAll('.chat__popup')

  popups.forEach(popup => {
    popup.classList.remove('chat__popup--active')
  });
}

function openCodePopup() {
  UI_COMPONENTS.ACCOUNT.CODE_POPUP.classList.add('chat__popup--active')
  UI_COMPONENTS.ACCOUNT.MAIL_POPUP.classList.remove('chat__popup--active')
}

export { openCodePopup, addScroll }