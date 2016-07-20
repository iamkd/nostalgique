export function playerLoadTrack(trackId) {
  return {
    type: 'PLAYER_LOAD_TRACK',
    trackId,
  };
}

function playerPlay() {
  return {
    type: 'PLAYER_PLAY',
  };
}

function playerPause() {
  return {
    type: 'PLAYER_PAUSE',
  };
}

function playerStop() {
  return {
    type: 'PLAYER_STOP',
  };
}

export function playerNextTrack() {
  return {
    type: 'PLAYER_NEXT_TRACK',
  };
}

export function playerPrevTrack() {
  return {
    type: 'PLAYER_PREV_TRACK',
  };
}

export function playerStartSeeking() {
  return {
    type: 'PLAYER_START_SEEKING',
  };
}

export function playerStopSeeking() {
  return {
    type: 'PLAYER_STOP_SEEKING',
  };
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
  };
}

export function playerSetVolume(volume) {
  return {
    type: 'PLAYER_SET_VOLUME',
    volume,
  };
}
