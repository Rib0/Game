import React, { PureComponent } from 'react';

class Word extends PureComponent {
    state = {
        word: [
            {
                letter: '',
                complete: false,
            },
        ],
    };

    componentDidUpdate() {
        const { word } = this.props;
        const stateWord = word.split('').map(letter => ({ letter, complete: false }));

        this.setState({
            word: stateWord,
        });
    }

    onKeyDown = () => {};

    render() {
        const { word } = this.state;

        return <div />;
    }
}

export default Word;
