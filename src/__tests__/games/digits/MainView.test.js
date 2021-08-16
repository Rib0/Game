import React from 'react';
import MainView from 'games/digits/components/MainView';

const setUp = () => shallow(<MainView />);

describe('Digits game - MainView test', () => {
    test('MainView should render', () => {
        const Component = setUp();
        expect(Component).toMatchSnapshot();
    });
    test('MainView should render Modal if player wins', () => {
        const Component = setUp();
        Component.setState({ hasWin: true });
        expect(Component.find('Modal')).toHaveLength(1);
    });
});
