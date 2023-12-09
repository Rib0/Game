import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IIconProps {
    icon: 'sync-alt' | 'reply' | 'plus' | 'palette';
}

export const Icon = ({ icon }: IIconProps) => <FontAwesomeIcon icon={icon} />;
