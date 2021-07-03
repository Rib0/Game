import React from 'react';
import styled from 'styled-components';

import Icon, { IIconProps } from '../Icon';

interface IStyledButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon: IIconProps['icon'],
}

const Button = ({ onClick, icon, className }: IStyledButtonProps & React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <button type="button" onClick={onClick} className={className}>
            <Icon icon={icon} />
        </button>
    )
}

const StyledButton = styled(Button)`
    cursor: pointer;
    padding: 5px 20px;
    border: none;
    border-radius: 8px;
    background-color: #f6d515;
    box-shadow: 0 4px #ac5d0b;

    &:active {
        transform: translateY(1px);
        box-shadow: 0 5px #ac5d0b;
    }
`;

export default StyledButton;
