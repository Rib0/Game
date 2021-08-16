import React from 'react';
import Field from 'games/digits/components/Field';

const setUp = props => shallow(<Field {...props} />);

describe('Digits game - Field test', () => {
    const props = {
        field: [
            { value: 2, order: 1 },
            { value: 6, order: 2 },
            { value: 3, order: 3 },
            ,
            { value: 4, order: 4 },
            { value: 5, order: 5 },
        ],
        loading: false,
        onClick: jest.fn(),
    };

    test('Field should render', () => {
        const Component = setUp(props);
        expect(Component).toMatchSnapshot();
    });
    test('Field should have 5 cells', () => {
        const Component = setUp(props);
        expect(Component.find('Cell')).toHaveLength(5);
    });
    test('Callback should call if field clicked', () => {
        const Component = setUp(props);
        const cell = Component.find('Cell').first();
        cell.simulate('click');
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
    test('Field static method Cell should render', () => {
        const Component = shallow(
            <Field.Cell>
                <div />
                <div />
            </Field.Cell>
        );
        const cells = Component.find('div');
        expect(cells).toHaveLength(3);
    });
    test('Cells should be in the corner if loading is true', () => {
        const newProps = {
            ...props,
            loading: true,
        };

        const Component = setUp(newProps).instance();
        const resultStyles = Component.getCellStyles(2);
        expect(resultStyles).toEqual({
            top: 0,
            left: 0,
            opacity: 0,
        });
    });
    test('Cell in right order should have lightgreen color', () => {
        const Component = setUp(props);
        const cell = Component.find('Cell').first();
        expect(cell.prop('style')).toEqual({
            ...Component.instance().getCellStyles(props.field[0].order),
            backgroundColor: 'lightgreen',
        });
    });
});
