import { handleActions } from 'redux-actions';
import { changeView } from '../actions';

export default handleActions(
    {
        [changeView]: (state, { payload }) => payload,
    },
    'menu'
);
