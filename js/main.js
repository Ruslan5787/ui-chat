import { UI_COMPONENTS } from "./view.js";
// import Cookies from 'js-cookie'

const SERVER_API = {
  MAIL: 'https://chat1-341409.oa.r.appspot.com/api/user',
  USER_NAME: 'https://chat1-341409.oa.r.appspot.com/api/user',
}

UI_COMPONENTS.GET_CODE_FORM.addEventListener('submit', event => {
  const inputValue = UI_COMPONENTS.GET_CODE_FIELD.value
  // console.log(inputVaul);
  sendMail(inputValue)

  event.preventDefault()
})

async function sendMail(mail) {
  const response = await fetch(SERVER_API.MAIL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: mail })
  })
}

// Cookies.set('code', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsYXoxbW92ckB5YW5kZXgucnUiLCJpYXQiOjE2NDUzMzI0ODgsImV4cCI6MTY0NTQxODg4OH0.f1XR6blil-kbwbDoh7sQ03IULt3VVEoGgwJyfbPepGc')

UI_COMPONENTS.SETTINGS_FORM.addEventListener('submit', event => {
  const inputValue = UI_COMPONENTS.SETTINGS_INPUT.value
  // const token = Cookies.get('code')

  changeName(inputValue);//token

  event.preventDefault()
})

async function changeName(nameChanged) {
  const response = await fetch(SERVER_API.USER_NAME, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsYXoxbW92ckB5YW5kZXgucnUiLCJpYXQiOjE2NDUzMzI0ODgsImV4cCI6MTY0NTQxODg4OH0.f1XR6blil-kbwbDoh7sQ03IULt3VVEoGgwJyfbPepGc`
    },
    body: JSON.stringify({ name: nameChanged })
  })
}

// async function getInfoUser() {
//   const response = await fetch('https://chat1-341409.oa.r.appspot.com/api/user/me', {
//     headers: {
//       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsYXoxbW92ckB5YW5kZXgucnUiLCJpYXQiOjE2NDUzMzI0ODgsImV4cCI6MTY0NTQxODg4OH0.f1XR6blil-kbwbDoh7sQ03IULt3VVEoGgwJyfbPepGc`
//     },
//   })
//   const result = await response.json()

//   console.log(result);
// }