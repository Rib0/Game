import React from 'react';
import Loader from 'base/Loader';

const setUp = () => shallow(<Loader />);

describe('Loader test', () => {
    test('Loader should render', () => {
        const Component = setUp();
        expect(Component).toMatchSnapshot();
    });
    test('Loader should have 2 divs', () => {
        const Component = setUp();
        expect(Component.find('div')).toHaveLength(2);
    });
});
