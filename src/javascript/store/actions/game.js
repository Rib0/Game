import { createActions } from 'redux-actions';

const payloadCreator = payload => payload;

export const {
    changeGameType,
    changeDifficulty,
    changeHealth,
    changeTime,
    changeScore,
} = createActions({
    CHANGE_GAME_TYPE: payloadCreator,
    CHANGE_DIFFICULTY: payloadCreator,
    CHANGE_HEALTH: payloadCreator,
    CHANGE_TIME: payloadCreator,
    CHANGE_SCORE: payloadCreator,
});
