import Words from 'WordsGame/components/Views/MainView';
import WordsStore from 'WordsGame/store';
import WordsBg from 'images/bg.png';

import Digits from 'DigitsGame/components/MainView';

import Balls from 'BallsGame/components/MainView';

export const COMPONENTS = [
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
    {
        name: 'Шарики',
        description: 'Balls description.',
        component: Balls,
    },
];