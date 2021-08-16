import React from 'react';
import Icon from 'base/Icon';

const setUp = props => shallow(<Icon {...props} />);

describe('Icon test', () => {
    const props = {
        type: Icon.IconTypes.faBars,
        size: Icon.IconSizes.large,
        className: 'customClassName',
    };

    test('Icon should render', () => {
        const Component = setUp(props);
        expect(Component).toMatchSnapshot();
    });
    test('Icon should throw type prop', () => {
        const Component = setUp(props);
        expect(Component.find('FontAwesomeIcon').prop('icon')).toBe(Icon.IconTypes.faBars);
    });
    test('Icon should throw size prop', () => {
        const Component = setUp(props);
        expect(Component.find('FontAwesomeIcon').prop('size')).toBe(Icon.IconSizes.large);
    });
});
