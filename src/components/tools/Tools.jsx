import React from 'react';
import { connect } from 'react-redux';
import { dateSliderChange, dateSliderDragStart, dateSliderDragStop } from '../../actions/ui';
import { setDateFilter } from '../../actions/audios'

import ReactSlider from 'react-slider';

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Tools';
        this.state = {
          velocityInterval: null,
          velocity: 0,
          prevValue: 0,
          curValue: 1000,
          listId: -1,
          maxValue: 1000
        };
    }

    componentWillReceiveProps(newProps) {
      if (newProps && newProps.dateList) {
        let breakpoints = newProps.dateList.length;
        let sliderMaxValue = breakpoints * 100 - 1;
        this.setState({maxValue: sliderMaxValue, curValue: sliderMaxValue, itemRange: 100});
        
      }
    }

    sliderBeforeChange() {
      const { dispatch } = this.props;
      dispatch(dateSliderDragStart());

      this.setState({
        prevValue: this.refs.dateSlider.getValue(),
        velocityInterval: setInterval(() => {
          const { prevValue, curValue } = this.state;
          let velocity = Math.abs(prevValue - curValue) / 100;

          if (curValue < prevValue) {
            velocity = -velocity;
          }

          this.setState({velocity: velocity});
        }, 100)
      });
    }

    sliderChange() {
      const { dispatch } = this.props;
      const value = this.refs.dateSlider.getValue();
      const { itemRange } = this.state;

      let listId = Math.floor(value / itemRange);

      this.setState({prevValue: this.state.curValue, curValue: this.refs.dateSlider.getValue(), listId: listId})
      dispatch(dateSliderChange(this.state.velocity)); 
    }

    sliderAfterChange() {
      const { dispatch, dateList } = this.props;

      dispatch(dateSliderDragStop());
      dispatch(setDateFilter(dateList[this.state.listId]));

      this.setState({velocity: 0});
      clearInterval(this.state.velocityInterval);
    }

    render() {
        const { dateList } = this.props;
        const { listId } = this.state;
        
        let ready = false;
        let curDate = null;
        if (dateList && listId >= 0) {
          curDate = dateList[listId];
          ready = true;
        }

        return <div className="tools">
                  <p className="date">
                    {ready ? curDate.month + ' ' + curDate.year : ''} 
                  </p>

                  <ReactSlider 
                    ref="dateSlider" 
                    value={this.state.curValue} 
                    max={this.state.maxValue}
                    withBars 
                    barClassName="slider-body" 
                    onBeforeChange={this.sliderBeforeChange.bind(this)} 
                    onChange={this.sliderChange.bind(this)} 
                    onAfterChange={this.sliderAfterChange.bind(this)}>
                    <div className="slider-handle"></div>
                  </ReactSlider>
                </div>;
    }
}

function mapStateToProps(state) {
  return { minDate: state.audios.minDate, 
           maxDate: state.audios.maxDate,
           dateList: state.audios.dateList
          };
}

export default connect(mapStateToProps)(Tools);
