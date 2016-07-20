import React from 'react';

import { connect } from 'react-redux';

import Track from './Track.jsx';
import Loader from '../Loader.jsx';

import { playerLoadTrack } from '../../actions/player';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Playlist';

    this.trackClicked = this.trackClicked.bind(this);
  }

  trackClicked(track) {
    const { dispatch, currentTrack } = this.props;
    if (track !== currentTrack) {
      dispatch(playerLoadTrack(track.id));
    }
  }

  render() {
    const { isFetching, sliderIsDragging, audios, currentTrackId, isPlaying } = this.props;

    let toRender = audios;
    toRender = toRender.map(track =>
      <Track
        key={track.id}
        clickedHandler={this.trackClicked}
        current={(track.id === currentTrackId)}
        isPlaying={isPlaying}
        track={track}
      />
    );

    if (isFetching || sliderIsDragging) {
      return <Loader />;
    }

    return (<div className="playlist">
      {toRender}
    </div>);
  }
}

Playlist.propTypes = {
  audios: React.PropTypes.array,
  currentTrack: React.PropTypes.object,
  currentTrackId: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  sliderIsDragging: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isFetching: state.audios.isFetching,
    audios: state.audios.items,
    currentTrack: state.audios.items.find(item => state.player.currentTrackId === item.id),
    currentTrackId: state.player.currentTrackId,
    isPlaying: state.player.isPlaying,
    sliderIsDragging: state.ui.dateSlider.isDragging,
  };
}

export default connect(mapStateToProps)(Playlist);

