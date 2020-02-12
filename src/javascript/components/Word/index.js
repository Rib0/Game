import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

class Word extends PureComponent {

    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown);
    }

    componentDidUpdate(prevProps) {
        const { wordArray, getRandomWord } = this.props;

        if (prevProps.wordArray !== wordArray) {
            const isComplete = wordArray.every(word => word.complete);
            isComplete && getRandomWord();
        }
    }

    onKeyDown = event => {
        const { key } = event;
        const { wordArray, getRightLetter, resetWord } = this.props;
        const currentLetter = wordArray.find(word => !word.complete);

        const { letter } = currentLetter;

        letter === key ? getRightLetter() : resetWord();
    };

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown);
    }

    render() {
        const { wordArray } = this.props;

        return (
            <div className={styles.word}>
                {wordArray.map(({ letter, complete }, index) => (
                    <span key={index} className={cx('letter', { complete })}>
                        {letter}
                        <div className={styles.inner}>{letter}</div>
                    </span>
                ))}
            </div>
        );
    }
}

Word.propTypes = {
    word: PropTypes.array, // todo proptypes
};

export default Word;
