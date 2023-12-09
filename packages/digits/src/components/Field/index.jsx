import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MainView from '@/components/MainView';
import styles from './styles.css';

export class Field extends PureComponent {
    static Cell({ children, style, onClick, data }) {
        return (
            <div className={styles.cell} onClick={onClick} style={style} {...data}>
                {children}
            </div>
        );
    }

    getCellStyles = index => {
        const { loading } = this.props;
        const sideSize = MainView.SideSize.length;
        const leftMulti = index % sideSize;
        const topMulti = parseInt(index / sideSize, 10);

        return {
            top: loading ? 0 : `${topMulti * MainView.CellSize}px`,
            left: loading ? 0 : `${leftMulti * MainView.CellSize}px`,
            opacity: index < sideSize ** 2 - 1 && loading ? 0 : 1,
        };
    };

    render() {
        const { field, onClick } = this.props;

        return (
            <div className={styles.field}>
                {field.map(({ value, order }) => {
                    const style = {
                        ...this.getCellStyles(order),
                        backgroundColor: value - order === 1 && 'lightgreen',
                    };

                    return (
                        <Field.Cell
                            style={style}
                            onClick={onClick}
                            data={{
                                'data-index': order,
                            }}
                            key={value}
                        >
                            <div className={styles.value}>{value}</div>
                        </Field.Cell>
                    );
                })}
            </div>
        );
    }
}

Field.propTypes = {
    field: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        order: PropTypes.string,
    })),
    onClick: PropTypes.func,
    loading: PropTypes.bool,
};