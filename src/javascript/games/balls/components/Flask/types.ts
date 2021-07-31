import { IBall, CoordsType } from '../MainView/types';
import { BallsColors } from './index';

export interface IContainerProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isFilled: boolean;
}

export interface IFlaskProps {
    balls: IBall[];
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    flaskId: string;
    isActive: boolean;
    targetCoords: CoordsType;
    targetBallsLength: number;
    flasksLength: number;
}

export interface IBallStyles {
    bottom?: number;
    left?: number;
}

export interface IBallsProps {
    color: BallsColors;
    bottom: number;
    style: IBallStyles;
}
