import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import classNames from 'classnames/bind';

import Words from 'games/words/components/Views/MainView';
import WordsStore from 'games/words/store';
import WordsBg from 'images/bg.png';
import Button from 'games/words/components/Button';

import Digits from 'games/digits/components/MainView';

import styles from './styles.css';

const cx = classNames.bind(styles);

const COMPONENTS = [
    {
        name: 'Слова',
        description:
            'В этой игре вы сможете развить скорость набора слов на клавиатуре. Есть несколько режимов игры, понятный интерфейс и достаточно большая база сложных слов. Также может помочь в развитии словарного запаса.',
        component: Words,
        store: WordsStore,
        bgImage: WordsBg,
    },
    {
        name: 'Пятнашки',
        description:
            'Старая добрая игра в пятнашки, достаточно проста в понимании, поможет провести время с пользой.',
        component: Digits,
    },
];

class App extends PureComponent {
    state = {
        started: false,
        active: -1,
    };

    componentDidUpdate(p, prevState) {
        const { started, active } = this.state;
        const { bgImage } = COMPONENTS[active] || {};

        if (started !== prevState.started) {
            if (started) {
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

    handleChangeBack = () => this.setState({ active: -1, started: false });

    handleStart = () => this.setState({ started: true });

    renderMainMenu() {
        const { active } = this.state;
        const { bgImage } = COMPONENTS[active] || {};

        return (
            <div className={styles.container}>
                <div className={styles.col}>
                    {COMPONENTS.map(({ name }, index) => (
                        <div
                            key={index}
                            className={cx('item', 'item--left', { selected: index === active })}
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
                            className={cx('item', 'item--right', { visible: index === active })}
                        >
                            {description}
                            <br />
                            <button onClick={this.handleStart} className={styles.button}>
                                Начать
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderBackButton() {
        return (
            <Button
                text="Список игр"
                onClick={this.handleChangeBack}
                className={styles.backButton}
            />
        );
    }

    render() {
        const { active, started } = this.state;
        const { component: Component, store } = COMPONENTS[active] || {};

        if (!started) return this.renderMainMenu();

        return store ? (
            <Provider store={store}>
                <>
                    {this.renderBackButton()}
                    <Component />
                </>
            </Provider>
        ) : (
            <>
                {this.renderBackButton()}
                <Component />
            </>
        );
    }
}

export default hot(App);
