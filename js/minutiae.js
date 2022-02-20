import { UI_COMPONENTS } from "./view.js";

function addScroll() {
  const heightWindow = UI_COMPONENTS.WINDOW.offsetHeight
  const heightWindowWrapper = UI_COMPONENTS.WINDOW_WRAPPER.offsetHeight

  if (heightWindowWrapper > heightWindow) {
    UI_COMPONENTS.WINDOW_WRAPPER.classList.add('chat__window-wrapper--scroll')
    UI_COMPONENTS.WINDOW.style.paddingRight = '3px'
  }

  UI_COMPONENTS.WINDOW_WRAPPER.scrollTop = UI_COMPONENTS.WINDOW_WRAPPER.scrollHeight;
}

UI_COMPONENTS.SETTINGS_BUTTON.addEventListener('click', () => {
  UI_COMPONENTS.SETTINGS_POPUP.classList.add('chat__popup--active')
})

UI_COMPONENTS.CLOSE_BUTTONS.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.closest('.chat__popup--account')) {
      UI_COMPONENTS.ACCOUNT_POPUP.classList.remove('chat__popup--active')
    } else {
      UI_COMPONENTS.SETTINGS_POPUP.classList.remove('chat__popup--active')
    }
  })
});

UI_COMPONENTS.MESSAGE_FORM.addEventListener('submit', event => {
  addMessage()
  addScroll()

  event.preventDefault()
})

function addMessage() {
  const inputValue = UI_COMPONENTS.CHAT_INPUT.value
  const messageText = UI_COMPONENTS.MESSAGE_TEMPLATE.content.querySelector('.chat-message__text')

  messageText.textContent = inputValue

  const message = UI_COMPONENTS.MESSAGE_TEMPLATE.content.cloneNode(true)

  UI_COMPONENTS.WINDOW_WRAPPER.append(message)
  UI_COMPONENTS.CHAT_INPUT.value = ''
}

UI_COMPONENTS.SIGN_BUTTON.addEventListener('click', () => {
  UI_COMPONENTS.ACCOUNT_POPUP.classList.add('chat__popup--active')
})
