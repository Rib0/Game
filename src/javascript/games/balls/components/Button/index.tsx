import React from 'react';
import styled from 'styled-components';

import Icon, { IIconProps } from '../Icon';

interface IStyledButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: IIconProps['icon'];
    text?: string;
    disabled?: boolean;
}

const Button = ({
    icon,
    text,
    ...rest
}: IStyledButtonProps & React.HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button type="button" {...rest}>
            {icon ? <Icon icon={icon} /> : text}
        </button>
    );
};

const StyledButton = styled(Button)`
    cursor: pointer;
    padding: 5px 20px;
    border: none;
    border-radius: 8px;
    background-color: ${({ disabled }) => (disabled ? 'lightgray' : '#f6d515')};
    box-shadow: 0 4px #ac5d0b;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

    &:active {
        transform: translateY(1px);
        box-shadow: 0 5px #ac5d0b;
    }
`;

export default StyledButton;
