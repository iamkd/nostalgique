import { combineReducers } from 'redux';
import audios from './audios';
import auth from './auth';
import user from './user';
import player from './player';

const appReducers = combineReducers({
  audios,
  auth,
  user,
  player
});

export default appReducers;