import React from 'react';
import { connect } from 'react-redux';
import { dateSliderChange, dateSliderDragStart, dateSliderDragStop } from '../../actions/ui';
import { setDateFilter } from '../../actions/audios';

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
      maxValue: 1000,
    };

    this.sliderAfterChange = this.sliderAfterChange.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.sliderBeforeChange = this.sliderBeforeChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.dateList && newProps.dateList !== this.props.dateList) {
      const breakpoints = newProps.dateList.length;
      const sliderMaxValue = breakpoints * 1000 - 1;
      this.setState({ maxValue: sliderMaxValue, curValue: sliderMaxValue, itemRange: 1000 });
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

        this.setState({ velocity });
      }, 100),
    });
  }

  sliderChange() {
    const { dispatch } = this.props;
    const value = this.refs.dateSlider.getValue();
    const { itemRange } = this.state;

    const listId = Math.floor(value / itemRange);

    this.setState({
      prevValue: this.state.curValue,
      curValue: this.refs.dateSlider.getValue(),
      listId,
    });

    dispatch(dateSliderChange(this.state.velocity));
  }

  sliderAfterChange() {
    const { dispatch, dateList } = this.props;

    dispatch(dateSliderDragStop());
    dispatch(setDateFilter(dateList[this.state.listId]));

    this.setState({ velocity: 0 });
    clearInterval(this.state.velocityInterval);
  }

  render() {
    const { dateFilter, dateList } = this.props;
    const { listId } = this.state;

    let date = null;
    if (listId === -1) {
      date = dateList[dateList.length - 1];
    } else {
      date = dateList[listId];
    }

    let dateString = '';

    if (dateList.length > 0 && listId != null) {
      dateString = `${date.season} ${date.year}`;
      if (date.season === 'winter') {
        if (date.monthNumber === 11) {
          dateString = `${date.season} ${date.year}-${date.year + 1}`;
        } else {
          dateString = `${date.season} ${date.year - 1}-${date.year}`;
        }
      }
    }

    return (<div className="tools">
      <div className="date">
        {dateFilter ? dateString : <Loader simple />}
      </div>

      <ReactSlider
        ref="dateSlider"
        value={this.state.curValue}
        max={this.state.maxValue}
        withBars
        barClassName="slider-body"
        onBeforeChange={this.sliderBeforeChange}
        onChange={this.sliderChange}
        onAfterChange={this.sliderAfterChange}
      >
        <div className="slider-handle"></div>
      </ReactSlider>
    </div>);
  }
}

Tools.propTypes = {
  dateList: React.PropTypes.array,
  dateFilter: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  const { dateList, dateFilter } = state.audios;
  return {
    dateList,
    dateFilter,
  };
}

export default connect(mapStateToProps)(Tools);
