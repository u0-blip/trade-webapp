import {
    SET_SCREAMS,
    TGGL_LIKE_SCREAM,
    LOADING_DATA,
    SET_SCREAM,
    SUBMIT_COMMENT,
    UNSET_SCREAM,
} from '../types';

const initialState = {
    screams: [],
    scream: [],
    loading: false,
    comments: {},
    likes: {},
    search_res: {},
    searching: true,
    viewUser: {},
    viewScreams: []
};

let index;
function find(screamId, screams) {
    for (var s in screams) {
        if (screamId === screams[s].screamId) {
            return s;
        }
    }
    return -1;
}

function add_data(dict, dataId, data) {
    if (!(dataId in dict)) {
        dict[dataId] = data;
    } else {
        dict[dataId].push(data)
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };

        case SET_SCREAM:
            //data markup
            //payload: ...screamdata
            //         comments
            //         likes

            state.comments[action.payload.screamId] = action.payload.comments;
            state.likes[action.payload.screamId] = action.payload.likes;

            return {
                ...state,
                loading: false
            };

        case UNSET_SCREAM:
            for (var i in state.screams) {
                if (state.screams[i].screamId === action.payload) {
                    state.screams.splice(i, 1);
                }
            }
            return {
                ...state,
                loading: false
            }
        case SUBMIT_COMMENT:
            const screamId = action.payload.screamId;

            index = find(screamId, state.screams);
            add_data(state.comments, screamId, action.payload)
            if (index !== -1) {
                state.screams[index].commentCount += 1;
            }

            return {
                ...state
            }

        case TGGL_LIKE_SCREAM:
            index = find(action.payload.screamId, state.screams);
            if (index !== -1) {
                if (action.payload.liked) {
                    state.screams[index].likeCount -= 1;
                } else {
                    state.screams[index].likeCount += 1;
                }
            }
            return {
                ...state
            }
        case 'SEARCHING':
            return {
                ...state,
                searching: true,
            }
        case 'SEARCH_RES':
            return {
                ...state,
                searching: false,
                search_res: action.payload,
            }
        case 'GETVIEWUSER':
            return {
                ...state,
                loading: false,
                viewUser: action.payload.user,
                viewScreams: action.payload.screams
            }
        default:
            return state
    }
}