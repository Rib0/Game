import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

import Header from '../Header';
import Flask from '../Flask';

import reducer, { changeFlasks, changeActiveFlask, changeTargetCoords, setWin } from './reducer';
import { IinitialState, flaskType, flasksType } from './types';
import { getRandom, splitArray, isFilledFlask } from '../../utils';

/*
    сохранять в localStorage результат,
    возможность менять темы
    возможность выбрать уровень сложности

    todo поменять activeFlask на activeFlaskId
    поправить код везде
*/

const Container = styled.div`
    padding: 20px;
    /* background: #000c3c; todo theme with styled components */
`;

const GameField = styled.div`
    padding-top: 70px;
    display: flex;
    flex-wrap: wrap;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    flex: 0 0 100%;
    margin-bottom: 60px;
`;

export enum ballsColors {
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

export const initialState: IinitialState = {
    // theme: default,
    flasks: [],
    activeFlask: null,
    targetCoords: null,
    isWin: false,
};

const FLASKS_AMOUNT = 14;
const BALLS_PER_FLASK = 4;

const MainView = () => {
    const [{ flasks, activeFlask, targetCoords, isWin }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const [targetFlaskId, setTargetFlaskId] = useState('');
    const [prevMoveSnapshot, setPrevMoveSnapshot] = useState<flasksType[]>([]);

    const fillFlasks = () => {
        const colorsKeys: ballsColors[] = Object.values(ballsColors);

        const colorsCounter = colorsKeys.reduce((acc, cur) => {
            return {
                ...acc,
                [cur]: 0,
            };
        }, {});

        let resultFlasks: flasksType = new Array(FLASKS_AMOUNT).fill({});

        resultFlasks = resultFlasks.map((f, i) => {
            const flask: flaskType = { id: nanoid(5), balls: [] };

            if (i > FLASKS_AMOUNT - 3) return flask;

            while (flask.balls.length < BALLS_PER_FLASK) {
                const randomColorIndex = getRandom(0, colorsKeys.length - 1);
                const randomColor = colorsKeys[randomColorIndex];
                const colorCount = colorsCounter[randomColor];

                if (colorCount !== BALLS_PER_FLASK) {
                    flask.balls.push({ color: randomColor, id: nanoid(5) });
                    colorsCounter[randomColor] = colorCount + 1;
                }
            }

            return flask;
        });

        dispatch(changeFlasks(resultFlasks));
    };

    const findFlask = (id: string): Partial<flaskType> => flasks.find(flask => flask.id === id) || {};

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.currentTarget instanceof HTMLDivElement)) {
            return;
        }

        const {
            dataset: { id },
        } = e.currentTarget;
        const targetFlask = findFlask(id);
        const isFilled = isFilledFlask(targetFlask.balls);

        if (isFilled || isWin) {
            dispatch(changeActiveFlask(null));
            return;
        }

        if (activeFlask !== id && activeFlask !== null) {
            const [changedBall] = findFlask(activeFlask).balls.slice(-1);
            const [topTargetBall] = targetFlask.balls.slice(-1);

            // if (topTargetBall && topTargetBall.color !== changedBall.color) {
            //     dispatch(changeActiveFlask(null));
            //     return;
            // }

            const { bottom, left } = e.currentTarget.getBoundingClientRect();
            const restBalls = findFlask(activeFlask).balls.slice(0, -1);
            const ballsWithChanged = targetFlask.balls.concat(changedBall);
            const updatedFlasks = flasks.map((flask, i) =>
                flask.id === activeFlask ? { ...flask, balls: restBalls } : flask.id === id ? { ...flask, balls: ballsWithChanged } : flask
            );

            dispatch(changeTargetCoords({ bottom, left }));
            setTargetFlaskId(id);
            setPrevMoveSnapshot(spanshots => [flasks, ...spanshots]);

            setTimeout(() => {
                dispatch(changeFlasks(updatedFlasks));
                dispatch(changeActiveFlask(null));
                dispatch(changeTargetCoords(null));
            }, 250);
        } else if (targetFlask.balls.length) {
            dispatch(changeActiveFlask(id));
        }
    };

    const checkWin = () => {
        const hasWin = flasks.filter(({ balls }) => balls.length).every(({ balls }) => isFilledFlask(balls));

        if (hasWin) {
            setWin(true);
        }
    };

    const handleAddFlask = () => {
        if (flasks.length > FLASKS_AMOUNT) return;

        dispatch(changeFlasks(flasks.concat({ id: nanoid(5), balls: [] })))
    };

    const handleCanselLastMoove = () => {
        if (!prevMoveSnapshot.length) return;

        const [lastSnapshot, ...rest] = prevMoveSnapshot;

        dispatch(changeFlasks(lastSnapshot));
        setPrevMoveSnapshot(rest)
    };

    const handleRestart = () => {
        setWin(false);
        fillFlasks();
    };

    useEffect(fillFlasks, []);

    useEffect(checkWin, [flasks]);

    return (
        <Container>
            <Header addFlask={handleAddFlask} canselLastMove={handleCanselLastMoove} restart={handleRestart} />
            <GameField>
                {splitArray(flasks, FLASKS_AMOUNT / 2, FLASKS_AMOUNT < flasks.length).map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map(flask => {
                            const isActive = flask.id === activeFlask;
                            const targetBallsLength = findFlask(targetFlaskId).balls?.length;

                            return (
                                <Flask
                                    key={flask.id}
                                    onClick={onClick}
                                    balls={flask.balls}
                                    flaskId={flask.id}
                                    isActive={isActive}
                                    targetCoords={targetCoords}
                                    targetBallsLength={targetBallsLength}
                                    flasksLength={flasks.length}
                                />
                            );
                        })}
                    </Row>
                ))}
            </GameField>
        </Container>
    );
};

export default MainView;
