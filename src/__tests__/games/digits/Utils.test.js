import { getRandom } from 'games/digits/utils';

describe('Utils test', () => {
    test('getRandom function should return number', () => {
        const result = getRandom(1, 10);
        expect(typeof result).toBe('number');
    });
});
