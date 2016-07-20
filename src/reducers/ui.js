const initialState = {
  dateSlider: {
    isDragging: false,
    position: null,
    velocity: 0,
  },
};

function dateSlider(state = initialState.dateSlider, action) {
  switch (action.type) {
    case 'DATE_SLIDER_DRAG_START':
      return Object.assign({}, state, {
        isDragging: true,
      });
    case 'DATE_SLIDER_CHANGE':
      return Object.assign({}, state, {
        velocity: action.velocity,
      });
    case 'DATE_SLIDER_DRAG_STOP':
      return Object.assign({}, state, {
        isDragging: false,
        velocity: 0,
      });
    default:
      return state;
  }
}

export default function ui(state = initialState, action) {
  switch (action.type) {
    case 'DATE_SLIDER_DRAG_START':
    case 'DATE_SLIDER_DRAG_STOP':
    case 'DATE_SLIDER_CHANGE':
      return Object.assign({}, state, {
        dateSlider: dateSlider(state.dateSlider, action),
      });
    default:
      return state;
  }
}
