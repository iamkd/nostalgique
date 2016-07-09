import React from 'react';

require('../styles/slider.scss');

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Slider';

        this.state = {
          handleOffset: 0
        };
    }

    startMouseDrag(e) {
        console.log(e.pageX);
    }

    render() {
        return <div className='slider'>
          <div className='slider-handle' onMouseDown={this.startMouseDrag.bind(this)} style={{left: this.state.handleOffset + 'px'}}></div>
          <div className='slider-base'></div>
        </div>;
    }
}

export default Slider;
