import React from 'react';

import { connect } from 'react-redux';

import Track from './Track.jsx';
import Loader from '../Loader.jsx';

import { playerLoadTrack } from '../../actions/player';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Playlist';
    }

    trackClicked(track) {
      const { dispatch, currentTrack, audios } = this.props;
      if (track != currentTrack) {
        dispatch(playerLoadTrack(audios.indexOf(track)));
      }
    }

    render() {
        const {isFetching, audios, currentTrack} = this.props;
        if (isFetching) {
          return <Loader />
        } else {
          return <div className="playlist">
            {audios.map((track) => {
              return <Track key={track.id} clickedHandler={this.trackClicked.bind(this, track)} current={(track == currentTrack)} {...track}  />
            })}
          </div>;
        }
    }
}

function mapStateToProps(state) {
  return {isFetching: state.audios.isFetching, audios: state.audios.items, currentTrack: (state.player.currentTrackId == -1) ? null : state.audios.items[state.player.currentTrackId]};
}

export default connect(mapStateToProps)(Playlist);

