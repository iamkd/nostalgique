import React from 'react';

import { connect } from 'react-redux';
import ReactSlider from 'react-slider';

import { playerSetPlayState, playerLoadTrack } from '../../actions/player';

let player = new Audio();

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Player';

        this.state = {
          nextAvailable: true,
          prevAvailable: true
        }
    }

    componentDidUpdate(prevProps) {
      const { currentTrack, currentTrackId, playlistLength, dispatch } = this.props;
      const prevTrackId = prevProps.currentTrackId;
      const wasPlaying = prevProps.isPlaying;

      if (currentTrackId != -1) {
        if (currentTrackId != prevTrackId) {
          dispatch(playerSetPlayState('pause'));
          player.pause();
          player = new Audio(currentTrack.url);

          if ((prevTrackId == -1 && currentTrackId >= 0) || wasPlaying) {
            dispatch(playerSetPlayState('play'));
            player.play();
          }
        }
      }
    }

    componentWillReceiveProps(newProps) {
      const { currentTrackId, playlistLength } = newProps;
      if (currentTrackId + 1 == playlistLength || currentTrackId == -1) {
        console.log()
        this.setState({nextAvailable: false});
      } else {
        this.setState({nextAvailable: true});
      }

      if (currentTrackId <= 0) {
        this.setState({prevAvailable: false});
      } else {
        this.setState({prevAvailable: true});
      }
    }

    playClicked() {
      const { dispatch, currentTrackId } = this.props;
      if (currentTrackId == -1) {
        dispatch(playerLoadTrack(0));
      }

      if (player.paused) {
        dispatch(playerSetPlayState('play'))
        player.play();
      } else {
        dispatch(playerSetPlayState('pause'));
        player.pause();
      }
    }

    prevClicked() {
      if (this.state.prevAvailable) {
        const { currentTrackId, playlistLength, dispatch } = this.props;
        if (currentTrackId > 0) {
          dispatch(playerLoadTrack(currentTrackId - 1));
        }
      } 
    }

    nextClicked() {
      if (this.state.nextAvailable) {
        const { currentTrackId, playlistLength, dispatch } = this.props;
        if (currentTrackId < playlistLength - 1) {
          dispatch(playerLoadTrack(currentTrackId + 1));
        }
      } 
    }

    render() {
        const { isPlaying, volume } = this.props;
        return <div className="player">
                  <div className="player-buttons">
                    <div className={"player-button" + (this.state.prevAvailable ? '' : ' inactive')} onClick={this.prevClicked.bind(this)}><i className="fa fa-backward"></i></div>
                    <div className="player-button" onClick={this.playClicked.bind(this)}>
                      {isPlaying ?
                        <i className="fa fa-pause"></i>
                      :
                        <i className="fa fa-play"></i>
                      }
                    </div>
                    <div className={"player-button" + (this.state.nextAvailable ? '' : ' inactive')} onClick={this.nextClicked.bind(this)}><i className="fa fa-forward"></i></div>
                  </div>
                  <div className="player-seeker">a</div>
                  <div className="player-volume">
                    <ReactSlider value={volume} withBars>
                      <div style={{height: '50px', width: '50px', background: 'red'}}></div>
                    </ReactSlider>
                  </div>
                </div>;
    }
}

function mapStateToProps(state) {
  return {...state.player, currentTrack: state.audios.items[state.player.currentTrackId], playlistLength: state.audios.items.length};
}

export default connect(mapStateToProps)(Player);
