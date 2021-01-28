import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

class Button extends PureComponent {
    static Types = {
        default: 'default',
        styled: 'styled',
    };

    static Sizes = {
        medium: 'medium',
        large: 'large',
    };

    render() {
        const { type, size, text, className, children, ...otherProps } = this.props;

        const buttonClassName = cx('button', Button.Types[type], Button.Sizes[size], className);

        return (
            <button className={buttonClassName} {...otherProps}>
                {text}
                {children}
            </button>
        );
    }
}

Button.defaultProps = {
    type: Button.Types.styled,
    size: Button.Sizes.medium,
};

Button.propTypes = {
    type: PropTypes.oneOf(Object.values(Button.Types)),
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.element,
};

export default Button;
