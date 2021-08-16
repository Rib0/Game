import React from 'react';
import Modal from 'base/Modal';

const setUp = props => mount(<Modal {...props} />);

describe('Modal test', () => {
    const props = {
        caption: 'some caption',
        isOpen: true,
        onAccept: jest.fn(),
        acceptButtonText: 'Ok',
    };

    test('Modal should render', () => {
        const Component = setUp(props);
        expect(Component).toMatchSnapshot();
    });
    test('Modal should render component', () => {
        const Component = setUp(props);
        expect(Component.find('Modal')).toHaveLength(1);
    });
    test('Modal should render null', () => {
        const newProps = {
            ...props,
            isOpen: false,
        };

        const Component = setUp(newProps);
        expect(Component.isEmptyRender()).toBeTruthy();
    });
    test('Modal should render caption', () => {
        const Component = setUp(props);
        expect(Component.find('div.caption').text()).toBe('some caption');
    });
    test('Modal should render custom accept button text', () => {
        const newProps = {
            ...props,
            acceptButtonText: undefined,
        };

        const Component = setUp(newProps);
        expect(Component.find('Button').prop('text')).toBe('Ок');
    });
    test('Modal should render button with text', () => {
        const Component = setUp(props);
        expect(Component.find('Button').text()).toBe('Ok');
    });
    test('onAccept callback should call if button pressed', () => {
        const Component = setUp(props);
        const button = Component.find('Button');
        button.simulate('click');
        expect(props.onAccept).toHaveBeenCalledTimes(1);
    });
    test('Modal static content method should render', () => {
        const Component = shallow(
            <Modal.Content>
                <div />
                <div />
            </Modal.Content>
        );
        const divs = Component.find('div');
        expect(divs).toHaveLength(3);
    });
});
