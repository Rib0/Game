import React from 'react';
import Button from 'base/Button';

const setUp = props => shallow(<Button {...props} />);

describe('Button test', () => {
    const props = {
        type: Button.Types.styled,
        size: Button.Sizes.large,
        iconType: 'bars',
        className: 'customClassName',
    };

    test('Button should render', () => {
        const Component = setUp(props);
        expect(Component).toMatchSnapshot();
    });
    test('Button should render icon', () => {
        const Component = setUp(props);
        expect(Component.find('Icon')).toHaveLength(1);
    });
    test('Button should render text', () => {
        const newProps = {
            ...props,
            iconType: undefined,
            text: 'some text',
        };

        const Component = setUp(newProps);
        expect(Component.text()).toBe('some text');
    });
    test('Button should have custom className', () => {
        const Component = setUp(props);
        expect(Component.hasClass('customClassName')).toBeTruthy();
    });
    test('Button should throw other props', () => {
        const newProps = {
            ...props,
            ariaHidden: true,
        };

        const Component = setUp(newProps);
        expect(Component.prop('ariaHidden')).toBeTruthy();
    });
});
