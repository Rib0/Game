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

export const game = handleActions(
    {
        [changeGameType]: (state, { payload }) => ({
            ...state,
            gameType: payload.type,
        }),
        [changeDifficulty]: (state, { payload }) => ({
            ...state,
            difficulty: payload.difficulty,
        }),
        [changeHealth]: (state, { payload }) => ({
            ...state,
            health: payload.health,
        }),
        [changeTime]: (state, { payload }) => ({
            ...state,
            time: payload.time,
        }),
        [changeScore]: (state, { payload }) => ({
            ...state,
            score: payload.score,
        }),
        [changeWord]: (state, payload) => ({
            ...state,
            word: payload.word,
        }),
    },
    initialState
);
