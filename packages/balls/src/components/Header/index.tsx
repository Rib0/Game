import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/Button';

const Container = styled.div`
    display: flex;
    padding: 10px 20px;

    ${Button}:not(:last-child) {
        margin-right: 20px;
    }
`;

export const Header: React.FC<PropsWithChildren> = ({ children }) => (
    <Container>{children}</Container>
);
