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
                    value: 'easy',
                    label: 'Легко',
                    actionName: 'changeDifficulty',
                },
                {
                    value: 'normal',
                    label: 'Средне',
                    actionName: 'changeDifficulty',
                },
                {
                    value: 'hard',
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
