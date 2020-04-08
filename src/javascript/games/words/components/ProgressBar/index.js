import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class ProgressBar extends PureComponent {
    componentDidMount() {
        const { handleTransitionEnd } = this.props;

        this.progress.addEventListener('transitionend', handleTransitionEnd);
    }

    componentWillUnmount() {
        const { handleTransitionEnd } = this.props;

        this.progress.removeEventListener('transitionend', handleTransitionEnd);
    }

    render() {
        const { innerStyles } = this.props;

        return (
            <div className={styles.progressBar}>
                <div
                    ref={elem => (this.progress = elem)}
                    style={innerStyles}
                    className={styles.progressInner}
                />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    handleTransitionEnd: PropTypes.func,
    innerStyles: PropTypes.objectOf(PropTypes.string),
};

export default ProgressBar;
