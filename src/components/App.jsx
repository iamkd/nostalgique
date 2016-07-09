import React from 'react';
import { connect } from 'react-redux';

import Auth from './Auth.jsx';
import Main from './Main.jsx';

import { authCheckIfNeeded } from '../actions';

require('../styles/app.scss');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(authCheckIfNeeded());
    }

    render() {
      const { authorized } = this.props;
      if (authorized) {
        return <Main />
      } else {
        return <Auth />
      }
    }
}

function mapStateToProps(state) {
  return { authorized: state.auth.authorized };
}

export default connect(mapStateToProps)(App);
