import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.css';

const cx = classNames.bind(styles);

export default class Icon extends PureComponent {
    static IconTypes = {
        faBars: 'bars',
        faHome: 'home',
    };

    static IconSizes = {
        large: '3x',
    };

    render() {
        const { type, size, className } = this.props;

        return (
            <div className={cx('icon', className)}>
                <FontAwesomeIcon size={size} icon={type} />
            </div>
        );
    }
}

Icon.propTypes = {
    type: PropTypes.oneOf(Object.values(Icon.IconTypes)),
    size: PropTypes.oneOf(Object.values(Icon.IconSizes)),
    className: PropTypes.string,
};

Icon.defaultProps = {
    size: Icon.IconSizes.large,
};