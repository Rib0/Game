import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

import { ballsColors } from '../MainView';
import { IBall, coordsType } from '../MainView/types';
import { isFilledFlask } from '../../utils';

interface IContainerProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isFilled: boolean;
}

interface IFlaskProps {
    balls: IBall[];
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    flaskId: number;
    isActive: boolean;
    targetCoords: coordsType;
    targetBallsLength: number;
    flasksLength: number;
}

interface IBallsProps {
    color: ballsColors;
    bottom: number;
}

const DEFAULT_BALL_MARGIN = 0.1;
const BALL_WIDTH = 38;

const filledAnimation = keyframes`
    from {
        transform: translateY(0)
    }

    to {
        transform: translateY(-20px);
    }
`;

const Container = styled.div<IContainerProps>`
    position: relative;
    height: 175px;
    width: 50px;
    margin: 0 11px;
    border: 4px solid #b0b8c4;
    border-top-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    animation: ${({ isFilled }) => (isFilled ? filledAnimation : '')} 0.3s linear;
    opacity: ${({ isFilled }) => (isFilled ? 0.6 : 1)};

    &:before {
        content: '';
        position: absolute;
        top: -14px;
        height: 10px;
        border-radius: 35%;
        width: calc(100% + 20px);
        border: 4px solid #b0b8c4;
        transform: translateX(-13.6px);
        background-color: white;
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
        background-color: white;
    }
`;

const Ball = styled.div<IBallsProps>`
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
    flaskId,
    isActive,
    targetCoords,
    targetBallsLength,
    flasksLength,
}: IFlaskProps) => {
    const [coords, setCoords] = useState({ bottom: null, left: null }); // координаты текущей колбы
    const [ballStyles, setBallStyles] = useState({});
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        if (!isActive || !targetCoords) {
            setBallStyles({});
            return;
        }

        const resultLeftCoords = targetCoords.left - coords.left + 2;
        const resultBottomCoords =
            getBallBottom(targetBallsLength) - (targetCoords.bottom - coords.bottom);
        const isTargetHigher = coords.bottom > targetCoords.bottom;

        setBallStyles({
            [isTargetHigher ? 'bottom' : 'left']: `${isTargetHigher ? resultBottomCoords : resultLeftCoords
                }px`,
        });

        setTimeout(() => {
            setBallStyles(prevStyles => ({
                ...prevStyles,
                [isTargetHigher ? 'left' : 'bottom']: `${isTargetHigher ? resultLeftCoords : resultBottomCoords
                    }px`,
            }));
        }, 100);
    }, [isActive, targetCoords]);

    useEffect(() => {
        setIsFilled(isFilledFlask(balls));
    }, [balls]);

    const refContainer = useCallback(
        node => {
            if (node !== null) {
                const { bottom, left } = node.getBoundingClientRect();
                setCoords({ bottom, left });
            }
        },
        [flasksLength]
    );

    const getBallBottom = (index: number): number =>
        index * BALL_WIDTH +
        DEFAULT_BALL_MARGIN * (index + 1) +
        (isActive && index === balls.length - 1
            ? 220 - (DEFAULT_BALL_MARGIN + BALL_WIDTH) * balls.length
            : 0);

    return (
        <Container ref={refContainer} data-id={flaskId} onClick={onClick} isFilled={isFilled}>
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
