import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';

import * as actions from 'WordsGame/store/actions';
import { initialState as gameInitialState } from 'WordsGame/store/reducers/game';
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
        const { options, storeKeyName, ...props } = this.props;

        return (
            <div>
                <ul>
                    {options.map(({ value, label, actionName, type, tooltipText }) => (
                        <li
                            className={cx('listItem', {
                                active: value === props[storeKeyName],
                            })}
                            key={label}
                        >
                            <button
                                type="button"
                                data-action={actionName}
                                data-value={value}
                                className={cx('button', { back: type === 'back' })}
                                onClick={this.onClick}
                                data-tip={tooltipText && tooltipText}
                            >
                                {label}
                            </button>
                            {tooltipText && <ReactTooltip />}
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
    storeKeyName: PropTypes.oneOf(Object.keys(gameInitialState)),
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);
