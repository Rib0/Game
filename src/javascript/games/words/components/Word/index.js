import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

class Word extends PureComponent {
    state = {
        transitionDuration: '.2s',
    };

    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown);
    }

    resetTransition() {
        this.setState({
            transitionDuration: '0s',
        });
        setTimeout(() => {
            this.setState({
                transitionDuration: '.2s',
            });
        }, 0);
    }

    componentDidUpdate(prevProps) {
        const { wordArray, getRightWord } = this.props;

        if (prevProps.wordArray !== wordArray) {
            const isComplete = wordArray.every(word => word.complete);
            isComplete && (getRightWord(), this.resetTransition());
        }
    }

    onKeyDown = event => {
        const { key } = event;
        const { wordArray, getRightLetter, resetWord } = this.props;
        const currentLetter = wordArray.find(word => !word.complete);

        const { letter } = currentLetter;

        letter === key ? getRightLetter() : (resetWord(), this.resetTransition());
    };

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown);
    }

    render() {
        const { wordArray } = this.props;
        const { transitionDuration } = this.state;

        return (
            <div className={styles.word}>
                {wordArray.map(({ letter, complete }, index) => (
                    <span key={index} className={cx('letter', { complete })}>
                        {letter}
                        <div style={{ transitionDuration }} className={styles.inner}>
                            {letter}
                        </div>
                    </span>
                ))}
            </div>
        );
    }
}

Word.propTypes = {
    wordArray: PropTypes.array, // todo proptypes
};

export default Word;
