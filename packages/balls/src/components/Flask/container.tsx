import React from 'react';
import styled, { keyframes } from 'styled-components';

interface IContainerProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isFilled: boolean;
}

const filledAnimation = keyframes`
    from {
        transform: translateY(0)
    }

    to {
        transform: translateY(-20px);
    }
`;

export const Container = styled.div<IContainerProps>`
    position: relative;
    height: 175px;
    width: 50px;
    margin: 0 11px;
    border: 4px solid #b0b8c4;
    border-top-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    animation: ${({ isFilled }) => (isFilled ? filledAnimation : '')} 0.3s linear;
    opacity: ${({ isFilled }) => (isFilled ? 0.6 : 1)};

    &:before {
        content: '';
        position: absolute;
        top: -14px;
        height: 10px;
        border-radius: 35%;
        width: calc(100% + 20px);
        border: 4px solid #b0b8c4;
        transform: translateX(-13.6px);
        background-color: white;
    }

    &:after {
        content: '';
        position: absolute;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }
`;
