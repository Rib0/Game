import React, { PureComponent } from 'react';

import styles from './styles.css';

class Field extends PureComponent {
    static Cell({ children, style, onClick, data }) {
        return (
            <div className={styles.cell} onClick={onClick} style={style} {...data}>
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
