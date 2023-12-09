import { hot } from 'react-hot-loader/root';
import React, { PureComponent, Suspense } from 'react';
import classNames from 'classnames/bind';

import { COMPONENTS } from '@/constants';

import styles from './styles.css';

const Button = React.lazy(() => import('base/Button'));

const cx = classNames.bind(styles);

class App extends PureComponent {
    state = {
        isStarted: false,
        active: -1,
    };

    componentDidMount() {
        window.backToMenu = this.handleChangeBack;
    }

    componentDidUpdate(p, prevState) {
        const { isStarted, active } = this.state;
        const { bgImage } = COMPONENTS[active] || {};

        if (isStarted !== prevState.isStarted) {
            if (isStarted) {
                document.body.style.background = `url(${bgImage}) 0% 20% no-repeat`;
                document.body.style.backgroundSize = 'cover';
            } else {
                document.body.style.background = '';
            }
        }
    }

    onChangeActive = e => {
        const {
            dataset: { active },
        } = e.target;
        this.setState({ active: Number(active) });
    };

    handleChangeBack = () => {
        this.setState({ active: -1, isStarted: false });
    };

    handleStart = () => this.setState({ isStarted: true });

    renderMainMenu() {
        const { active } = this.state;
        const { bgImage } = COMPONENTS[active] || {};

        return (
            <div className={styles.container}>
                <div className={styles.col}>
                    {COMPONENTS.map(({ name }, index) => (
                        <div
                            key={name}
                            className={cx('item', 'itemLeft', { selected: index === active })}
                            data-active={index}
                            onClick={this.onChangeActive}
                        >
                            {name}
                        </div>
                    ))}
                </div>
                <div className={styles.col} style={{ backgroundImage: `url(${bgImage})` }}>
                    {COMPONENTS.map(({ description }, index) => (
                        <div
                            key={description}
                            className={cx('item', 'itemRight', { visible: index === active })}
                        >
                            <div className={styles.text}>{description}</div>
                            <Suspense fallback="Loading Button...">
                                <Button
                                    text="Начать"
                                    onClick={this.handleStart}
                                    type="default"
                                />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const { active, isStarted } = this.state;
        const { component: Component, store } = COMPONENTS[active] || {};

        return (
            <div className={styles.app}>
                <div className={styles.header}>
                    <Suspense fallback="Loading Button...">
                        <Button
                            onClick={this.handleChangeBack}
                            iconType="home"
                            iconClassName={styles.homeIcon}
                        />
                    </Suspense>
                </div>
                {isStarted ? (
                    <Suspense fallback="Loading App...">
                        <Component />
                    </Suspense>
                ) : (
                    this.renderMainMenu()
                )}
            </div>
        );
    }
}

const hotApp = hot(App);

export { hotApp as App };
