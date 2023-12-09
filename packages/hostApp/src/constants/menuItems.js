import { lazy } from 'react';

import WordsBg from '../../images/bg.png';

const wordsMain = lazy(() => import('words/Main'));
const digitsMain = lazy(() => import('digits/Main'));
const ballsMain = lazy(() => import('balls/Main'));

export const COMPONENTS = [
    {
        name: 'Слова',
        description:
            'В этой игре вы сможете развить скорость набора слов на клавиатуре. Есть несколько режимов игры, понятный интерфейс и достаточно большая база сложных слов. Также может помочь в развитии словарного запаса.',
        component: wordsMain,
        bgImage: WordsBg,
    },
    {
        name: 'Пятнашки',
        description:
            'Старая добрая игра в пятнашки, достаточно проста в понимании, поможет провести время с пользой.',
        component: digitsMain,
    },
    {
        name: 'Шарики',
        description: 'Balls description.',
        component: ballsMain,
    },
];
