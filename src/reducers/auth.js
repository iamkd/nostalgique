function auth(state = { isFetching: false, authorized: false }, action) {
  switch (action.type) {
    case 'REQUEST_AUTH':
      return Object.assign({}, state, {
        isFetching: true,
        authorized: false,
      });
    case 'RECEIVE_AUTH':
      return Object.assign({}, state, {
        isFetching: false,
        authorized: action.authorized,
      });
    default:
      return state;
  }
}

export default auth;
