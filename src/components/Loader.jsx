import React from 'react';
import { connect } from 'react-redux';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Loader';

    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    this.state = {
      hoursTransform: (hours * 30) + (minutes / 2),
      minutesTransform: (minutes * 6),
      velocity: 1,
    };
  }


  componentWillMount() {
    const updater = setInterval(() => {
      this.setState({
        hoursTransform: this.state.hoursTransform + (1 * this.state.velocity),
        minutesTransform: this.state.minutesTransform + (10 * this.state.velocity),
      });
    }, 20);
    this.setState({ interval: updater });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ velocity: nextProps.velocity });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    if (this.props.simple) {
      return <div className="loader-container">loading</div>;
    }

    return (<div className="loader-container">
      <div className="loader-clock">
        <div className="hours-container">
          <div
            className="hours"
            style={{
              transform: `rotateZ(${this.state.hoursTransform + this.props.velocity}deg)`,
            }}
          >
          </div>
        </div>
        <div className="minutes-container">
          <div
            className="minutes"
            style={{
              transform: `rotateZ(${this.state.minutesTransform + this.props.velocity}deg)`,
            }}
          >
          </div>
        </div>
        <div className="seconds-container">
          <div className="seconds"></div>
        </div>
      </div>
    </div>);
  }
}

Loader.propTypes = {
  simple: React.PropTypes.bool,
  velocity: React.PropTypes.number,
};

function mapStateToProps(state) {
  return { velocity: state.ui.dateSlider.velocity };
}

export default connect(mapStateToProps)(Loader);
