function requestAudios() {
  return {
    type: 'REQUEST_AUDIOS'
  }
}

function receiveAudios(json) {
  return {
    type: 'RECEIVE_AUDIOS',
    items: json.response.items
  }
}

export function fetchAudios() {
  return dispatch => {
    dispatch(requestAudios());
    return VK.Api.call(
      'audio.get', 
      {need_user: 0, count: 6000, v: '5.52'}, 
      res => dispatch(receiveAudios(res)));
  }
}


function requestUser() {
  return {
    type: 'REQUEST_USER'
  }
}

function receiveUser(json) {
  return {
    type: 'RECEIVE_USER',
    user: json.response[0]
  }
}

export function fetchUser() {
  return dispatch => {
    dispatch(requestUser());
    return VK.Api.call(
      'users.get', 
      {fields: 'photo_200,city', v: '5.52'}, 
      res => dispatch(receiveUser(res)));
  }
}

function requestAuth() {
  return {
    type: 'REQUEST_AUTH'
  }
}

function receiveAuth(session) {
  return {
    type: 'RECEIVE_AUTH',
    authorized: session != null
  }
}

export function authCheckIfNeeded() {
  return dispatch => {
    dispatch(requestAuth());
    return VK.Auth.getLoginStatus(response => {
        if (response.session) {
          dispatch(receiveAuth(response.session));
        } else {
          dispatch(receiveAuth(null));
        }
      }); 
  }
}

export function startAuth() {
  return dispatch => {
    dispatch(requestAuth());
    return VK.Auth.getLoginStatus(response => {
        if (response.session) {
          dispatch(receiveAuth(response.session));
        } else {
          VK.Auth.login((session) => {
            dispatch(receiveAuth(session));
          }, 8);
        }
      }); 
  }
}

export function changeSliderPosition(newPosition) {
  return {
    type: 'SLIDER_CHANGE',
    newPosition
  }
}
