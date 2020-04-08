import React, { PureComponent } from 'react';

import Field from './Field';

class MainView extends PureComponent {
    state = {
        field: [[], [], [], []],
    };

    findEmptyField(fields) {
        const { fields } = this.state;

        const [row, col] = fields.split('-');
        for (let i = row - 1; i <= col + 1; col++) {
            for (let j = col - 1; j <= row + 1; row++) {
                const value = fields[i][j];
                if (typeof value === 'undefined') continue;
                if (!value) return true;
            }
        }
        return false;
    }

    onClick = e => {
        const {
            dataset: { fields },
        } = e.target;
        const hasEmptyField = this.findEmptyField(fields);
    };

    render() {
        const { field } = this.state;

        return (
            <div>
                <Field>
                    {field.map((cols, rIndex) => (
                        <Field.Row>
                            {cols.map((value, cIndex) => (
                                <Field.Col>
                                    <div
                                        data-fields={`${rIndex}-${cIndex}`}
                                        onClick={onClick}
                                        className={styles.value}
                                    >
                                        {value}
                                    </div>
                                </Field.Col>
                            ))}
                        </Field.Row>
                    ))}
                </Field>
            </div>
        );
    }
}

export default MainView;
