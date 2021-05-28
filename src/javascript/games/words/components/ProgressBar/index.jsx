import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class ProgressBar extends PureComponent {

    refDiv = elem => {
        this.progress = elem;
    }

    componentDidMount() {
        const { handleTransitionEnd } = this.props;

        this.progress.addEventListener('transitionend', handleTransitionEnd);
    }

    componentWillUnmount() {
        const { handleTransitionEnd } = this.props;

        this.progress.removeEventListener('transitionend', handleTransitionEnd);
    }

    render() {
        const { width, transitionDuration } = this.props;

        const style = {
            width,
            transitionDuration
        };

        return (
            <div className={styles.progressBar}>
                <div
                    ref={this.refDiv}
                    style={style}
                    className={styles.progressInner}
                />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    handleTransitionEnd: PropTypes.func,
    width: PropTypes.string,
    transitionDuration: PropTypes.string
};

export default ProgressBar;
