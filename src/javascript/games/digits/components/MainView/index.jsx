import React, { PureComponent } from 'react';

import { Button, Modal } from 'Base';
import Field from '../Field';

import styles from './styles.css';

class MainView extends PureComponent {
    static SideSize = new Array(4);
    static CellSize = 100;
    static defaultLoadTime = 500;

    state = {
        field: [],
        loading: false,
        hasWin: false,
    };

    componentDidUpdate(p, prevState) {
        const { prevField } = prevState;
        const { field, loading } = this.state;

        if (prevField !== field && !loading) {
            this.checkWin();
        }
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    loadCells() {
        const fieldsCount = MainView.SideSize.length ** 2;

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

    generateField = () => {
        const { loading } = this.state;
        if (loading) return;

        this.setState({ loading: true });
        setTimeout(() => {
            this.loadCells();
            setTimeout(() => this.setState({ loading: false }), 0);
        }, MainView.defaultLoadTime);
    };

    getCellStyles(index) {
        const { loading } = this.state;
        const sideSize = MainView.SideSize.length;
        const leftMulti = index % sideSize;
        const topMulti = parseInt(index / sideSize, 10);

        return {
            top: loading ? 0 : `${topMulti * MainView.CellSize}px`,
            left: loading ? 0 : `${leftMulti * MainView.CellSize}px`,
            opacity: index < sideSize ** 2 - 1 && loading ? 0 : 1,
        };
    }

    findEmptyCell(index) {
        const { field } = this.state;
        const fieldsCount = MainView.SideSize.length ** 2;

        const emptyCell = Array.from(new Array(fieldsCount).keys()).find(
            value => !field.map(({ order }) => order).includes(value)
        );
        const emptyCellIndex = [index - 1, index + 1, index - 4, index + 4].find(
            index => index === emptyCell
        );

        return emptyCellIndex;
    }

    // makeWin = () => { for test only
    //     const { field } = this.state;

    //     this.setState({
    //         loading: true,
    //     });

    //     setTimeout(() => {
    //         const sortedField = field.map((v, index) => ({ value: index + 1, order: index }));
    //         this.setState({ field: sortedField });
    //         setTimeout(() => {
    //             this.setState({ loading: false });
    //         }, 0);
    //     }, MainView.defaultLoadTime);
    // };

    checkWin() {
        const { field } = this.state;
        const hasWin = field.every(({ value, order }, index) => value === order + 1);

        if (hasWin) {
            this.setState({
                hasWin,
            });
        }
    }

    onAcceptWin = () => {
        this.setState({ hasWin: false });

        this.generateField();
    };

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
        const { field, loading, hasWin } = this.state;

        return (
            <div className={styles.container}>
                <Button
                    size={Button.Sizes.large}
                    className={styles.button}
                    onClick={this.generateField}
                    disabled={loading}
                    text="Сгенерировать"
                />
                <Field>
                    {field.map(({ value, order }) => {
                        const style = {
                            ...this.getCellStyles(order),
                            backgroundColor: value - order === 1 && 'lightgreen',
                        };

                        return (
                            <Field.Cell
                                style={style}
                                onClick={this.onClick}
                                data={{
                                    'data-index': order,
                                }}
                                key={value}
                            >
                                <div className={styles.value}>{value}</div>
                            </Field.Cell>
                        );
                    })}
                </Field>
                <Modal
                    isOpen={hasWin}
                    caption="Вы выиграли!"
                    acceptButtonText="Начать заного"
                    onAccept={this.onAcceptWin}
                >
                    <Modal.Content>Игра окончена</Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default MainView;
