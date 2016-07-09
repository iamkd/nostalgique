export function playerLoadTrack(trackId) {
  return {
    type: 'PLAYER_LOAD_TRACK',
    trackId: trackId
  }
}

function playerPlay() {
  return {
    type: 'PLAYER_PLAY'
  }
}

function playerPause() {
  return {
    type: 'PLAYER_PAUSE'
  }
}

function playerStop() {
  return {
    type: 'PLAYER_STOP'
  }
}

export function playerNextTrack() {
  return {
    type: 'PLAYER_NEXT_TRACK'
  }
}

export function playerPrevTrack() {
  return {
    type: 'PLAYER_PREV_TRACK'
  }
}

function playerSeeking(value) {
  return {
    type: 'PLAYER_SEEKING',
    value: value
  }
}

export function playerSetPlayState(state) {
  return dispatch => {
    switch (state) {
      case 'play': dispatch(playerPlay()); break;
      case 'pause': dispatch(playerPause()); break;
      case 'stop':
      default:
        dispatch(playerStop()); break;
    }
  }
}