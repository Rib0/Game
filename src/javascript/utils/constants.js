import GameView from 'components/Views/GameView';
import MenuView from 'components/Views/MenuView';
import data from 'data.json';

const getWords = () => {
    const wordsAmount = data.length - 1;
    const words = [];

    while (words.length < 100) {
        const randomIndex = Math.floor(Math.random() * (wordsAmount - 0 + 1));
        const randomWord = data[randomIndex];
        if (randomWord.length > 5) {
            words.push(randomWord.toLowerCase());
        }
    }

    return words;
};

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
        props: {
            words: getWords(),
        },
    },
};
