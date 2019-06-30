import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ActionTypes from 'action_types';

import {fetchVotedAnswers} from './vote';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('test', () => {
    const mockSuccessResponse = {};
    let store;

    beforeEach(() => {
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve(mockJsonPromise),
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        store = mockStore({});
    });

    it('success', async () => {
        const siteUrl = 'https://example.com:8065';
        const pollId = 'poll_id1';
        const expected = {
            type: ActionTypes.FETCH_VOTED_ANSWERS,
            data: mockSuccessResponse,
        }

        await store.dispatch(fetchVotedAnswers(siteUrl, pollId))
        //     .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expected)
        //     })
    });
    it('fail, pollId is undefined', () => {
        const siteUrl = 'https://example.com:8065';
        const pollId = undefined;

        return store.dispatch(fetchVotedAnswers(siteUrl, pollId))
            .then(() => {
                const actions = store.getActions();
                expect(actions.length).toEqual(0);
            })
    });
    it('fail, pollId is empty', () => {
        const siteUrl = 'https://example.com:8065';
        const pollId = '';

        return store.dispatch(fetchVotedAnswers(siteUrl, pollId))
            .then(() => {
                const actions = store.getActions();
                expect(actions.length).toEqual(0);
            })
    });
})