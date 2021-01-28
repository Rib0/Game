import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    border: 1px solid #b0b8c4;
`;

type HeaderProps = {
    addFlask: () => void;
    canselLastMove: () => void;
    restart: () => void;
};

const Header = () => {
    return <Container>Header</Container>;
};

export default Header;
