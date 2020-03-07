import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeHealth, changeView } from 'store/actions';
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
    'спорт',
];

class GameView extends PureComponent {
    static gameTypes = {};

    static gameDifficulties = {
        easy: '2000ms',
        normal: '1500ms',
        hard: '1300ms',
    };

    constructor(props) {
        super(props);

        const { difficulty } = props;
        this.transitionDuration = GameView.gameDifficulties[difficulty];

        this.state = {
            started: false,
            texts: {
                gameMessage: '',
                buttonText: 'Старт',
            },
            wordArray: [],
            transitionDuration: '0ms',
        };
    }

    getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * (WORDS_AMOUNT - 0 + 1)) + 0;
        const newWord = data[randomIndex];

        const wordArray = newWord.split('').map(letter => ({ letter, complete: false }));

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
            }
            return word;
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

    getRightWord = () => {
        this.stopGame();
        this.getRandomWord();
        this.changeImmediately(50);
    };

    handleTransitionEnd = () => {
        const { health } = this.props;

        if (!health) {
            this.getLoose();
        }
    };

    changeImmediately(value) {
        this.setState({
            transitionDuration: `${0}ms`,
        });
        this.changeHealth(value);
        setTimeout(() => {
            this.setState({ transitionDuration: this.transitionDuration });
            this.changeHealth(-25);
            this.timerId = setInterval(this.changeHealth, parseInt(this.transitionDuration));
        }, 0);
    }

    startGame = () => {
        const { texts } = this.props;

        this.getRandomWord();
        this.changeImmediately(100);

        this.setState({
            started: true,
            texts: {
                ...texts,
                gameMessage: '',
            },
        });
    };

    stopGame() {
        clearInterval(this.timerId);
    }

    getLoose() {
        this.stopGame();
        this.setState({
            texts: {
                gameMessage: 'Вы проиграли!',
                buttonText: 'Играть еще',
            },
            started: false,
        });
    }

    componentWillUnmount() {
        this.stopGame();
    }

    render() {
        const { health, difficulty, changeView, ...props } = this.props;
        const {
            started,
            wordArray,
            transitionDuration,
            texts: { buttonText, gameMessage },
        } = this.state;

        const innerStyles = {
            width: `${health}%`,
            transitionDuration,
        };

        return (
            <div className={styles.row}>
                {!started && (
                    <div className={styles.col}>
                        {gameMessage && (
                            <>
                                <div className={styles.message}>{gameMessage}</div>
                                <Button text="В главное меню" onClick={() => changeView('menu')} />
                                <br />
                                <br />
                            </>
                        )}
                        <Button text={buttonText} onClick={this.startGame} />
                    </div>
                )}
                {started && (
                    <>
                        <div className={styles.col}>
                            <Word
                                {...props}
                                wordArray={wordArray}
                                resetWord={this.resetWord}
                                getRightLetter={this.getRightLetter}
                                getRightWord={this.getRightWord}
                                disabled={!started}
                            />
                        </div>
                        <div className={styles.col}>
                            <ProgressBar
                                innerStyles={innerStyles}
                                handleTransitionEnd={this.handleTransitionEnd}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    }
}

GameView.propTypes = {
    difficulty: PropTypes.oneOf(Object.keys(GameView.gameDifficulties)),
    health: PropTypes.number,
    score: PropTypes.number,
    word: PropTypes.string,
};

GameView.defaultProps = {
    difficulty: 'normal',
};

const mapStateToProps = ({ game }) => ({
    ...game,
});

const mapDispatchToProps = {
    changeHealth,
    changeView,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
