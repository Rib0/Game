import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchWord } from 'store/actions';
import ProgressBar from 'components/ProgressBar';
import Word from 'components/Word';

class GameView extends PureComponent {
    static gameTypes = {};

    static gameDifficulties = {
        easy: 'easy',
        normal: 'normal',
        hard: 'hard',
    };

    componentDidMount() {
        this.props.fetchWord()
    }

    render() {
        const { health, time, score, ...props } = this.props;

        return (
            <div>
                <ProgressBar health={health} time={time} />
                <Word {...props} />
            </div>
        );
    }
}

GameView.propTypes = {
    difficulty: PropTypes.oneOf(Object.values(GameView.gameDifficulties)),
    health: PropTypes.number,
    time: PropTypes.number,
    score: PropTypes.number,
    word: PropTypes.string,
};

const mapStateToProps = ({ game }) => ({
    ...game,
});

const mapDispatchToProps = {
    fetchWord
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
