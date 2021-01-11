import { combineReducers } from 'redux';
import view from './view';
import game from './game';

export default combineReducers({
    view,
    game,
});
