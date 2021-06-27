import {
    CHANGE_FLASKS,
    CHANGE_ACTIVE_FLASK,
    CHANGE_TRANSITIONED_FLASK,
    CHANGE_ACTIVE_COORDS,
    CHANGE_TARGET_COORDS,
    SET_WIN,
} from './reducer';
import { ballsColors } from './index';

export type activeFlaskType = number | null | undefined;
export type transitionedFlaskType = number | null;
export type coordsType = {
    bottom: number;
    left: number;
};

export interface IBall {
    color: ballsColors;
    id: string;
}

export type flaskType = IBall[];
export type flasksType = flaskType[];
export interface IinitialState {
    flasks: flasksType;
    activeFlask: activeFlaskType;
    transitionedFlask: transitionedFlaskType;
    targetCoords: coordsType | null;
    isWin: boolean;
}

export interface IChangeFlasksAction {
    type: typeof CHANGE_FLASKS;
    payload: flasksType;
}

export interface IChangeActiveFlaskAction {
    type: typeof CHANGE_ACTIVE_FLASK;
    payload: activeFlaskType;
}

export interface IChangeTransitionedFlask {
    type: typeof CHANGE_TRANSITIONED_FLASK;
    payload: transitionedFlaskType;
}

export interface IChangeTargetCoords {
    type: typeof CHANGE_TARGET_COORDS;
    payload: coordsType;
}

export interface ISetWin {
    type: typeof SET_WIN;
    payload: boolean;
}

export type actionTypes =
    | IChangeFlasksAction
    | IChangeActiveFlaskAction
    | IChangeTransitionedFlask
    | IChangeTargetCoords
    | ISetWin;
