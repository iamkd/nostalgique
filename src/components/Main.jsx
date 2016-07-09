import React from 'react';

// require('../styles/slider.scss');
// import Slider from 'rc-slider';

import { connect } from 'react-redux';
import { fetchAudios, fetchUser } from '../actions';

import Playlist from './playlist/Playlist.jsx';
import Player from './player/Player.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main';
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAudios());
        dispatch(fetchUser());
    }

    render() {
        // if (this.props.isFetching) {
        //   return <div>Fetching...</div>
        // } else {
        return <div className="page app-page page-flex">
                <header className="app-header">
                  <h1 className="logo small">nostalgique</h1>
                  <p className="made-by">made with &hearts; by <a href="http://oked.me">kd</a></p>
                </header>
                <section className="tools-container row">
                  <div className="tools">
                    <p className="date">
                      summer 2016
                    </p>
                    <div className="slider">
                      <div className="slider-body"></div>
                      <div className="slider-body-filled"></div>
                      <div className="slider-handle"></div>
                    </div>
                  </div>
                </section>
                <section className="playlist-container">
                    <Playlist />
                </section>
                <section className="player-container">
                    <Player />
                </section>
              </div>
    }
}

function mapStateToProps(state) {
  return {
  }
} 

export default connect(mapStateToProps)(Main);
