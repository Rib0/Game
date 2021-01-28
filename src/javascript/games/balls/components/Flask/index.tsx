import React from 'react';
import styled from 'styled-components';

import { ballState } from '../MainView';

const DEFAULT_BALL_MARGIN = 2;
const BALL_WIDTH = 38;

const Container = styled.div`
    position: relative;
    height: 185px;
    width: 50px;
    border: 4px solid #b0b8c4;
    border-top-color: transparent;
    border-radius: 10px;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        top: -14px;
        height: 10px;
        border-radius: 35%;
        width: calc(100% + 20px);
        border: 4px solid #b0b8c4;
        transform: translateX(-13.6px);
        z-index: -1;
    }

    &:after {
        content: '';
        position: absolute;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-color: white;
    }
`;

const Ball = styled.div<BallsProps>`
    position: absolute;
    width: ${BALL_WIDTH}px;
    height: ${BALL_WIDTH}px;
    border: 1px solid white;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    left: calc(50% - ${BALL_WIDTH / 2}px);
    bottom: ${({ bottom }) => `${bottom}px`};
    z-index: 2;
`;

type BallsProps = {
    color: string;
    bottom: number;
};

type FlaskProps = {
    balls: ballState[];
};

const Flask = ({ balls }: FlaskProps) => {
    const getBallBottom = (index: number): number =>
        index * BALL_WIDTH + DEFAULT_BALL_MARGIN * (index + 1);

    return (
        <Container>
            {balls.map(({ color }, index) => (
                <Ball color={color} bottom={getBallBottom(index)} />
            ))}
        </Container>
    );
};

export default Flask;
