import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

interface IHeaderProps {
    addFlask: () => void;
    canselLastMove: () => void;
    restart: () => void;
};

const Container = styled.div`
    display: flex;
    padding: 10px 20px;

    ${Button}:not(:last-child) {
        margin-right: 20px;
    }
`;

const Header = ({ addFlask, canselLastMove, restart }: IHeaderProps) => (
    <Container>
        <Button onClick={restart} icon="sync-alt" />
        <Button onClick={canselLastMove} icon="reply" />
        <Button onClick={addFlask} icon="plus" />
    </Container>
)

export default Header;
