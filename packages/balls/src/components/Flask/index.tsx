import React, { useState, useEffect, useCallback } from 'react';

import { isFilledFlask } from '@/utils';
import { FLASKS_AMOUNT } from '@/components/MainView/constants';
import { IBall } from '@/types/flask';
import { CoordsType } from '@/types/common';
import { Ball, IBallStyles } from './ball';
import { Container } from './container';
import { DEFAULT_BALL_MARGIN, BALL_WIDTH } from './constants';

interface IFlaskProps {
    balls: IBall[];
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    flaskId: string;
    isActive: boolean;
    targetCoords: CoordsType;
    targetBallsLength: number;
    flasksLength: number;
}

export const Flask: React.FC<IFlaskProps> = ({
    balls,
    onClick,
    flaskId,
    isActive,
    targetCoords,
    targetBallsLength,
    flasksLength,
}) => {
    const [coords, setCoords] = useState<IBallStyles>({ bottom: null, left: null }); // координаты текущей колбы
    const [ballStyles, setBallStyles] = useState({});
    const [isFilled, setIsFilled] = useState(false);

    const getBallBottom = useCallback(
        (index: number): number =>
            index * BALL_WIDTH +
            DEFAULT_BALL_MARGIN * (index + 1) +
            (isActive && index === balls.length - 1
                ? 220 - (DEFAULT_BALL_MARGIN + BALL_WIDTH) * balls.length
                : 0),
        [isActive, balls],
    );

    useEffect(() => {
        if (!isActive || !targetCoords) {
            setBallStyles({});
            return;
        }

        let resultLeftCoords = targetCoords.left - coords.left + 2;
        const resultBottomCoords =
            getBallBottom(targetBallsLength) - (targetCoords.bottom - coords.bottom);
        const isTargetHigher = coords.bottom > targetCoords.bottom;
        if (coords.bottom === targetCoords.bottom && flasksLength > FLASKS_AMOUNT) {
            resultLeftCoords += 36; // не знаю почему так, но без этого криво работает
        }

        setBallStyles({
            [isTargetHigher ? 'bottom' : 'left']: `${
                isTargetHigher ? resultBottomCoords : resultLeftCoords
            }px`,
        });

        setTimeout(() => {
            setBallStyles((prevStyles) => ({
                ...prevStyles,
                [isTargetHigher ? 'left' : 'bottom']: `${
                    isTargetHigher ? resultLeftCoords : resultBottomCoords
                }px`,
            }));
        }, 100);
    }, [isActive, targetCoords, coords, targetBallsLength, flasksLength, getBallBottom]);

    useEffect(() => {
        setIsFilled(isFilledFlask(balls));
    }, [balls]);

    const refContainer = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            const { bottom, left } = node.getBoundingClientRect();
            setCoords({ bottom, left });
        }
    }, []);

    return (
        <Container ref={refContainer} data-id={flaskId} onClick={onClick} isFilled={isFilled}>
            {balls.map(({ id, color }, index) => (
                <Ball
                    style={index === balls.length - 1 && isActive ? ballStyles : {}}
                    key={id}
                    color={color}
                    bottom={getBallBottom(index)}
                />
            ))}
        </Container>
    );
};
