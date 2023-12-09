import React, { PureComponent } from 'react';

import { Field } from '@/components/Field';

import { getRandom } from '@/utils';

import styles from './styles.css';

/* eslint-disable import/no-unresolved */
const Button = React.lazy(() => import('base/Button'));
const Modal = React.lazy(() => import('base/Modal'));
/* eslint-enable import/no-unresolved */

export default class MainView extends PureComponent {
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

    loadCells() {
        const fieldsCount = MainView.SideSize.length ** 2;

        const field = new Array(fieldsCount - 1).fill(1).reduce((acc, v, index) => {
            let randomValue = getRandom(1, fieldsCount);
            /* eslint-disable no-loop-func */
            while (acc.find(({ value }) => value === randomValue)) {
                randomValue = getRandom(1, fieldsCount);
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

    findEmptyCell(index) {
        const { field } = this.state;
        const fieldsCount = MainView.SideSize.length ** 2;

        const emptyCell = Array.from(new Array(fieldsCount).keys()).find(
            value => !field.map(({ order }) => order).includes(value)
        );
        const emptyCellIndex = [index - 1, index + 1, index - 4, index + 4].find(
            i => i === emptyCell
        );

        return emptyCellIndex;
    }

    checkWin() {
        const { field } = this.state;
        const hasWin = field.every(({ value, order }) => value === order + 1);

        if (hasWin) {
            this.setState({
                hasWin,
            });
        }
    }

    onAcceptWin = () => {
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
                <React.Suspense fallback="Loading Button...">
                    <Button
                        size="large"
                        type="styled"
                        className={styles.button}
                        onClick={this.generateField}
                        disabled={loading}
                        text="Сгенерировать"
                    />
                </React.Suspense>
                <Field field={field} onClick={this.onClick} loading={loading} />
                <React.Suspense fallback="Loading Modal...">
                    <Modal
                        isOpen={hasWin}
                        caption="Вы выиграли!"
                        acceptButtonText="Начать заного"
                        onAccept={this.onAcceptWin}
                    >
                        Игра окончена
                    </Modal>
                </React.Suspense>
            </div>
        );
    }
}
