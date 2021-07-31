import { CHANGE_FLASKS, CHANGE_ACTIVE_FLASK_ID, CHANGE_TARGET_COORDS, SET_WIN } from './reducer';
import { BallsColors } from '../Flask';

export type ActiveFlaskIdType = string | null;
export type CoordsType = {
    bottom: number;
    left: number;
};

export interface IBall {
    color: BallsColors;
    id: string;
}

export interface IFlask {
    id: string;
    balls: IBall[];
}
export type FlasksType = IFlask[];
export interface IinitialState {
    flasks: FlasksType;
    activeFlaskId: ActiveFlaskIdType;
    targetCoords: CoordsType | null;
    isWin: boolean;
}

export interface IChangeFlasksAction {
    type: typeof CHANGE_FLASKS;
    payload: FlasksType;
}

export interface IChangeActiveFlaskIdAction {
    type: typeof CHANGE_ACTIVE_FLASK_ID;
    payload: ActiveFlaskIdType;
}

export interface IChangeTargetCoords {
    type: typeof CHANGE_TARGET_COORDS;
    payload: CoordsType;
}

export interface ISetWin {
    type: typeof SET_WIN;
    payload: boolean;
}

export type ActionTypes =
    | IChangeFlasksAction
    | IChangeActiveFlaskIdAction
    | IChangeTargetCoords
    | ISetWin;
