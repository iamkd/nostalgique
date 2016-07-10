const initialState = {
  dateSlider: {
    isDragging: false, 
    position: null, 
    velocity: null
  }
};

function dateSlider(state = initialState.dateSlider, action) {
  switch (action.type) {
    case 'DATE_SLIDER_DRAG_START':
      return Object.assign({}, state, {
        dateSliderIsDragging: true
      });
    case 'DATE_SLIDER_DRAG_CHANGE':
      return Object.assign({}, state, {
        velocity: action.velocity
      });
    case 'DATE_SLIDER_DRAG_STOP':
      return Object.assign({}, state, {
        dateSliderIsDragging: false
      });
  }
}

function ui(state = initialState, action) {
  switch (action.type) {
    case 'DATE_SLIDER_DRAG_START':
    case 'DATE_SLIDER_DRAG_STOP':
    case 'DATE_SLIDER_CHANGE':
      return Object.assign({}, state, {
        dateSlider: dateSlider(state.dateSlider, action)
      });
  }
}