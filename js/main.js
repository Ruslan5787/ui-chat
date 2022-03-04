import { UI_COMPONENTS } from "./view.js";
import { openCodePopup } from "./popup.js";
import { getCookie, addScroll, getTime } from "./helper.js";

const SERVER_API = {
  MAIL: 'https://chat1-341409.oa.r.appspot.com/api/user',
  USER_NAME: 'https://chat1-341409.oa.r.appspot.com/api/user',
  USER_INFO: 'https://chat1-341409.oa.r.appspot.com/api/user/me',
  MESSAGE_HISTORY: 'https://chat1-341409.oa.r.appspot.com/api/messages/',
  SOCKET: 'ws://chat1-341409.oa.r.appspot.com/websockets?',
}

let numberNewMessages = 20

document.addEventListener('DOMContentLoaded', () => {
  makeRequest(SERVER_API.MESSAGE_HISTORY, 'GET',
    { 'Authorization': `Bearer ${getCookie('userCode')}` }, undefined, true
  )
  renderMessagesHistory()
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
  document.cookie = `userMail=${userMail}`

  event.preventDefault()
})

UI_COMPONENTS.CODE.FORM.addEventListener('submit', event => {
  const userCode = UI_COMPONENTS.CODE.FIELD.value

  document.cookie = `userCode=${userCode}`
  event.preventDefault()
})

UI_COMPONENTS.SETTINGS.FORM.addEventListener('submit', event => {
  const userName = UI_COMPONENTS.SETTINGS.INPUT.value

  makeRequest(SERVER_API.USER_NAME, 'PATCH',
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie('userCode')}`
    },
    JSON.stringify({ name: userName })
  )

  event.preventDefault()
})

async function makeRequest(url, method, headersObj, body, isMessageHistory) {
  const response = await fetch(url, {
    method: method,
    headers: headersObj,
    body: body,
  })
  const results = await response.json()

  // console.log(results);

  if (isMessageHistory) {
    saveHistoryMessage(results.messages)
  }
}

const socket = new WebSocket(`${SERVER_API.SOCKET}${getCookie('userCode')}`)
socket.onopen = () => {
  UI_COMPONENTS.MESSAGE.FORM.addEventListener('submit', event => {
    const inputValue = UI_COMPONENTS.CHAT.INPUT.value

    socket.send(JSON.stringify({
      text: `${inputValue}`,
    }))

    event.preventDefault()
  })
}

socket.onmessage = (event) => {
  addScroll()
  renderMessages(event.data)
}

function saveHistoryMessage(data) {
  const array = data.reverse()

  localStorage.setItem('messagesHistory', JSON.stringify(array))
}

UI_COMPONENTS.CHAT.WINDOW_WRAPPER.addEventListener('scroll', () => {
  addMessages()
})

function addMessages() {
  const scrollTop = UI_COMPONENTS.CHAT.WINDOW_WRAPPER.scrollTop

  if (scrollTop === 0) {
    renderMessagesHistory()
  }
}

function renderMessagesHistory() {
  const messagesHistory = JSON.parse(localStorage.getItem('messagesHistory'))
  let desiredMessages = messagesHistory.splice(0, 20)
  console.log(desiredMessages);
  localStorage.setItem('messagesHistory', JSON.stringify(messagesHistory))
  desiredMessages = desiredMessages.reverse()

  desiredMessages.forEach((element) => {
    renderMessages(JSON.stringify(element))
    addScroll()
  });
}

function renderMessages(data) {
  data = JSON.parse(data)

  let messageText = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__text')
  let messageDate = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__time')
  let messageUserName = UI_COMPONENTS.MESSAGE.TEMPLATE.content.querySelector('.chat-message__person')

  messageText.textContent = data.text
  messageDate.textContent = getTime(data.createdAt)
  messageUserName.textContent = `${data.user.name}:`

  const message = UI_COMPONENTS.MESSAGE.TEMPLATE.content.cloneNode(true)
  const messageWrapper = message.querySelector('.chat__window-message--wrapper')

  if (data.user.email === getCookie('userMail')) {
    messageWrapper.classList.add('chat-message__wrapper--mainUser')
  }

  UI_COMPONENTS.CHAT.WINDOW_WRAPPER.append(message)
  UI_COMPONENTS.CHAT.INPUT.value = ''
}
