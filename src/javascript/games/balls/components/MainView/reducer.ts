import { IinitialState, ActiveFlaskIdType, CoordsType, FlasksType, ActionTypes } from './types';

export const CHANGE_FLASKS = 'CHANGE_FLASKS';
export const CHANGE_ACTIVE_FLASK_ID = 'CHANGE_ACTIVE_FLASK_ID';
export const CHANGE_ACTIVE_COORDS = 'CHANGE_ACTIVE_COORDS';
export const CHANGE_TARGET_COORDS = 'CHANGE_TARGET_COORDS';
export const SET_WIN = 'SET_WIN';

export const changeFlasks = (payload: FlasksType): ActionTypes => ({
    type: CHANGE_FLASKS,
    payload,
});

export const changeActiveFlaskId = (payload: ActiveFlaskIdType): ActionTypes => ({
    type: CHANGE_ACTIVE_FLASK_ID,
    payload,
});

export const changeTargetCoords = (payload: CoordsType): ActionTypes => ({
    type: CHANGE_TARGET_COORDS,
    payload,
});

export const setWin = (payload: boolean): ActionTypes => ({
    type: SET_WIN,
    payload,
});

export default (state: IinitialState, action: ActionTypes): IinitialState => {
    switch (action.type) {
        case CHANGE_FLASKS:
            return {
                ...state,
                flasks: action.payload,
            };
        case CHANGE_ACTIVE_FLASK_ID:
            return {
                ...state,
                activeFlaskId: action.payload === state.activeFlaskId ? null : action.payload,
            };
        case CHANGE_TARGET_COORDS:
            return {
                ...state,
                targetCoords: action.payload && {
                    ...state,
                    ...action.payload,
                },
            };
        case SET_WIN:
            return {
                ...state,
                isWin: action.payload,
            };
        default:
            return state;
    }
};
