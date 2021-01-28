import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ReactTooltip from 'react-tooltip';

import * as actions from 'WordsGame/store/actions';
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
                    {options.map(({ value, label, actionName, type, tooltipText }) => (
                        <li
                            className={cx('listItem', {
                                active: value === props[valueName],
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
    valueName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);
