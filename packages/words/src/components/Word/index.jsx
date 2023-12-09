import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

class Word extends PureComponent {
    state = {
        transitionDuration: '.2s',
        missedIndex: null,
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
            if (isComplete) {
                getRightWord();
                this.resetTransition();
            }
        }
    }

    handleMiss() {
        const { wordArray } = this.props;

        const missedLetterIndex = wordArray.findIndex(word => !word.complete);
        this.setState({ missedIndex: missedLetterIndex });
        setTimeout(() => {
            this.setState({ missedIndex: null });
        }, 100);
    }

    onKeyDown = event => {
        const { key } = event;
        const { wordArray, getRightLetter, resetWord } = this.props;

        const currentLetter = wordArray.find(word => !word.complete);

        const { letter } = currentLetter;

        if (letter === key) {
            getRightLetter();
        } else {
            this.handleMiss();
            resetWord();
            this.resetTransition();
        }
    };

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown);
    }

    render() {
        const { wordArray } = this.props;
        const { transitionDuration, missedIndex } = this.state;

        return (
            <div className={styles.word}>
                {wordArray.map(({ letter, complete }, index) => (
                    <span
                        key={index}
                        className={cx('letter', { complete, missed: missedIndex === index })}
                    >
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
    wordArray: PropTypes.arrayOf(
        PropTypes.shape({
            letter: PropTypes.string,
            complete: PropTypes.bool,
            missed: PropTypes.bool,
        })
    ),
    getRightWord: PropTypes.func,
    getRightLetter: PropTypes.func,
    resetWord: PropTypes.func,
};

export default Word;
