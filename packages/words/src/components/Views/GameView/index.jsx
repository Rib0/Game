import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import {
    changeHealth,
    changeView,
    changeScore,
    setLoading,
    unsetLoading,
} from '@/store/actions';
import ProgressBar from '@/components/ProgressBar';
import Word from '@/components/Word';

import styles from './styles.css';

const Button = React.lazy(() => import('base/Button'))
const Loader = React.lazy(() => import('base/Loader'))

const cx = classNames.bind(styles);
const HEALTH_STEP = -25;

class GameView extends PureComponent {
    static gameTypes = {
        survival: 'survival',
        time: 'time',
    };

    static gameDifficulties = {
        easy: '2000ms',
        normal: '1500ms',
        hard: '1300ms',
    };

    constructor(props) {
        super(props);

        const { difficulty, gameType } = props;

        this.withTime = gameType === GameView.gameTypes.time;
        this.transitionDuration = !this.withTime ? difficulty : '15000ms';

        this.state = {
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
        import(/* webpackChunkName: 'jsonData' */ '@/data.json').then(data => {
            setTimeout(() => {
                const words = this.getWords(Object.values(data));

                this.setState({
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

    resetWord = () => {
        const { wordArray } = this.state;
        const [{ complete: firstWordComplete }] = wordArray;

        if (!firstWordComplete) return;

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
                gameMessage: `Вы проиграли, введено слов - ${score}!`,
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

        const scoreClassName = cx('score', {
            score__increated: increasing,
        });

        if (loading) return (
            <Suspense fallback="Loading Loader...">
                <Loader />
            </Suspense>
        );

        return (
            <div className={styles.row}>
                {!started && (
                    <div className={styles.col}>
                        {gameMessage && (
                            <>
                                <div className={styles.message}>{gameMessage}</div>
                                <Suspense fallback="Loading Button..."> { /* Компоненты из ModuleFederation обязательно оборачивать в Suspense */ }
                                    <Button
                                        type={"default"}
                                        text="В главное меню"
                                        onClick={() => changeView('menu')}
                                    />
                                </Suspense>
                                <br />
                                <br />
                            </>
                        )}
                        <Suspense fallback="Loading Button...">
                            <Button
                                type={"default"}
                                text={buttonText}
                                onClick={this.startGame}
                            />
                        </Suspense>
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
                                width={`${health}%`}
                                transitionDuration={transitionDuration}
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
    gameType: PropTypes.oneOf(Object.values(GameView.gameTypes)),
    difficulty: PropTypes.oneOf(Object.values(GameView.gameDifficulties)),
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
    gameType: GameView.gameTypes.survival,
    difficulty: GameView.gameDifficulties.normal,
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

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
