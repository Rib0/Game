import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import * as actions from 'store/actions';
import styles from './styles.css';

const cx = classNames.bind(styles);

class MenuView extends PureComponent {
    onClick = event => {
        const {
            dataset: { action: actionName, value },
        } = event.target;
        const { [actionName]: action } = this.props;

        action(value);
    };

    render() {
        const { options, valueName, ...props } = this.props;

        return (
            <div>
                <ul>
                    {options.map(option => (
                        <li
                            className={cx('listItem', {
                                active: option.value === props[valueName],
                            })}
                            key={option.label}
                        >
                            <button
                                type="button"
                                data-action={option.actionName}
                                data-value={option.value}
                                className={cx('button', { back: option.type === 'back' })}
                                onClick={this.onClick}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ game }) => ({
    ...game,
});

const mapDispatchToProps = {
    ...actions,
};

MenuView.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    valueName: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuView);
