import React from 'react';
import ProgressBar from 'games/words/components/ProgressBar';

const setUp = props => mount(<ProgressBar {...props} />);

describe('Words game - ProgressBar test', () => {
    let Component, instance, componentDidMount, componentWillUnmount;
    const props = {
        width: '10%',
        transitionDuration: '100ms',
    };

    beforeEach(() => {
        Component = setUp(props);
        instance = Component.instance();
        componentDidMount = jest.spyOn(ProgressBar.prototype, 'componentDidMount');
        componentWillUnmount = jest.spyOn(ProgressBar.prototype, 'componentWillUnmount');
    });
    afterEach(() => {
        componentDidMount.mockRestore();
        componentWillUnmount.mockRestore();
    });

    test('should render', () => {
        expect(Component).toMatchSnapshot();
    });
    test('should have ref', () => {
        const ref = instance.progress;
        expect(ref).toBeTruthy();
    });
    test('should contain 2 divs', () => {
        const divs = Component.find('div');
        expect(divs).toHaveLength(2);
    });
    test('AddEventListener should called once', () => {
        const ref = instance.progress;
        const addEventListener = jest.spyOn(ref, 'addEventListener');
        instance.componentDidMount();
        expect(addEventListener).toHaveBeenCalledTimes(1);
    });
    test('RemoveEventListener should called once', () => {
        const ref = instance.progress;
        const removeEventListener = jest.spyOn(ref, 'removeEventListener');
        Component.unmount();
        expect(removeEventListener).toHaveBeenCalledTimes(1);
    });
    test('ComponentDidMount should called once', () => {
        instance.componentDidMount();
        expect(componentDidMount).toHaveBeenCalledTimes(1);
    });
    test('componentWillUnmount should called once', () => {
        Component.unmount();
        expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    });
});
