import reducer, { initialState } from 'games/words/store/reducers/game';
import * as actions from 'games/words/store/actions';

describe('Words game - game reducer test', () => {
    test('should change game type', () => {
        const action = actions.changeGameType('newGameType');
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
            gameType: 'newGameType',
        });
    });

    test('should change game difficulty', () => {
        const action = actions.changeDifficulty('newDifficulty');
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
            difficulty: 'newDifficulty',
        });
    });

    test('should change health', () => {
        const action = actions.changeHealth(20);
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
            health: 20,
        });
    });

    test('should change score', () => {
        const action = actions.changeScore(30);
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
            score: 30,
        });
    });

    test('should drop store', () => {
        const action = actions.dropStore();
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
        });
    });

    test('should drop store', () => {
        const action = actions.dropStore();
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
        });
    });

    test('should start loading', () => {
        const action = actions.setLoading();
        const resultState = reducer(initialState, action);

        expect(resultState).toEqual({
            ...initialState,
            loading: true,
        });
    });

    test('should end loading', () => {
        const action = actions.unsetLoading();
        const resultState = reducer({ ...initialState, loading: true }, action);

        expect(resultState).toEqual({
            ...initialState,
            loading: false,
        });
    });
});
