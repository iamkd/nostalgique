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
        const {isFetching, audios, currentTrack, isPlaying, dateFilter} = this.props;

        let tracks = audios
          .filter(track => {
            if (dateFilter) {
              return track.dateStamp.year == dateFilter.year && track.dateStamp.month == dateFilter.month;
            }
            return true;
          })
          .map(track => {
              return <Track key={track.id} clickedHandler={this.trackClicked.bind(this, track)} current={(track == currentTrack)} isPlaying={isPlaying} {...track}  />
          });

        if (isFetching) {
          return <Loader />
        } else {
          return <div className="playlist">
            {tracks}
          </div>;
        }
    }
}

function mapStateToProps(state) {
  return {isFetching: state.audios.isFetching, audios: state.audios.items, currentTrack: (state.player.currentTrackId == -1) ? null : state.audios.items[state.player.currentTrackId], isPlaying: state.player.isPlaying, dateFilter: state.audios.dateFilter};
}

export default connect(mapStateToProps)(Playlist);

