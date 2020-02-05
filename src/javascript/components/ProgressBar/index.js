import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.css';

class ProgressBar extends PureComponent {

    componentDidMount() {
        const { handleTransitionEnd } = this.props;

        this.progress.addEventListener('transitionend', handleTransitionEnd);
    }

    componentWillUnmount() {
        this.progress.removeEventListener('transitionend', handleTransitionEnd)
    }

    render() {
        const { innerStyles } = this.props;

        console.log(innerStyles)

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
    health: PropTypes.number,
    handleTransitionEnd: PropTypes.func
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ProgressBar);
