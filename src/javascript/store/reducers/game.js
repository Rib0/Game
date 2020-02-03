import { handleActions } from 'redux-actions';
import { changeGameType, changeDifficulty, changeHealth, changeTime, changeScore, changeWord } from '../actions/game';

const initialState = {
    gameType: '',
    difficulty: '',
    health: null,
    time: null,
    score: null,
    word: '',
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
            health: payload.health,
        }),
        [changeTime]: (state, { payload }) => ({
            ...state,
            time: payload,
        }),
        [changeScore]: (state, { payload }) => ({
            ...state,
            score: payload,
        }),
        [changeWord]: (state, payload) => ({
            ...state,
            word: payload,
        }),
    },
    initialState
);
