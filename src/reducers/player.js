function player(state = {isPlaying: false, currentTrackId: -1, currentPosition: null, volume: 50}, action) {
  switch (action.type) {
    case 'PLAYER_LOAD_TRACK':
      return Object.assign({}, state, {
        currentTrackId: action.trackId
      });
    case 'PLAYER_PLAY':
      return Object.assign({}, state, {
        isPlaying: true
      });
    case 'PLAYER_PAUSE':
      return Object.assign({}, state, {
        isPlaying: false
      });
    default:
      return state;
  }
}

export default player;