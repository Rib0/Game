import React from 'react';
import classNames from 'classnames/bind';

import Icon from '@/components/Icon';

import styles from './styles.css';

const cx = classNames.bind(styles);

const TYPES = {
    default: 'default',
    styled: 'styled',
};

const SIZES = {
    medium: 'medium',
    large: 'large',
}

export default (props) => {
    const { type, size, iconType, text, className, iconClassName, ...otherProps } = props;

    const buttonClassName = cx('button', iconType && 'buttonWithIcon', type, size, className);

    return (
        <button type="button" className={buttonClassName} {...otherProps}>
            {iconType ? <Icon type={iconType} className={iconClassName} /> : text}
        </button>
    )
}

// Button.propTypes = {
//     type: PropTypes.oneOf(Object.values(TYPES)),
//     size: PropTypes.oneOf(Object.values(SIZES)),
//     iconType: PropTypes.oneOf(Object.values(Icon.IconTypes)),
//     iconSize: PropTypes.oneOf(Object.values(Icon.IconSizes)),
//     text: PropTypes.string,
//     onClick: PropTypes.func,
//     className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     iconClassName: PropTypes.string,
// };