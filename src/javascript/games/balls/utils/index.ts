export const getRandom = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const splitArray = (array: any[], chunkLength: number): any[] => {
    const chunksArray = [];
    let chunk = [];

    array.forEach((v, i) => {
        chunk.push(v);

        if ((i + 1) % chunkLength === 0 || i === array.length - 1) {
            chunksArray.push(chunk);
            chunk = [];
        }
    });

    return chunksArray;
};
