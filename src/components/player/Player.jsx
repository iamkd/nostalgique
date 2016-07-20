import React from 'react';

import { connect } from 'react-redux';
import ReactSlider from 'react-slider';

import {
  playerSetPlayState,
  playerLoadTrack,
  playerSetVolume,
  playerStartSeeking,
  playerStopSeeking,
} from '../../actions/player';

let player = new Audio();

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Player';

    this.state = {
      nextAvailable: true,
      prevAvailable: true,
      timePercentage: 0,
      seekerInterval: setInterval(() => {
        let percent = 0;
        if (player.currentTime) {
          percent = player.currentTime / player.duration;
          if (percent >= 1) {
            this.nextClicked();
          }
        }
        this.setState({
          currentTime: player.currentTime,
          timePercentage: percent,
          loadedParts: player.buffered,
        });
      }, 50),
    };

    this.prevClicked = this.prevClicked.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
    this.playClicked = this.playClicked.bind(this);

    this.seekerAfterChange = this.seekerAfterChange.bind(this);
    this.seekerChange = this.seekerChange.bind(this);
    this.seekerBeforeChange = this.seekerBeforeChange.bind(this);

    this.changeVolume = this.changeVolume.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { currentTrack, playlist } = newProps;
    if (playlist.indexOf(currentTrack) + 1 >= playlist.length || currentTrack === null) {
      this.setState({ nextAvailable: false });
    } else {
      this.setState({ nextAvailable: true });
    }

    if (playlist.indexOf(currentTrack) <= 0) {
      this.setState({ prevAvailable: false });
    } else {
      this.setState({ prevAvailable: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { currentTrack, currentTrackId, dispatch, volume, isSeeking, isPlaying } = this.props;
    const prevTrackId = prevProps.currentTrackId;
    const wasPlaying = prevProps.isPlaying;

    player.volume = volume / 100;

    if (currentTrackId !== -1) {
      if (currentTrackId !== prevTrackId) {
        dispatch(playerSetPlayState('pause'));
        player.pause();

        player = new Audio(currentTrack.url);

        if ((prevTrackId === -1 && currentTrackId >= 0) || wasPlaying) {
          dispatch(playerSetPlayState('play'));
          player.play();
        }
      }
    }

    if (isSeeking != null && isPlaying) {
      if (isSeeking) {
        player.pause();
      } else {
        player.play();
      }
    }
  }

  playClicked() {
    const { dispatch, currentTrackId } = this.props;
    if (currentTrackId === -1) {
      dispatch(playerLoadTrack(0));
    }

    if (player.paused) {
      dispatch(playerSetPlayState('play'));
      player.play();
    } else {
      dispatch(playerSetPlayState('pause'));
      player.pause();
    }
  }

  prevClicked() {
    if (this.state.prevAvailable) {
      const { currentTrack, playlist, dispatch } = this.props;
      if (playlist.indexOf(currentTrack) > 0) {
        const prevTrack = playlist[playlist.indexOf(currentTrack) - 1];
        dispatch(playerLoadTrack(prevTrack.id));
      }
    }
  }

  nextClicked() {
    if (this.state.nextAvailable) {
      const { currentTrack, playlist, dispatch } = this.props;
      if (playlist.indexOf(currentTrack) + 1 < playlist.length - 1) {
        const nextTrack = playlist[playlist.indexOf(currentTrack) + 1];
        dispatch(playerLoadTrack(nextTrack.id));
      }
    }
  }

  changeVolume() {
    const { dispatch } = this.props;
    const volume = this.refs.volumeSlider.getValue();
    dispatch(playerSetVolume(volume));
  }

  seekerBeforeChange() {
    const { dispatch } = this.props;
    dispatch(playerStartSeeking());
  }

  seekerChange(value) {
    player.currentTime = value / 1000 * player.duration;
  }

  seekerAfterChange() {
    const { dispatch } = this.props;
    dispatch(playerStopSeeking());
  }

  render() {
    const { isPlaying, volume } = this.props;
    const { loadedParts } = this.state;

    let loadedBars = [];

    if (loadedParts) {
      for (let i = 0; i < loadedParts.length; i++) {
        const leftOffset = loadedParts.start(i) / player.duration * 100;
        const width = Math.abs(loadedParts.start(i) - loadedParts.end(i)) / player.duration * 100;
        loadedBars.push(
          <div
            className="slider-body-0 preload"
            key={`preload-${i}`}
            style={{
              left: `${leftOffset}%`,
              width: `${width}%`,
            }}
          >
          </div>);
      }
    }

    return (<div className="player">
      <div className="player-buttons">
        <div
          className={`player-button ${(this.state.prevAvailable ? '' : ' inactive')}`}
          onClick={this.prevClicked}
        >
          <i className="fa fa-backward"></i>
        </div>

        <div className="player-button" onClick={this.playClicked}>
          {isPlaying ?
            <i className="fa fa-pause"></i>
          :
            <i className="fa fa-play"></i>
          }
        </div>

        <div
          className={`player-button ${(this.state.nextAvailable ? '' : ' inactive')}`}
          onClick={this.nextClicked}
        >
          <i className="fa fa-forward"></i>
        </div>
      </div>

      <div className="player-seeker">
        <div className="seeker-slider">
          {loadedBars}
          <ReactSlider
            min={0}
            max={1000}
            ref="seekerSlider"
            className="seeker-slider"
            value={this.state.timePercentage * 1000}
            onBeforeChange={this.seekerBeforeChange}
            onChange={this.seekerChange}
            onAfterChange={this.seekerAfterChange}
            barClassName="slider-body"
            withBars
          >
            <div className="seeker-handle"></div>
          </ReactSlider>
        </div>
      </div>

      <div className="player-volume">
        <ReactSlider
          min={0}
          max={100}
          ref="volumeSlider"
          className="volume-slider"
          onChange={this.changeVolume}
          value={volume}
          barClassName="slider-body"
          withBars
        >
          <div className="slider-handle"></div>
        </ReactSlider>
      </div>
    </div>);
  }
}

Player.propTypes = {
  playlist: React.PropTypes.array,
  currentTrack: React.PropTypes.object,
  currentTrackId: React.PropTypes.number,
  currentTime: React.PropTypes.number,
  volume: React.PropTypes.number,
  isPlaying: React.PropTypes.bool,
  isSeeking: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  const { items } = state.audios;
  const { currentTrackId } = state.player;
  const currentTrack = items.find(item => item.id === currentTrackId);
  return { currentTrack, playlist: state.audios.items, ...state.player };
}

export default connect(mapStateToProps)(Player);
