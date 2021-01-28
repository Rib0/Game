import GameView from 'WordsGame/components/Views/GameView';
import MenuView from 'WordsGame/components/Views/MenuView';

export const VIEWS = {
    menu: {
        component: MenuView,
        props: {
            options: [
                {
                    label: 'Начать игру',
                    value: 'menu/Game',
                    actionName: 'changeView',
                },
                {
                    label: 'Сложность',
                    value: 'menu/difficulty',
                    actionName: 'changeView',
                    tooltipText: 'Сложность меняется только в режиме "Выживание"',
                },
                {
                    label: 'Тип игры',
                    value: 'menu/gameType',
                    actionName: 'changeView',
                },
            ],
        },
    },
    'menu/difficulty': {
        component: MenuView,
        props: {
            valueName: 'difficulty',
            options: [
                {
                    label: 'Легко',
                    value: 'easy',
                    actionName: 'changeDifficulty',
                },
                {
                    label: 'Средне',
                    value: 'normal',
                    actionName: 'changeDifficulty',
                },
                {
                    label: 'Сложно',
                    value: 'hard',
                    actionName: 'changeDifficulty',
                },
                {
                    label: '<',
                    value: 'menu',
                    actionName: 'changeView',
                    type: 'back',
                },
            ],
        },
    },
    'menu/gameType': {
        component: MenuView,
        props: {
            valueName: 'gameType',
            options: [
                {
                    label: 'Выживание',
                    value: 'survival',
                    actionName: 'changeGameType',
                },
                {
                    label: 'На время (1 минута)',
                    value: 'time',
                    actionName: 'changeGameType',
                },
                {
                    label: '<',
                    value: 'menu',
                    actionName: 'changeView',
                    type: 'back',
                },
            ],
        },
    },
    'menu/Game': {
        component: GameView,
    },
};
