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

    onKeyDown = () => {};

    render() {
        return <div />;
    }
}

export default Word;
