import { Nullalble } from './utils';

export type ActiveFlaskIdType = Nullalble<string>;

export enum BallsColors {
    darkGreen = '#78970e',
    veryDarkGreen = '#116533',
    lightGreen = '#61d67d',
    purple = '#722b93',
    brown = '#7d4a08',
    darkBlue = '#3b2fc3',
    blue = '#55a3e5',
    pink = '#ea5e7b',
    yellow = '#f1da58',
    gray = '#636466',
    red = '#c52b23',
    orange = '#e88c41',
}

export interface IBall {
    color: BallsColors;
    id: string;
}

export interface IFlask {
    id: string;
    balls: IBall[];
}
export type FlasksType = IFlask[];
