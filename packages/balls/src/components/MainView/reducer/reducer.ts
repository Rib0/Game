import { CoordsType } from '@/types/common';
import { ActiveFlaskIdType, FlasksType } from '@/types/flask';
import { ActionTypes } from './actions';
import { CHANGE_ACTIVE_FLASK_ID, CHANGE_FLASKS, CHANGE_TARGET_COORDS, SET_WIN } from './constants';

interface IinitialState {
    flasks: FlasksType;
    activeFlaskId: ActiveFlaskIdType;
    targetCoords: CoordsType;
    isWin: boolean;
}

export const initialState: IinitialState = {
    flasks: [],
    activeFlaskId: null,
    targetCoords: null,
    isWin: false,
};

export const reducer = (state: IinitialState, action: ActionTypes): IinitialState => {
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
                    ...state.targetCoords,
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
