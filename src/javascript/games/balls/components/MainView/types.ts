import { CHANGE_FLASKS, CHANGE_ACTIVE_FLASK, CHANGE_TARGET_COORDS, SET_WIN } from './reducer';
import { ballsColors } from './index';

export type activeFlaskType = string | null;
export type coordsType = {
    bottom: number;
    left: number;
};

export interface IBall {
    color: ballsColors;
    id: string;
}

export interface flaskType {
    id: string,
    balls: IBall[]
};
export type flasksType = flaskType[];
export interface IinitialState {
    flasks: flasksType;
    activeFlask: activeFlaskType;
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
    | IChangeTargetCoords
    | ISetWin;
