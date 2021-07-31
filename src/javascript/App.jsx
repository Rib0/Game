import { hot } from 'react-hot-loader/root';
import React, { PureComponent, Suspense } from 'react';
import { Provider } from 'react-redux';
import classNames from 'classnames/bind';

import { Icon, Button, Loader } from 'Base';
import { COMPONENTS } from './menuItems';

import styles from './styles.css';

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
                            <Button
                                text="Начать"
                                onClick={this.handleStart}
                                type={Button.Types.default}
                            />
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
                    <Button
                        onClick={this.handleChangeBack}
                        iconType={Icon.IconTypes.faHome}
                        iconClassName={styles.homeIcon}
                    />
                </div>
                {isStarted ? (
                    store ? (
                        <Provider store={store}>
                            <Suspense fallback={<Loader />}>
                                <Component />
                            </Suspense>
                        </Provider>
                    ) : (
                        <Suspense fallback={<Loader />}>
                            <Component />
                        </Suspense>
                    )
                ) : (
                    this.renderMainMenu()
                )}
            </div>
        );
    }
}

export default hot(App);
