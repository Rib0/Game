import GameView from 'components/Views/GameView';

export const VIEWS = {
    menu: {
        type: 'navigation',
        options: [
            {
                value: 'menu/difficulty',
                label: 'Сложность',
                actionName: 'changeView',
            },
            {
                value: 'menu/gameType',
                label: 'Тип игры',
                actionName: 'changeView',
            },
            {
                value: 'menu/Game',
                label: 'Начать игру',
                actionName: '',
            },
        ],
    },
    'menu/difficulty': {
        type: 'navigation',
        options: [
            {
                value: '',
                label: 'Сложно',
                actionName: 'changeDifficulty',
            },
            {
                value: '',
                label: 'Средне',
                actionName: 'changeDifficulty',
            },
            {
                value: '',
                label: 'Легко',
                actionName: 'changeDifficulty', // отдельный компонент с меню
            },
        ],
    },
    'menu/gameType': {
        type: 'navigation',
        options: [],
    },
    'menu/Game': {
        type: 'component',
        component: GameView, // name of the component отдельный компонент с игрой
    },
};
