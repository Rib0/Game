import { createActions } from 'redux-actions';
import { request } from 'utils';

const payloadCreator = payload => payload;

export const { changeGameType, changeDifficulty, changeHealth, changeTime, changeScore, changeWord } = createActions({
    CHANGE_GAME_TYPE: payloadCreator,
    CHANGE_DIFFICULTY: payloadCreator,
    CHANGE_HEALTH: payloadCreator,
    CHANGE_TIME: payloadCreator,
    CHANGE_SCORE: payloadCreator,
    CHANGE_WORD: payloadCreator,
});

export const fetchWord = () => dispatch => {
    request('http://free-generator.ru/generator.php?action=word&type=0')
        .then(console.log)
}
