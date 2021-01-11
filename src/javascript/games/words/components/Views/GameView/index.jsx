import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import {
    changeHealth,
    changeView,
    changeScore,
    setLoading,
    unsetLoading,
} from 'WordsGame/store/actions';
import ProgressBar from 'WordsGame/components/ProgressBar';
import Word from 'WordsGame/components/Word';
import { Button, Loader } from 'Base';
import styles from './styles.css';

const cx = classNames.bind(styles);
const HEALTH_STEP = -25;

class GameView extends PureComponent {
    static gameTypes = {
        survival: 0,
        time: 1,
    };

    static gameDifficulties = {
        easy: '2000ms',
        normal: '1500ms',
        hard: '1300ms',
    };

    constructor(props) {
        super(props);

        const { difficulty, gameType } = props;
        this.withTime = GameView.gameTypes[gameType];
        this.transitionDuration = !this.withTime
            ? GameView.gameDifficulties[difficulty]
            : '15000ms';

        this.state = {
            loading: true,
            words: [],
            started: false,
            texts: {
                gameMessage: '',
                buttonText: 'Старт',
            },
            wordArray: [],
            transitionDuration: '0ms',
            increasing: false,
        };
    }

    componentDidMount() {
        const { setLoading, unsetLoading } = this.props;

        setLoading();
        import(/* webpackChunkName: 'jsonData' */ '../../../../../../data.json').then(data => {
            setTimeout(() => {
                const words = this.getWords(Object.values(data));

                this.setState({
                    loading: false,
                    words,
                });
                unsetLoading();
            }, 800); // типо загрузка
        });
    }

    componentDidUpdate(prevProps) {
        const { score } = prevProps;
        const { score: curScore } = this.props;

        if (score !== curScore) {
            this.setState({ increasing: false });
            setTimeout(() => this.setState({ increasing: true }), 0);
        }
    }

    getWords(data) {
        const wordsAmount = data.length - 2;
        const words = [];

        while (words.length < wordsAmount) {
            const randomIndex = Math.floor(Math.random() * (wordsAmount - 0 + 1));
            const randomWord = data[randomIndex];
            if (randomWord.length > 5) {
                words.push(randomWord.toLowerCase());
            }
        }
        this.wordsAmount = words.length;

        return words;
    }

    getRandomWord = () => {
        const { words } = this.state;
        const randomIndex = Math.floor(Math.random() * this.wordsAmount);
        const newWord = words[randomIndex];

        const wordArray = newWord.split('').map(letter => ({ letter, complete: false }));

        this.setState({
            wordArray,
        });
    };

    resetWord = missedIndex => {
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
        const { changeScore } = this.props;

        this.getRandomWord();
        if (!this.withTime) {
            this.stopGame();
            this.changeImmediately(50);
        }
        changeScore();
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
            this.timerId = setInterval(this.changeHealth, parseInt(this.transitionDuration, 10));
        }, 0);
    }

    startGame = () => {
        const { changeScore } = this.props;
        const { texts } = this.state;

        changeScore(0);
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
        const { score } = this.props;

        this.stopGame();
        this.setState({
            texts: {
                gameMessage: `Вы проиграли, угадано слов - ${score}!`,
                buttonText: 'Играть еще',
            },
            started: false,
        });
    }

    componentWillUnmount() {
        this.stopGame();
    }

    render() {
        const { health, difficulty, changeView, score, loading, ...props } = this.props;
        const {
            started,
            wordArray,
            transitionDuration,
            texts: { buttonText, gameMessage },
            increasing,
        } = this.state;

        const innerStyles = {
            width: `${health}%`,
            transitionDuration,
        };

        const scoreClassName = cx('score', {
            score__increated: increasing,
        });

        if (loading) return <Loader />;

        return (
            <div className={styles.row}>
                {!started && (
                    <div className={styles.col}>
                        {gameMessage && (
                            <>
                                <div className={styles.message}>{gameMessage}</div>
                                <Button type={Button.Types.default} text="В главное меню" onClick={() => changeView('menu')} />
                                <br />
                                <br />
                            </>
                        )}
                        <Button type={Button.Types.default} text={buttonText} onClick={this.startGame} />
                    </div>
                )}
                {started && (
                    <>
                        <div className={styles.col}>
                            <div className={scoreClassName}>
                                Счет: <div className={styles.scoreInner}>{score}</div>
                            </div>
                        </div>
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
    gameType: PropTypes.oneOf(Object.keys(GameView.gameTypes)),
    difficulty: PropTypes.oneOf(Object.keys(GameView.gameDifficulties)),
    health: PropTypes.number,
    score: PropTypes.number,
    changeHealth: PropTypes.func,
    changeView: PropTypes.func,
    changeScore: PropTypes.func,
    setLoading: PropTypes.func,
    unsetLoading: PropTypes.func,
    loading: PropTypes.bool,
};

GameView.defaultProps = {
    gameType: 'survival',
    difficulty: 'normal',
};

const mapStateToProps = ({ game }) => ({
    ...game,
});

const mapDispatchToProps = {
    changeHealth,
    changeView,
    changeScore,
    setLoading,
    unsetLoading,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
