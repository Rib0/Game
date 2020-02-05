import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeHealth, changeWord } from 'store/actions';
import ProgressBar from 'components/ProgressBar';
import Word from 'components/Word';
import data from 'dict.json';

const WORDS_AMOUNT = 3000;
const HEALTH_STEP = -25;

class GameView extends PureComponent {
    static gameTypes = {};

    static gameDifficulties = {
        easy: '700ms',
        normal: '500ms',
        hard: '300ms',
    };

    constructor(props) {
        super(props);
        this.state = {
            started: false,
        }

        this.words = data.slice(0, WORDS_AMOUNT);
    }

    getRandomWord = () => {
        const { changeWord } = this.props;
        const randomValue = Math.floor(Math.random() * (WORDS_AMOUNT - 0 + 1)) + 0;
        const currentWord = data[randomValue];

        changeWord(currentWord);
    }

    changeHealth = (diff = HEALTH_STEP) => {
        const { changeHealth, health } = this.props;

        let newHealth = health + diff;

        newHealth = newHealth > 100 ? 100 : newHealth < 0 ? 0 : newHealth;
        changeHealth(newHealth);
    }

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
    }

    stopGame = () => {
        clearInterval(this.timerId)
    }

    componentWillUnmount() {
        this.stopGame();
    }

    render() {
        const { health, difficulty, ...props } = this.props;

        const innerStyles = {
            width: `${health}%`,
            transitionDuration: GameView.gameDifficulties[difficulty]
        }

        return (
            <div>
                <button onClick={this.startGame}>qwe</button>
                <ProgressBar innerStyles={innerStyles} changeHealth={changeHealth} handleTransitionEnd={this.handleTransitionEnd} />
                <Word {...props} />
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
    difficulty: 'normal'
}

const mapStateToProps = ({ game }) => ({
    ...game,
});

const mapDispatchToProps = {
    changeHealth,
    changeWord
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
