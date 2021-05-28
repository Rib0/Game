import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IconProps = {
    icon: 'bars' | 'sync-alt' | 'reply' | 'plus';
};

const Icon = ({ icon }: IconProps) => {
    return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
