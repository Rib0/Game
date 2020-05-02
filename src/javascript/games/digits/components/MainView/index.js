import React, { PureComponent } from 'react';

import Field from '../Field';

import styles from './styles.css';

class MainView extends PureComponent {
    static SideSize = new Array(4);

    static CellSize = 100;

    state = {
        field: {},
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
        const field = {};

        for (const value of new Array(fieldsCount).keys()) {
            if (!value) {
                field[value] = undefined;
                continue;
            }

            let randomValue = this.getRandom(1, fieldsCount);
            while (Object.values(field).includes(randomValue)) {
                randomValue = this.getRandom(1, fieldsCount);
            }
            field[value] = randomValue;
        }
        this.setState({
            field,
        });
    }

    getCellStyles(index) {
        const { loading } = this.state;

        if (!index) return {};

        const SideSize = MainView.SideSize.length;
        const leftMulti = index % SideSize;
        const topMulti = parseInt(index / SideSize);

        return {
            top: loading ? 0 : `${topMulti * MainView.CellSize  }px`,
            left: loading ? 0 : `${leftMulti * MainView.CellSize  }px`,
            opacity: index < Math.pow(SideSize, 2) - 1 && loading ? '0' : '1',
            transitionDuration: `${0.4 + leftMulti / 15 + topMulti / 15}s`,
        };
    }

    onClick = () => {};

    render() {
        const { field } = this.state;

        return (
            <>
                <button onClick={this.generateField}>Сгенерировать</button>
                <Field>
                    {Object.values(field).map((value, index) => (
                        <Field.Cell style={this.getCellStyles(index)} key={index}>
                            <div className={styles.value} onClick={value ? this.onClick : () => {}}>
                                {value}
                            </div>
                        </Field.Cell>
                    ))}
                </Field>
            </>
        );
    }
}

export default MainView;
