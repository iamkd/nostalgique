import { combineReducers } from 'redux';
import audios from './audios';
import auth from './auth';
import user from './user';
import player from './player';
import ui from './ui';

const appReducers = combineReducers({
  audios,
  auth,
  user,
  player,
  ui
});

export default appReducers;