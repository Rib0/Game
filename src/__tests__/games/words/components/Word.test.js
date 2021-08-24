import React from 'react';
import Word from 'games/words/components/Word';

const setUp = props => shallow(<Word {...props} />);

describe('Words game - Word test', () => {
    let Component, instance, componentDidMount, componentWillUnmount;
    const props = {
        wordArray: [
            {
                letter: 'с',
                complete: false,
                missed: false
            },
            {
                letter: 'ы',
                complete: false,
                missed: false
            },
            {
                letter: 'р',
                complete: false,
                missed: false
            }
        ],
        getRightWord: jest.fn(),
        getRightLetter: jest.fn(),
        resetWord: jest.fn()
    };

    beforeEach(() => {
        Component = setUp(props);
        instance = Component.instance();
        componentDidMount = jest.spyOn(Word.prototype, 'componentDidMount');
        componentWillUnmount = jest.spyOn(Word.prototype, 'componentWillUnmount');
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
        props.getRightWord.mockClear();
        props.getRightLetter.mockClear();
        props.resetWord.mockClear();
        componentDidMount.mockClear();
        componentWillUnmount.mockClear();
    });

    test('should render', () => {
        expect(Component).toMatchSnapshot();
    })
    test('AddEventListener should called once', () => {
        const addEventListener = jest.spyOn(document.body, 'addEventListener');
        instance.componentDidMount();
        expect(addEventListener).toHaveBeenCalledTimes(1);
    })
    test('RemoveEventListener should called once', () => {
        const removeEventListener = jest.spyOn(document.body, 'removeEventListener');
        Component.unmount();
        expect(removeEventListener).toHaveBeenCalledTimes(1);
    })
    test('ComponentDidMount should called once', () => {
        instance.componentDidMount();
        expect(componentDidMount).toHaveBeenCalledTimes(1);
    })
    test('componentWillUnmount should called once', () => {
        Component.unmount();
        expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    })
    test('resetTransition should change transitionDuration', () => {
        jest.useFakeTimers('legacy');
        expect(Component.state().transitionDuration).toBe('.2s');
        instance.resetTransition();
        expect(Component.state().transitionDuration).toBe('0s');
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(Component.state().transitionDuration).toBe('.2s');
    })
    test('complete word should trigger 2 methods', () => {
        const newProps = {
            ...props,
            wordArray: props.wordArray.map(word => ({ ...word, complete: true }))
        };
        const resetTransition = jest.spyOn(instance, 'resetTransition');
        Component.setProps(newProps);
        expect(newProps.getRightWord).toHaveBeenCalledTimes(1);
        expect(resetTransition).toHaveBeenCalledTimes(1);
    })
    test('should find index of missed letter', () => {
        jest.useFakeTimers('legacy');
        expect(Component.state().missedIndex).toBeNull();
        instance.handleMiss();
        expect(Component.state().missedIndex).toBe(0);
        jest.runAllTimers();
        expect(Component.state().missedIndex).toBeNull();
    })
    test('should handle keydown with right letter', () => {
        instance.onKeyDown({ key: 'с' });
        expect(props.getRightLetter).toHaveBeenCalledTimes(1)
    })
    test('should handle keydown with wrong letter', () => {
        const handleMiss = jest.spyOn(instance, 'handleMiss');
        const resetTransition = jest.spyOn(instance, 'resetTransition');
        instance.onKeyDown({ key: 'a' });
        expect(handleMiss).toHaveBeenCalledTimes(1);
        expect(props.resetWord).toHaveBeenCalledTimes(1);
        expect(resetTransition).toHaveBeenCalledTimes(1);
    })
})