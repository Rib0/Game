import GameView from '@/components/Views/GameView';
import MenuView from '@/components/Views/MenuView';

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
            storeKeyName: 'difficulty',
            options: [
                {
                    label: 'Легко',
                    value: GameView.gameDifficulties.easy,
                    actionName: 'changeDifficulty',
                },
                {
                    label: 'Средне',
                    value: GameView.gameDifficulties.normal,
                    actionName: 'changeDifficulty',
                },
                {
                    label: 'Сложно',
                    value: GameView.gameDifficulties.hard,
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
            storeKeyName: 'gameType',
            options: [
                {
                    label: 'Выживание',
                    value: GameView.gameTypes.survival,
                    actionName: 'changeGameType',
                },
                {
                    label: 'На время (1 минута)',
                    value: GameView.gameTypes.time,
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
