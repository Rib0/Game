import React from 'react';
import Button from 'base/Button';

const setUp = props => shallow(<Button {...props} />);

describe('Button test', () => {
    test('Button should render', () => {
        const props = {
            type: Button.Types.styled,
            size: Button.Sizes.large,
            icon: 'bars',
            className: 'className',
        };
        const Component = setUp(props);

        expect(Component).toMatchSnapshot();
    })
})