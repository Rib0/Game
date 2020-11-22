import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // todo сделать Button component with Icon, убрать margin у button

class Icon extends PureComponent {

    static IconTypes = {
        faBars: 'bars'
    }

    // todo добавить цвета

    static IconSizes = {
        large: '3x'
    }

    render() {
        const { type, size, onClick, rotated } = this.props;

        return (
            <div onClick={onClick} className={cx(styles.icon, rotated && styles.rotated)}>
                <FontAwesomeIcon size={size} icon={type} />
            </div>
        )
    }
}

Icon.propTypes = {
    type: PropTypes.oneOf(Object.values(Icon.IconTypes)),
    size: PropTypes.oneOf(Object.values(Icon.IconSizes)),
    onClick: PropTypes.func
};

export default Icon;