import styled from 'styled-components';

import { BallsColors } from '@/types/flask';
import { BALL_WIDTH } from './constants';

export interface IBallStyles {
    bottom?: number;
    left?: number;
}

export interface IBallsProps {
    color: BallsColors;
    bottom: number;
    style: IBallStyles;
}

export const Ball = styled.div<IBallsProps>`
    position: absolute;
    width: ${BALL_WIDTH}px;
    height: ${BALL_WIDTH}px;
    border: 1px solid white;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    left: calc(50% - ${BALL_WIDTH / 2}px);
    bottom: ${({ bottom }) => `${bottom}px`};
    z-index: 2;
    transition:
        bottom 0.1s linear,
        left 0.1s linear;
`;
