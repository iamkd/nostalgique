import React from 'react';

// require('../styles/slider.scss');
// import Slider from 'rc-slider';

import { connect } from 'react-redux';
import { fetchAudios, fetchUser } from '../actions';

import Tools from './tools/Tools.jsx';
import Playlist from './playlist/Playlist.jsx';
import Player from './player/Player.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Main';
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAudios());
    dispatch(fetchUser());
  }

  render() {
    return (<div className="page app-page page-flex">
      <header className="app-header">
        <h1 className="logo small">nostalgique <span style={{ color: '#eee' }}>&beta;</span></h1>
        <p className="made-by">made with &hearts; by <a href="http://oked.me">kd</a></p>
      </header>
      <section className="tools-container row">
        <Tools />
      </section>
      <section className="playlist-container">
        <Playlist />
      </section>
      <section className="player-container">
        <Player />
      </section>
    </div>);
  }
}

Main.propTypes = {
  dispatch: React.PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Main);
