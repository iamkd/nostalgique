import React from 'react';
import { connect } from 'react-redux';
import { startAuth } from '../actions';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Auth';

    this.state = {
      processing: false,
    };

    this.auth = this.auth.bind(this);
  }

  auth() {
    const { dispatch } = this.props;
    dispatch(startAuth());
  }

  render() {
    const { isFetching } = this.props;
    return (<div className="page auth-page page-flex">
      <div className="auth-panel">
        <h1 className="logo">nostalgique</h1>
        <h4 className="auth-text">Взгляните сквозь время с помощью вашего плейлиста.</h4>
        <button
          type="button"
          onClick={this.auth}
          disabled={isFetching}
          className={`btn btn-default auth-button ${(isFetching ? ' disabled' : '')}`}
        >
          {isFetching ? 'Авторизация...' : 'Войти с помощью VK'}
        </button>
      </div>
    </div>);
  }
}

Auth.propTypes = {
  isFetching: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return { isFetching: state.auth.isFetching };
}

export default connect(mapStateToProps)(Auth);
