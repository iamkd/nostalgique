function player(state = {
  isPlaying: false, currentTrackId: -1, isSeeking: false, volume: 50,
}, action) {
  switch (action.type) {
    case 'PLAYER_START_SEEKING':
      return Object.assign({}, state, {
        isSeeking: true,
      });
    case 'PLAYER_STOP_SEEKING':
      return Object.assign({}, state, {
        isSeeking: false,
      });
    case 'PLAYER_SET_VOLUME':
      return Object.assign({}, state, {
        volume: action.volume,
      });
    case 'PLAYER_LOAD_TRACK':
      return Object.assign({}, state, {
        currentTrackId: action.trackId,
      });
    case 'PLAYER_PLAY':
      return Object.assign({}, state, {
        isPlaying: true,
      });
    case 'PLAYER_PAUSE':
      return Object.assign({}, state, {
        isPlaying: false,
      });
    default:
      return state;
  }
}

export default player;
