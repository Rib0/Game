import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeHealth, changeWord } from 'store/actions';
import ProgressBar from 'components/ProgressBar';
import Word from 'components/Word';
import Button from 'components/Button';
import styles from './styles.css';

const WORDS_AMOUNT = 9;
const HEALTH_STEP = -25;

const data = [
    'сковорода',
    'ветка',
    'компьютер',
    'яблоко',
    'виноград',
    'компания',
    'паралеллограмм',
    'школа',
    'океан',
    'спорт'
]

class GameView extends PureComponent {
    static gameTypes = {};

    static gameDifficulties = {
        easy: '2000ms',
        normal: '1500ms',
        hard: '1300ms',
    };

    state = {
        started: false,
        wordArray: [],
    };

    componentDidMount() {
        this.getRandomWord(); // change to getRandomWord
    }

    getRandomWord = () => {
        const { changeWord } = this.props;
        const randomIndex = Math.floor(Math.random() * (WORDS_AMOUNT - 0 + 1)) + 0;
        const newWord = data[randomIndex];

        changeWord(newWord);
        this.generateWordArray(newWord);
    };

    generateWordArray = word => {
        const wordArray = word.split('').map(letter => ({ letter, complete: false }));

        this.setState({
            wordArray,
        });
    };

    resetWord = () => {
        const { wordArray } = this.state;

        const resetedWord = wordArray.map(word => ({ ...word, complete: false }));
        this.setState({
            wordArray: resetedWord,
        });
    };

    getRightLetter = () => {
        const { wordArray } = this.state;

        let isComplete = false;
        const newWordArray = wordArray.map(word => {
            if (!isComplete && !word.complete) {
                isComplete = true;
                return { ...word, complete: true };
            } else {
                return word;
            }
        });

        this.setState({
            wordArray: newWordArray,
        });
    };

    changeHealth = (diff = HEALTH_STEP) => {
        const { changeHealth, health } = this.props;

        let newHealth = health + diff;

        newHealth = newHealth > 100 ? 100 : newHealth < 0 ? 0 : newHealth;
        changeHealth(newHealth);
    };

    handleTransitionEnd = () => {
        const { health } = this.props;

        if (!health) {
            console.log('Вы проиграли');
            this.stopGame();
        }
    };

    startGame = () => {
        const { difficulty } = this.props;
        const timeOut = parseInt(GameView.gameDifficulties[difficulty]);

        this.timerId = setInterval(this.changeHealth, timeOut);
        this.setState({
            started: true,
        });
    };

    stopGame = () => {
        clearInterval(this.timerId);
    };

    componentWillUnmount() {
        this.stopGame();
    }

    render() {
        const { health, difficulty, ...props } = this.props;
        const { started, wordArray } = this.state;

        const innerStyles = {
            width: `${health}%`,
            transitionDuration: GameView.gameDifficulties[difficulty],
        };

        return (
            <div className={styles.row}>
                <div className={styles.col}>
                    {!started && <Button text="Старт" onClick={this.startGame} />}
                </div>
                <div className={styles.col}>
                    {started && (
                        <Word
                            {...props}
                            wordArray={wordArray}
                            getRandomWord={this.getRandomWord}
                            generateWordArray={this.generateWordArray}
                            resetWord={this.resetWord}
                            getRightLetter={this.getRightLetter}
                        />
                    )}
                </div>
                <div className={styles.col}>
                    <ProgressBar
                        innerStyles={innerStyles}
                        changeHealth={changeHealth}
                        handleTransitionEnd={this.handleTransitionEnd}
                    />
                </div>
            </div>
        );
    }
}

GameView.propTypes = {
    difficulty: PropTypes.oneOf(Object.keys(GameView.gameDifficulties)),
    health: PropTypes.number,
    score: PropTypes.number,
    word: PropTypes.array,
};

GameView.defaultProps = {
    difficulty: 'normal',
};

const mapStateToProps = ({ game }) => ({
    ...game,
});

const mapDispatchToProps = {
    changeHealth,
    changeWord,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
