import { lazy } from 'react';

import WordsStore from 'WordsGame/store';
import WordsBg from 'Images/bg.png';

export const COMPONENTS = [
    {
        name: 'Слова',
        description:
            'В этой игре вы сможете развить скорость набора слов на клавиатуре. Есть несколько режимов игры, понятный интерфейс и достаточно большая база сложных слов. Также может помочь в развитии словарного запаса.',
        component: lazy(() => import('WordsGame/components/Views/MainView')),
        store: WordsStore,
        bgImage: WordsBg,
    },
    {
        name: 'Пятнашки',
        description:
            'Старая добрая игра в пятнашки, достаточно проста в понимании, поможет провести время с пользой.',
        component: lazy(() => import('DigitsGame/components/MainView')),
    },
    {
        name: 'Шарики',
        description: 'Balls description.',
        component: lazy(() => import('BallsGame/components/MainView')),
    },
];
