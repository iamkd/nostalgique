const initialState = {sliderPosition: null};

function ui(state = initialState, action) {
  switch (action.type) {
    case 'SLIDER_CHANGE':
      return Object.assign({}, state, {
        sliderPosition: action.position
      });
    default:
      return state;
  }
}

export default ui;