import React from 'react';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Track';

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    this.props.clickedHandler(this.props.track);
  }

  render() {
    const { artist, title, dateStamp } = this.props.track;
    const { current, isPlaying } = this.props;

    let trackClass = 'track';
    if (current) {
      trackClass += ' active';
    }
    if (isPlaying) {
      trackClass += ' is-playing';
    }

    return (<div onClick={this.clicked} className={trackClass}>
      <p className="track-row" style={{ textOverflow: 'ellipsis' }}>
        <i className="playing-icon fa fa-music"></i>
        <b>{artist}</b><span>&nbsp;{String.fromCharCode(8212)}&nbsp;</span><span>{title}</span>
        <span className="track-info">{`${dateStamp.month} ${dateStamp.year}`}</span>
      </p>
    </div>);
  }
}

Track.propTypes = {
  track: React.PropTypes.object,
  clickedHandler: React.PropTypes.func,
  current: React.PropTypes.bool,
  isPlaying: React.PropTypes.bool,
};

export default Track;