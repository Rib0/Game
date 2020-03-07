import { handleActions } from 'redux-actions';
import { changeGameType, changeDifficulty, changeHealth, changeScore } from '../actions/game';

const initialState = {
    gameType: '',
    difficulty: 'normal',
    health: 100,
    score: 0,
};

export default handleActions(
    {
        [changeGameType]: (state, { payload }) => ({
            ...state,
            gameType: payload,
        }),
        [changeDifficulty]: (state, { payload }) => ({
            ...state,
            difficulty: payload,
        }),
        [changeHealth]: (state, { payload }) => ({
            ...state,
            health: payload,
        }),
        [changeScore]: (state, { payload }) => ({
            ...state,
            score: payload,
        }),
    },
    initialState
);
