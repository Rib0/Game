import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Flask from '../Flask';
import { COLORS_MAP } from '../../constants'; // todo alias

const Container = styled.div`
    padding: 20px;
    /* background: #000c3c; todo theme */
`;

const GameField = styled.div`
    padding: 20px 0;
`;

export type ballState = {
    color: string;
};
type flaskState = ballState[];
type flasksState = flaskState[];

const MainView = () => {
    const [started, setStarted] = useState(false);
    const [flasks, setFlasks] = useState<flasksState>([
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
    ]);

    const generateFlasks = () => {};

    return (
        <Container>
            <Header />
            <GameField>
                {flasks.map(flask => (
                    <Flask balls={flask} />
                ))}
            </GameField>
        </Container>
    );
};

export default MainView;
