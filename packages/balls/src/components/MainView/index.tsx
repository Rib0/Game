import React, { useState, useEffect, useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { nanoid } from 'nanoid';

import { Header } from '@/components/Header';
import { Flask } from '@/components/Flask';
import { getRandom, splitArray, isFilledFlask } from '@/utils';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';

import { BallsColors, FlasksType, IFlask } from '@/types/flask';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faReply, faPlus, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FLASKS_AMOUNT } from './constants';
import { initialState, reducer } from './reducer';
import { changeActiveFlaskId, changeFlasks, changeTargetCoords, setWin } from './reducer/actions';

library.add(faSyncAlt, faReply, faPlus, faPalette);

const themes = {
    default: {
        main: 'white',
    },
    lightblue: {
        main: 'lightblue',
    },
};

type Theme = (typeof themes)[keyof typeof themes];

const Container = styled.div`
    background-color: ${({ theme }: { theme: Theme }) => theme.main};
    padding: 20px;
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

const BALLS_PER_FLASK = 4;
const ID_LENGTH = 5;

const MainView = () => {
    const [{ flasks, activeFlaskId, targetCoords, isWin }, dispatch] = useReducer(
        reducer,
        initialState,
    );
    const [targetFlaskId, setTargetFlaskId] = useState('');
    const [prevMoveSnapshot, setPrevMoveSnapshot] = useState<FlasksType[]>([]);
    const [theme, setTheme] = useState(themes.default);

    const fillFlasks = () => {
        const colorsKeys: BallsColors[] = Object.values(BallsColors);

        const colorsCounter = colorsKeys.reduce(
            (acc, cur) => ({
                ...acc,
                [cur]: 0,
            }),
            {} as Record<string, number>,
        );

        const resultFlasks = Array.from(new Array(FLASKS_AMOUNT).keys()).map((f, i) => {
            const flask: IFlask = { id: nanoid(ID_LENGTH), balls: [] };

            if (i > FLASKS_AMOUNT - 3) return flask;

            while (flask.balls.length < BALLS_PER_FLASK) {
                const randomColorIndex = getRandom(0, colorsKeys.length - 1);
                const randomColor = colorsKeys[randomColorIndex];
                const colorCount = colorsCounter[randomColor];

                if (colorCount !== BALLS_PER_FLASK) {
                    flask.balls.push({ color: randomColor, id: nanoid(ID_LENGTH) });
                    colorsCounter[randomColor] = colorCount + 1;
                }
            }

            return flask;
        });

        dispatch(changeFlasks(resultFlasks));
    };

    const findFlask = (id: string): Partial<IFlask> =>
        flasks.find((flask) => flask.id === id) || {};

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
            dispatch(changeActiveFlaskId(null));
            return;
        }

        if (activeFlaskId !== id && activeFlaskId !== null) {
            const [changedBall] = findFlask(activeFlaskId).balls.slice(-1);
            const [topTargetBall] = targetFlask.balls.slice(-1);

            if (topTargetBall && topTargetBall.color !== changedBall.color) {
                dispatch(changeActiveFlaskId(null));
                return;
            }

            const { bottom, left } = e.currentTarget.getBoundingClientRect();
            const restBalls = findFlask(activeFlaskId).balls.slice(0, -1);
            const ballsWithChanged = targetFlask.balls.concat(changedBall);
            const updatedFlasks = flasks.map((flask) => {
                switch (flask.id) {
                    case activeFlaskId:
                        return { ...flask, balls: restBalls };
                    case id:
                        return { ...flask, balls: ballsWithChanged };
                    default:
                        return flask;
                }
            });

            dispatch(changeTargetCoords({ bottom, left }));
            setTargetFlaskId(id);
            setPrevMoveSnapshot((spanshots) => [flasks, ...spanshots]);

            setTimeout(() => {
                dispatch(changeFlasks(updatedFlasks));
                dispatch(changeTargetCoords(null));
                dispatch(changeActiveFlaskId(null));
            }, 300);
        } else if (targetFlask.balls.length) {
            dispatch(changeActiveFlaskId(id));
        }
    };

    const toggleTheme = () => {
        setTheme(theme === themes.default ? themes.lightblue : themes.default);
    };

    const checkWin = () => {
        if (!flasks.length) return;

        const hasWin = flasks
            .filter(({ balls }) => balls.length)
            .every(({ balls }) => isFilledFlask(balls));

        if (hasWin) {
            dispatch(setWin(true));
        }
    };

    const handleAddFlask = () => {
        if (flasks.length > FLASKS_AMOUNT) return;

        dispatch(changeFlasks(flasks.concat({ id: nanoid(ID_LENGTH), balls: [] })));
    };

    const handleCanselLastMoove = () => {
        if (!prevMoveSnapshot.length) return;

        const [lastSnapshot, ...rest] = prevMoveSnapshot;

        dispatch(changeFlasks(lastSnapshot));
        setPrevMoveSnapshot(rest);
    };

    const handleRestart = () => {
        dispatch(setWin(false));
        fillFlasks();
    };

    useEffect(fillFlasks, []);

    useEffect(checkWin, [flasks]);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header>
                    <Button onClick={handleRestart} icon="sync-alt" />
                    <Button onClick={handleCanselLastMoove} icon="reply" />
                    <Button
                        disabled={flasks.length > FLASKS_AMOUNT}
                        onClick={handleAddFlask}
                        icon="plus"
                    />
                    <Button onClick={toggleTheme} icon="palette" />
                </Header>
                <GameField>
                    {splitArray(flasks, FLASKS_AMOUNT / 2, FLASKS_AMOUNT < flasks.length).map(
                        (row, rowIndex) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Row key={rowIndex}>
                                {row.map((flask: IFlask) => {
                                    const isActive = flask.id === activeFlaskId;
                                    const targetBallsLength =
                                        findFlask(targetFlaskId).balls?.length;

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
                        ),
                    )}
                </GameField>
                <Modal
                    header="Вы выиграли!"
                    content={<>Хотите сыграть еще?</>}
                    isActive={isWin}
                    acceptButtonText="Начать заного"
                    acceptButtonCallback={handleRestart}
                    declineButtonText="Вернуться в главное меню"
                    declineButtonCallback={() => window.backToMenu()}
                />{' '}
            </Container>
        </ThemeProvider>
    );
};

export default MainView;
