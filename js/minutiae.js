// import { format, compareAsc } from 'date-fns'
import { UI_COMPONENTS } from './view.js';

UI_COMPONENTS.SETTINGS.BUTTON.addEventListener('click', () => {
  UI_COMPONENTS.SETTINGS.POPUP.classList.add('chat__popup--active')
})

UI_COMPONENTS.CLOSE_BUTTONS.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup()
  })
});

function closePopup() {
  const popups = document.querySelectorAll('.chat__popup')

  popups.forEach(popup => {
    popup.classList.remove('chat__popup--active')
  });
}

function addScroll() {
  const heightWindow = UI_COMPONENTS.CHAT.WINDOW.offsetHeight
  const heightWindowWrapper = UI_COMPONENTS.CHAT.WINDOW_WRAPPER.offsetHeight

  if (heightWindowWrapper > heightWindow) {
    UI_COMPONENTS.CHAT.WINDOW_WRAPPER.classList.add('chat__window-wrapper--scroll')
    UI_COMPONENTS.CHAT.WINDOW.style.paddingRight = '3px'
  }

  UI_COMPONENTS.CHAT.WINDOW_WRAPPER.scrollTop = UI_COMPONENTS.CHAT.WINDOW_WRAPPER.scrollHeight;
}

UI_COMPONENTS.SIGN.BUTTON.addEventListener('click', () => {
  UI_COMPONENTS.ACCOUNT.MAIL_POPUP.classList.add('chat__popup--active')
})

function openCodePopup() {
  UI_COMPONENTS.ACCOUNT.CODE_POPUP.classList.add('chat__popup--active')
  UI_COMPONENTS.ACCOUNT.MAIL_POPUP.classList.remove('chat__popup--active')
}

export { openCodePopup, addScroll }