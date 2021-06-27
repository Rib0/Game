import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { ballsColors } from '../MainView';
import { flaskType, coordsType } from '../MainView/types';

interface ContainerProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface FlaskProps {
    balls: flaskType;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    flaskIndex: number;
    isActive: boolean;
    isTransitioned: boolean;
    targetCoords: coordsType;
}

interface BallsProps {
    color: ballsColors;
    bottom: number;
}

const DEFAULT_BALL_MARGIN = 0.1;
const BALL_WIDTH = 38;

const Container = styled.div<ContainerProps>`
    position: relative;
    height: 175px;
    width: 50px;
    margin: 0 11px;
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
    transition: bottom 0.1s linear, left 0.1s linear;
`;

const Flask = ({
    balls,
    onClick,
    flaskIndex,
    isActive,
    isTransitioned,
    targetCoords,
}: FlaskProps) => {
    const [coords, setCoords] = useState(null);
    const [ballStyles, setBallStyles] = useState({});

    useEffect(() => {
        if (!isTransitioned) {
            setBallStyles({});
            return;
        }

        const resultLeftCoords = targetCoords.left - coords.left + 2;
        const resultBottomCoords = getBallBottom(0) - (targetCoords.bottom - coords.bottom);

        setBallStyles({ left: `${resultLeftCoords}px` });

        setTimeout(() => {
            setBallStyles(prevStyles => ({
                ...prevStyles,
                bottom: `${resultBottomCoords}px`,
            }));
        }, 100);
    }, [isTransitioned, targetCoords]);

    const refContainer = useCallback(node => {
        if (node !== null) {
            const { bottom, left } = node.getBoundingClientRect();
            setCoords({ bottom, left });
        }
    }, []);

    const getBallBottom = (index: number): number =>
        index * BALL_WIDTH +
        DEFAULT_BALL_MARGIN * (index + 1) +
        (isActive && index === balls.length - 1 ? 70 : 0);

    return (
        <Container ref={refContainer} data-index={flaskIndex} onClick={onClick}>
            {balls.map(({ id, color }, index) => (
                <Ball
                    style={index === balls.length - 1 ? ballStyles : {}}
                    key={id}
                    color={color}
                    bottom={getBallBottom(index)}
                />
            ))}
        </Container>
    );
};

export default Flask;
