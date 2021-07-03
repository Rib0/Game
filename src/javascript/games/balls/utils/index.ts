import { IBall } from '../components/MainView/types';

export const getRandom = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const splitArray = (array: any[], chunkLength: number, hasAdditionalItem: boolean): any[] => {
    const chunksArray = [];
    let chunk = [];

    array.forEach((v, i) => {
        chunk.push(v);

        if ((i + 1) % chunkLength === 0 || i === array.length - 1) {
            chunksArray.push(chunk);
            chunk = [];
        }
    });

    if (hasAdditionalItem) {
        const [lastItem] = chunksArray.slice(-1);
        chunksArray[chunksArray.length - 2] = chunksArray[chunksArray.length - 2].concat(lastItem);
        chunksArray.splice(chunksArray.length - 1, 1);
    }

    return chunksArray;
};

export const isFilledFlask = (balls: IBall[]): boolean => {
    if (balls.length === 4) {
        const [{ color: firstBallColor }] = balls;

        return balls.every(ball => ball.color === firstBallColor);
    }

    return false;
};
