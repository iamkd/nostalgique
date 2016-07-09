import React from 'react';

import { connect } from 'react-redux';

import { playerSetPlayState } from '../../actions/player';

let player = new Audio();

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Player';
    }

    componentDidUpdate(prevProps) {
      const { currentTrack, dispatch } = this.props;
      const prevTrack = prevProps.currentTrack;

      if (currentTrack != null) {
        if (currentTrack != prevTrack) {
          dispatch(playerSetPlayState('pause'));
          player.pause();
          player = new Audio(currentTrack.url);
        }
      }
    }

    playClicked() {
      const { dispatch, currentTrack } = this.props;
      if (currentTrack == null) {
        return;
      }

      if (player.paused) {
        dispatch(playerSetPlayState('play'))
        player.play();
      } else {
        dispatch(playerSetPlayState('pause'));
        player.pause();
      }
    }

    render() {
        const { isPlaying, volume } = this.props;
        return <div className="player">
                  <div className="player-buttons">
                    <div className="player-button"><i className="fa fa-backward"></i></div>
                    <div className="player-button" onClick={this.playClicked.bind(this)}>
                      {isPlaying ?
                        <i className="fa fa-pause"></i>
                      :
                        <i className="fa fa-play"></i>
                      }
                    </div>
                    <div className="player-button"><i className="fa fa-forward"></i></div>
                  </div>
                  <div className="player-seeker">a</div>
                  <div className="player-volume">{volume}</div>
                </div>;
    }
}

function mapStateToProps(state) {
  return {...state.player};
}

export default connect(mapStateToProps)(Player);
