import React from 'react';
import MainView from 'games/digits/components/MainView';

jest.useFakeTimers();
const setUp = () => shallow(<MainView />);

describe('Digits game - MainView test', () => {
    let Component, instance;

    beforeEach(() => {
        Component = setUp();
        instance = Component.instance();
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    test('Should render', () => {
        expect(Component).toMatchSnapshot();
    });
    test('LoadCells method should generate field array', () => {
        instance.loadCells();
        expect(Component.state().field).toHaveLength(15);
    });
    test('GenerateField method should generate field array', () => {
        jest.useFakeTimers('legacy');
        expect(Component.state().loading).toBeFalsy();
        instance.generateField();
        expect(Component.state().loading).toBeTruthy();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(Component.state().loading).toBeFalsy();
        expect(Component.state().field).toHaveLength(15);
    });
    test('GenerateField method should not generate field array', () => {
        const generateField = jest.spyOn(instance, 'generateField');
        instance.setState({ loading: true });
        instance.generateField();
        expect(generateField).toHaveReturned();
        generateField.mockRestore();
    });
    test('Should find empty cell', () => {
        instance.loadCells();
        const {
            field: [{ order: firstFieldOrder }],
        } = Component.state();
        const emptyCellIndex = instance.findEmptyCell(firstFieldOrder);
        expect(emptyCellIndex).toBe(0);
    });
    test('Should accept win', () => {
        const generateField = jest.spyOn(instance, 'generateField');
        instance.onAcceptWin();
        expect(Component.state().hasWin).toBeFalsy();
        expect(generateField).toHaveBeenCalledTimes(1);
        generateField.mockRestore();
    });
    test('Should change cell order if clicked', () => {
        instance.loadCells();
        instance.onClick({ currentTarget: { dataset: { index: '1' } } });
        const [{ order: firstCellOrder }] = Component.state().field;
        expect(firstCellOrder).toBe(0);
    });
    test('Should not change cell order if clicked', () => {
        instance.loadCells();
        instance.onClick({ currentTarget: { dataset: { index: '2' } } });
        const [{ order: firstCellOrder }] = Component.state().field;
        expect(firstCellOrder).toBe(1);
    });
    test('Should render Modal if player wins', () => {
        instance.setState({ hasWin: true });
        expect(Component.find('Modal')).toHaveLength(1);
    });
});
