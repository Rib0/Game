import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Icon from '../Icon';

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
        const {
            type,
            size,
            iconType,
            text,
            className,
            iconClassName,
            children,
            ...otherProps
        } = this.props;

        const buttonClassName = cx('button', iconType && 'buttonWithIcon', type, size, className);

        return (
            <button className={buttonClassName} {...otherProps}>
                {iconType ? <Icon type={iconType} className={iconClassName} /> : text}
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
    size: PropTypes.oneOf(Object.values(Button.Sizes)),
    iconType: PropTypes.oneOf(Object.values(Icon.IconTypes)),
    iconSize: PropTypes.oneOf(Object.values(Icon.IconSizes)),
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    iconClassName: PropTypes.string,
    children: PropTypes.element,
};

export default Button;
