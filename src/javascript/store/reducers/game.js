import { handleActions } from 'redux-actions';
import { changeGameType, changeDifficulty, changeHealth, changeScore, changeWord } from '../actions/game';

const initialState = {
    gameType: '',
    difficulty: '',
    health: 100,
    score: 0,
    word: ''
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
        [changeWord]: (state, payload) => ({
            ...state,
            word: payload
        }),
    },
    initialState
);
