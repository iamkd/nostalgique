import React from 'react';
import { connect } from 'react-redux';
import { dateSliderChange, dateSliderDragStart, dateSliderDragStop } from '../../actions/ui';
import { setDateFilter } from '../../actions/audios'

import Loader from '../Loader.jsx';
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
      if (newProps && newProps.dateList && newProps.dateList != this.props.dateList) {
        let breakpoints = newProps.dateList.length;
        let sliderMaxValue = breakpoints * 1000 - 1;
        this.setState({maxValue: sliderMaxValue, curValue: sliderMaxValue, itemRange: 1000});
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
      const { dispatch, dateList } = this.props;
      const value = this.refs.dateSlider.getValue();
      const { itemRange } = this.state;

      let listId = Math.floor(value / itemRange);

      this.setState({prevValue: this.state.curValue, curValue: this.refs.dateSlider.getValue(), listId: listId})
      dispatch(dateSliderChange(this.state.velocity)); 
      dispatch(setDateFilter(dateList[this.state.listId]));
    }

    sliderAfterChange() {
      const { dispatch, dateList } = this.props;

      dispatch(dateSliderDragStop());
      dispatch(setDateFilter(dateList[this.state.listId]));

      this.setState({velocity: 0});
      clearInterval(this.state.velocityInterval);
    }

    render() {
        const { dateFilter } = this.props;

        let dateString = '';
        if (dateFilter) {
          dateString = dateFilter.season + ' ' + dateFilter.year;
          if (dateFilter.season == 'winter') {
            if (dateFilter.monthNumber == 11) {
              dateString = dateFilter.season + ' ' + dateFilter.year + '-' + (dateFilter.year + 1);
            } else {
              dateString = dateFilter.season + ' ' + (dateFilter.year - 1) + '-' + dateFilter.year;
            }
          }
        }
      
        return <div className="tools">
                  <p className="date">
                    {dateFilter ? dateString : <Loader />} 
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
  const { minDate, maxDate, dateList, dateFilter } = state.audios;
  return { minDate, 
           maxDate,
           dateList,
           dateFilter
          };
}

export default connect(mapStateToProps)(Tools);
