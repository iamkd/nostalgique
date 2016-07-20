export function dateSliderChange(velocity) {
  return {
    type: 'DATE_SLIDER_CHANGE',
    velocity,
  };
}

export function dateSliderDragStart() {
  return {
    type: 'DATE_SLIDER_DRAG_START',
  };
}

export function dateSliderDragStop(value) {
  return {
    type: 'DATE_SLIDER_DRAG_STOP',
    value,
  };
}
