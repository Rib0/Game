import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

import Header from '../Header';
import Flask from '../Flask'; // todo add aliases
import Icon from '../Icon';

import reducer, {
    changeFlasks,
    changeActiveFlask,
    changeTransitionedFlask,
    changeTargetCoords,
} from './reducer';
import { IinitialState, flasksType } from './types';
import { getRandom, splitArray } from '../../utils';

/*
    todo уровни сложности, кол-во шариков, колбочек, сохранять в localStorage результат,
    возможность отменить ход, возможность менять темы, возможность добавлять пустую колбу

    доделать анимацию шариков
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
    transitionedFlask: null,
    activeFlask: undefined,
    targetCoords: null,
    isWin: false,
};

const FLASKS_AMOUNT = 14;
const BALLS_PER_FLASK = 4;

const MainView = () => {
    const [{ flasks, transitionedFlask, activeFlask, targetCoords }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const fillFlasks = () => {
        const colorsKeys: ballsColors[] = Object.values(ballsColors);

        const colorsCounter = colorsKeys.reduce((acc, cur) => {
            return {
                ...acc,
                [cur]: 0,
            };
        }, {});

        let resultFlasks: flasksType = new Array(FLASKS_AMOUNT).fill([]);

        resultFlasks = resultFlasks.map((f, i) => {
            const flask = [];

            if (i > FLASKS_AMOUNT - 3) return flask;

            while (flask.length < BALLS_PER_FLASK) {
                const randomColorIndex = getRandom(0, colorsKeys.length - 1);
                const randomColor = colorsKeys[randomColorIndex];
                const colorCount = colorsCounter[randomColor];

                if (colorCount !== BALLS_PER_FLASK) {
                    flask.push({ color: randomColor, id: nanoid(5) });
                    colorsCounter[randomColor] = colorCount + 1;
                }
            }

            return flask;
        });

        dispatch(changeFlasks(resultFlasks));
    };

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.currentTarget instanceof HTMLDivElement)) {
            return;
        }

        const {
            dataset: { index },
        } = e.currentTarget;

        const { bottom, left } = e.currentTarget.getBoundingClientRect();

        if (activeFlask !== +index && activeFlask !== undefined && activeFlask !== null) {
            const [changedBall] = flasks[activeFlask].slice(-1);
            const restBalls = flasks[activeFlask].slice(0, -1);
            const ballsWithChanged = flasks[index].concat(changedBall);
            const [topTargetBall] = flasks[index].slice(-1);

            // if (topTargetBall && topTargetBall.color !== changedBall.color) {
            //     dispatch(changeActiveFlask(null));
            //     return;
            // } todo поправить

            dispatch(changeTargetCoords({ bottom, left }));
            dispatch(changeTransitionedFlask(activeFlask));

            const updatedFlasks = flasks.map((flask, i) =>
                i === activeFlask ? restBalls : i === +index ? ballsWithChanged : flask
            );

            setTimeout(() => {
                dispatch(changeFlasks(updatedFlasks));
                dispatch(changeActiveFlask(null));
                dispatch(changeTransitionedFlask(null));
            }, 500);
        } else {
            dispatch(changeActiveFlask(+index));
        }
    };

    useEffect(fillFlasks, []);

    return (
        <Container>
            <Header />
            <GameField>
                {splitArray(flasks, 7).map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map((balls, index) => {
                            const flaskIndex = rowIndex * 7 + index;
                            const isActive = flaskIndex === activeFlask;
                            const isTransitioned = flaskIndex === transitionedFlask;

                            return (
                                <Flask
                                    key={index}
                                    onClick={onClick}
                                    balls={balls}
                                    flaskIndex={flaskIndex}
                                    isActive={isActive}
                                    isTransitioned={isTransitioned}
                                    targetCoords={targetCoords}
                                />
                            );
                        })}
                    </Row>
                ))}
                <Icon icon="sync-alt" /> {/* todo сделать все в с Button и iconType  */}
                <Icon icon="reply" />
                <Icon icon="plus" />
            </GameField>
        </Container>
    );
};

export default MainView;
