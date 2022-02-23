import Cookies from 'js-cookie'
import { format, compareAsc } from 'date-fns'

import { UI_COMPONENTS } from "./view.js";
import { openCodePopup, addScroll } from "./minutiae.js";

const MAIN_USER_INFO = {
  MAIL: 'abdulaz1movr@yandex.ru',
}

const SERVER_API = {
  MAIL: 'https://chat1-341409.oa.r.appspot.com/api/user',
  USER_NAME: 'https://chat1-341409.oa.r.appspot.com/api/user',
  USER_INFO: 'https://chat1-341409.oa.r.appspot.com/api/user/me',
  MESSAGE_HISTORY: 'https://chat1-341409.oa.r.appspot.com/api/messages/',
  SOCKET: 'ws://chat1-341409.oa.r.appspot.com/websockets?',
}

document.addEventListener('DOMContentLoaded', () => {
  makeRequest(SERVER_API.MESSAGE_HISTORY, 'GET',
    { 'Authorization': `Bearer ${Cookies.get('userCode')}` },
    undefined, 'true'
  )
})

UI_COMPONENTS.MAIL.FORM.addEventListener('submit', event => {
  const userMail = UI_COMPONENTS.MAIL.FIELD.value

  makeRequest(SERVER_API.MAIL, 'POST',
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    JSON.stringify({ email: userMail })
  )
  openCodePopup()

  event.preventDefault()
})

UI_COMPONENTS.CODE.FORM.addEventListener('submit', event => {
  const userCode = UI_COMPONENTS.CODE.FIELD.value

  Cookies.set('userCode', `${userCode}`)
  event.preventDefault()
})

UI_COMPONENTS.SETTINGS.FORM.addEventListener('submit', event => {
  const userName = UI_COMPONENTS.SETTINGS.INPUT.value

  makeRequest(SERVER_API.USER_NAME, 'PATCH',
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('userCode')}`
    },
    JSON.stringify({ name: userName })
  )

  event.preventDefault()
})

async function makeRequest(url, method, headersObj, body) {
  const response = await fetch(url, {
    method: method,
    headers: headersObj,
    body: body,
  })
  const results = await response.json()
  console.log(results);

  if (renderHistory) {
    renderMessages(results)
  }
}

function renderMessages(data) {
  let messageText = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__text')
  let messageDate = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__time')
  let messageNameUser = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__person')

  data.messages.forEach(element => {
    messageText.textContent = element.message
    messageDate.textContent = format(new Date(element.createdAt), 'HH:mm')
    messageNameUser.textContent = `${element.username}:`

    const message = UI_COMPONENTS.MESSAGE.TEMPLATE.content.cloneNode(true)
    const messageWrapper = message.querySelector('.chat__window-message--wrapper')

    if (element.username === 'test user') {
      messageWrapper.classList.add('chat-message__wrapper--mainUser')
    } else {
      messageWrapper.classList.add('chat-message__wrapper--secondUser')
    }

    UI_COMPONENTS.CHAT.WINDOW_WRAPPER.append(message)
  });
}

const socket = new WebSocket(`${SERVER_API.SOCKET}${Cookies.get('userCode')}`)
socket.onopen = (e) => {
  UI_COMPONENTS.MESSAGE.FORM.addEventListener('submit', event => {
    const inputValue = UI_COMPONENTS.CHAT.INPUT.value

    socket.send(JSON.stringify({
      text: `${inputValue}`,
    }))

    event.preventDefault()
  })
}

socket.onmessage = (event) => {
  renderMessagesSocket(event.data)
  addScroll()
}

function renderMessagesSocket(data) {
  data = JSON.parse(data)
  console.log(data);

  let messageText = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__text')
  let messageDate = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__time')
  let messageNameUser = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__person')

  messageText.textContent = data.text
  messageDate.textContent = format(new Date(data.createdAt), 'HH:mm')
  messageNameUser.textContent = `${data.user.name}:`

  const message = UI_COMPONENTS.MESSAGE.TEMPLATE.content.cloneNode(true)
  const messageWrapper = message.querySelector('.chat__window-message--wrapper')

  if (data.user.email === MAIN_USER_INFO.MAIL) {
    messageWrapper.classList.add('chat-message__wrapper--mainUser')
  }

  UI_COMPONENTS.CHAT.WINDOW_WRAPPER.append(message)
  UI_COMPONENTS.CHAT.INPUT.value = ''
}
