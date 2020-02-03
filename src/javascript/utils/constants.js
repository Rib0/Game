import GameView from 'components/Views/GameView';
import MenuView from 'components/Views/MenuView';

export const VIEWS = {
    menu: {
        component: MenuView,
        props: {
            options: [
                {
                    value: 'menu/Game',
                    label: 'Начать игру',
                    actionName: 'changeView',
                },
                {
                    value: 'menu/difficulty',
                    label: 'Сложность',
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
                    value: GameView.gameDifficulties.easy,
                    label: 'Легко',
                    actionName: 'changeDifficulty',
                },
                {
                    value: GameView.gameDifficulties.normal,
                    label: 'Средне',
                    actionName: 'changeDifficulty',
                },
                {
                    value: GameView.gameDifficulties.hard,
                    label: 'Сложно',
                    actionName: 'changeDifficulty',
                },
                {
                    value: 'menu',
                    label: '<',
                    actionName: 'changeView',
                    type: 'back',
                },
            ],
        },
    },
    'menu/gameType': {
        component: MenuView,
        valueName: 'gameType',
        options: [],
    },
    'menu/Game': {
        component: GameView,
    },
};
