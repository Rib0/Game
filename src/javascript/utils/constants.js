import GameView from 'components/Views/GameView';
import MenuView from 'components/Views/MenuView';

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
        valueName: 'gameType',
        options: [],
    },
    'menu/Game': {
        component: GameView,
    },
};
