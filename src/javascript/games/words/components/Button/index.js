import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

const Button = props => {
    const { text, className, ...respProps } = props;

    const buttonClassName = cx('button', className);

    return (
        <button className={buttonClassName} {...respProps}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Button;
