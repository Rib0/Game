import React, { PureComponent } from 'react';

import styles from './styles.css';

class Field extends PureComponent {
    static Row({ children }) {
        return <div className={styles.row}>{children}</div>;
    }

    static Col({ children }) {
        return (
            <div className={styles.col} onClick={onClick}>
                {children}
            </div>
        );
    }

    render() {
        const { children } = this.props;

        return <div className={styles.field}>{children}</div>;
    }
}

export default Field;
