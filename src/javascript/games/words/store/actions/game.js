import { createActions } from 'redux-actions';

const payloadCreator = payload => payload;

export const {
    changeGameType,
    changeDifficulty,
    changeHealth,
    changeTime,
    changeScore,
    dropStore,
    setLoading,
    unsetLoading
} = createActions({
    CHANGE_GAME_TYPE: payloadCreator,
    CHANGE_DIFFICULTY: payloadCreator,
    CHANGE_HEALTH: payloadCreator,
    CHANGE_TIME: payloadCreator,
    CHANGE_SCORE: payloadCreator,
    DROP_STORE: payloadCreator,
    SET_LOADING: payloadCreator,
    UNSET_LOADING: payloadCreator
});
