import { createActions } from 'redux-actions';

const payloadCreator = payload => payload;

export const { changeView } = createActions({
    CHANGE_VIEW: payloadCreator,
});
