import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

interface IHeaderProps {
    children: React.ReactNode;
}

const Container = styled.div`
    display: flex;
    padding: 10px 20px;

    ${Button}:not(:last-child) {
        margin-right: 20px;
    }
`;

const Header: React.FC<IHeaderProps> = ({ children }) => <Container>{children}</Container>;

export default Header;
