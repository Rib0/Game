import { ActiveFlaskIdType, FlasksType } from '@/types/flask';
import { CoordsType } from '@/types/common';
import { CHANGE_FLASKS, CHANGE_ACTIVE_FLASK_ID, CHANGE_TARGET_COORDS, SET_WIN } from './constants';

export const changeFlasks = (payload: FlasksType) =>
    ({
        type: CHANGE_FLASKS,
        payload,
    }) as const;

export const changeActiveFlaskId = (payload: ActiveFlaskIdType) =>
    ({
        type: CHANGE_ACTIVE_FLASK_ID,
        payload,
    }) as const;

export const changeTargetCoords = (payload: CoordsType) =>
    ({
        type: CHANGE_TARGET_COORDS,
        payload,
    }) as const;

export const setWin = (payload: boolean) =>
    ({
        type: SET_WIN,
        payload,
    }) as const;

type IChangeFlasksAction = ReturnType<typeof changeFlasks>;
type IChangeActiveFlaskIdAction = ReturnType<typeof changeActiveFlaskId>;
type IChangeTargetCoords = ReturnType<typeof changeTargetCoords>;
type ISetWin = ReturnType<typeof setWin>;

export type ActionTypes =
    | IChangeFlasksAction
    | IChangeActiveFlaskIdAction
    | IChangeTargetCoords
    | ISetWin;
