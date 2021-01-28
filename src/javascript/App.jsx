import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import classNames from 'classnames/bind';

import { COMPONENTS } from './menuItems';

import { Icon, Button } from 'Base';

import styles from './styles.css';

const cx = classNames.bind(styles);

class App extends PureComponent {
    state = {
        isMenuOpen: false,
        isStarted: false,
        active: -1,
    };

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
        this.handleToggleMenu();
    };

    handleToggleMenu = () => this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));

    handleStart = () => this.setState({ isStarted: true });

    renderMainMenu() {
        const { active } = this.state;
        const { bgImage } = COMPONENTS[active] || {};

        return (
            <div className={styles.container}>
                <div className={styles.col}>
                    {COMPONENTS.map(({ name }, index) => (
                        <div
                            key={index}
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
        const { active, isStarted, isMenuOpen } = this.state;
        const { component: Component, store } = COMPONENTS[active] || {};

        return (
            <>
                <div className={styles.header}>
                    <Icon
                        rotated={isMenuOpen}
                        onClick={this.handleToggleMenu}
                        type={Icon.IconTypes.faBars}
                        size={Icon.IconSizes.large}
                    />
                </div>
                <ul className={cx('menu', { active: isMenuOpen })}>
                    <li className={styles.menuItem} onClick={this.handleChangeBack}>
                        Вернуться к списку игр
                    </li>{' '}
                </ul>
                {isStarted ? (
                    store ? (
                        <Provider store={store}>
                            <Component />
                        </Provider>
                    ) : (
                        <Component />
                    )
                ) : (
                    this.renderMainMenu()
                )}
            </>
        );
    }
}

export default hot(App);
