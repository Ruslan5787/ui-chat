import { UI_COMPONENTS } from "./view.js";

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
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

function getTime(time) {
  const date = new Date(time)
  const result = [date.getHours(), date.getMinutes()].map((item) => {
    if (item < 10) {
      return '0' + item
    }
    return item
  }).join(":")

  return result
}

export {
  getCookie, addScroll, getTime
}