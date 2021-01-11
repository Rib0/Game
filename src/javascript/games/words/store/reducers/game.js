import { handleActions } from 'redux-actions';
import {
    changeGameType,
    changeDifficulty,
    changeHealth,
    changeScore,
    dropStore,
    setLoading,
    unsetLoading,
} from '../actions/game';

const initialState = {
    gameType: 'survival',
    difficulty: 'normal',
    health: 100,
    score: 0,
    loading: false,
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
            score: typeof payload === 'undefined' ? state.score + 1 : payload,
        }),
        [dropStore]: () => ({
            ...initialState,
        }),
        [setLoading]: state => ({
            ...state,
            loading: true,
        }),
        [unsetLoading]: state => ({
            ...state,
            loading: false,
        }),
    },
    initialState
);
