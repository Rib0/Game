import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

interface IModalProps {
    isActive: Boolean;
    header: string;
    content: React.ReactNode;
    acceptButtonText: string;
    acceptButtonCallback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    declineButtonText?: string;
    declineButtonCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: gray;
    opacity: 0.5;
    z-index: 98;
    pointer-events: none;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    z-index: 99;
    border-radius: 5px;
    width: 40%;
    background-color: white;
    box-shadow: inset 0 0 10px gray;
`;

const ModalHeader = styled.div`
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
`;

const ModalContent = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const ModalButtons = styled.div`
    text-align: center;

    ${Button}:not(:last-child) {
        margin-right: 10px;
    }
`;

const Modal = ({
    isActive,
    header,
    content,
    acceptButtonText,
    acceptButtonCallback,
    declineButtonText,
    declineButtonCallback,
}: IModalProps) => {
    if (!isActive) return null;

    return (
        <>
            <Overlay />
            <ModalContainer>
                <ModalHeader>{header}</ModalHeader>
                <ModalContent>{content}</ModalContent>
                <ModalButtons>
                    <Button text={acceptButtonText} onClick={acceptButtonCallback} />
                    {declineButtonText && (
                        <Button text={declineButtonText} onClick={declineButtonCallback} />
                    )}
                </ModalButtons>
            </ModalContainer>
        </>
    );
};

export default Modal;
