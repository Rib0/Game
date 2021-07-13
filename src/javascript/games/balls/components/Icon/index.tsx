import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IIconProps {
    icon: 'sync-alt' | 'reply' | 'plus' | 'palette';
}

const Icon = ({ icon }: IIconProps) => {
    return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
