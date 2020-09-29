import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from '../types';
import { createBrowserHistory } from 'history';

const initialState = {
    loading: false,
    errors: null,
    history: createBrowserHistory()
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        default:
            return state;
    }
}