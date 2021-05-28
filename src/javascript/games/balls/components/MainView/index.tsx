import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Flask from '../Flask';
import Icon from '../Icon';

const Container = styled.div`
    padding: 20px;
    /* background: #000c3c; todo theme */
`;

const GameField = styled.div`
    padding: 20px 0;
`;

export type ballsTypes = 'red' | 'blue';
type flaskState = ballsTypes[];
type flasksState = flaskState[];

const MainView = () => {
    const [started, setStarted] = useState(false);
    const [flasks, setFlasks] = useState<flasksState>([['red', 'red', 'red', 'red']]);
    const [activeFlask, setActiveFlask] = useState(null);

    // todo сделать все с useReducer

    return (
        <Container>
            <Header />
            <GameField>
                {flasks.map(balls => (
                    <Flask balls={balls} />
                ))}
                <Icon icon="sync-alt" /> {/* todo сделать все в с Button и iconType  */}
                <Icon icon="reply" />
                <Icon icon="plus" />
            </GameField>
        </Container>
    );
};

export default MainView;
