import { handleActions } from 'redux-actions';
import { changeView } from '../actions';

export const view = handleActions(
    {
        [changeView]: (state, { payload }) => payload,
    },
    'menu'
);
