import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.css';

class Icon extends PureComponent {
    static IconTypes = {
        faBars: 'bars',
    };

    static IconSizes = {
        large: '3x',
    };

    render() {
        const { type, size, onClick, rotated } = this.props;

        return (
            <div onClick={onClick} className={cx(styles.icon, rotated && styles.rotated)}>
                <FontAwesomeIcon size={size} icon={type} />
            </div>
        );
    }
}

Icon.propTypes = {
    type: PropTypes.oneOf(Object.values(Icon.IconTypes)),
    size: PropTypes.oneOf(Object.values(Icon.IconSizes)),
    onClick: PropTypes.func,
    rotated: PropTypes.bool
};

export default Icon;
