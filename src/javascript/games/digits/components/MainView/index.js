import React, { PureComponent } from 'react';

import Field from '../Field';

import styles from './styles.css';

class MainView extends PureComponent {
    static SideSize = new Array(4);

    static CellSize = 100;

    state = {
        field: [],
        loading: true,
    };

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    generateField = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.loadCells();
            setTimeout(() => this.setState({ loading: false }), 0);
        }, 1000);
    };

    loadCells() {
        const fieldsCount = Math.pow(MainView.SideSize.length, 2);

        const field = new Array(fieldsCount - 1).fill(1).reduce((acc, v, index) => {
            let randomValue = this.getRandom(1, fieldsCount);
            while (acc.find(({ value }) => value === randomValue)) {
                randomValue = this.getRandom(1, fieldsCount);
            }
            acc.push({
                value: randomValue,
                order: index + 1,
            });

            return acc;
        }, []);

        this.setState({
            field,
        });
    }

    getCellStyles(index) {
        const { loading } = this.state;
        const sideSize = MainView.SideSize.length;
        const leftMulti = index % sideSize;
        const topMulti = parseInt(index / sideSize);

        return {
            top: loading ? 0 : `${topMulti * MainView.CellSize}px`,
            left: loading ? 0 : `${leftMulti * MainView.CellSize}px`,
            opacity: index < Math.pow(sideSize, 2) - 1 && loading ? 0 : 1,
        };
    }

    findEmptyCell(index) {
        const { field } = this.state;
        const fieldsCount = Math.pow(MainView.SideSize.length, 2);

        const emptyCell = Array.from(new Array(fieldsCount).keys()).find(
            value => !field.map(({ order }) => order).includes(value)
        );
        const emptyCellIndex = [index - 1, index + 1, index - 4, index + 4].find(
            index => index === emptyCell
        );

        return emptyCellIndex;
    }

    onClick = e => {
        const {
            dataset: { index },
        } = e.currentTarget;
        const emptyIndex = this.findEmptyCell(Number(index));
        if (emptyIndex === undefined) return;

        const { field } = this.state;
        const newField = field.map(cell =>
            cell.order === Number(index) ? { ...cell, order: emptyIndex } : cell
        );

        this.setState({
            field: newField,
        });
    };

    render() {
        const { field } = this.state;

        return (
            <>
                <button onClick={this.generateField}>Сгенерировать</button>
                <Field>
                    {field.map(({ value, order }) => (
                        <Field.Cell
                            style={this.getCellStyles(order)}
                            onClick={this.onClick}
                            data={{
                                'data-index': order,
                            }}
                            key={value}
                        >
                            <div className={styles.value}>{value}</div>
                        </Field.Cell>
                    ))}
                </Field>
            </>
        );
    }
}

export default MainView;
