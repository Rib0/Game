import { handleActions } from 'redux-actions';
import { changeView, dropStore } from '../actions';

const initialState = 'menu';

export default handleActions(
    {
        [changeView]: (state, { payload }) => payload,
        [dropStore]: () => initialState,
    },
    initialState
);
