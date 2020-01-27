import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class ProgressBar extends PureComponent {
    static transitionDurations = {
        slow: '1000ms',
        medium: '700ms',
        fast: '400ms',
    };

    constructor(props) {
        super(props);
        const { transitionDuration } = props;

        this.state = {
            width: 100,
            speed: ProgressBar.transitionDurations[transitionDuration],
        };
    }

    componentDidMount() {
        const { speed, width } = this.state;

        this.timerId = setInterval(() => {
            this.setState({
                width: width - 20, // start game
            });
        }, parseInt(speed));

        this.progress.addEventListener('transitionend', this.checkEndGame);
    }

    componentWillUnmount() {}

    checkEndGame = () => {
        const { width } = this.state;

        if (width < 0) {
            console.log('Вы проиграли');
            clearInterval(this.timerId);
        }
    };

    render() {
        const { width, speed } = this.state;

        const progressInnerStyles = {
            width: `${width}%`,
            transitionDuration: speed,
        };

        return (
            <div className={styles.progressBar}>
                <div ref={elem => (this.progress = elem)} style={progressInnerStyles} className={styles.progressInner} />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    width: PropTypes.number,
    transitionDuration: PropTypes.oneOf[Object.keys(ProgressBar.transitionDurations)],
};

ProgressBar.defaultProps = {
    width: 0,
    transitionDuration: 'slow',
};

export default ProgressBar;
