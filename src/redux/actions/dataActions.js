import axios from 'axios';
import { LOADING_DATA, SET_SCREAMS, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, UNSET_SCREAM, TGGL_LIKE_SCREAM, SET_SCREAM, SUBMIT_COMMENT, SET_UNAUTHENTICATED } from '../types'

const logout = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};


export const error_handle = (err) => (dispatch) => {
    if (err.code && err.code === 'auth/id-token-expired') {
        dispatch(logout)
    } else {
        console.log(err);
    }
};

export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/screams')
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            });
        })
        .catch((err) => {
            error_handle(err);
            dispatch({
                type: SET_SCREAMS,
                payload: []
            });
        });
};

export const getScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
        })
        .catch((err) => {
            error_handle(err);
            dispatch({
                type: SET_SCREAM,
                payload: []
            });
        });
};

export const postScream = (post) => (dispatch) => {
    if (post.body.trim().length === 0) {
        dispatch({
            type: SET_ERRORS,
            payload: { post: 'Cannot make blank post.' }
        });
        return
    }
    dispatch({ type: LOADING_UI });
    axios
        .post('/scream', post)
        .then(() => {
            dispatch({ type: CLEAR_ERRORS });
            dispatch(getScreams())
        })
        .catch((err) => {
            error_handle(err);
        })

}

export const deleteScream = (postId) => (dispatch) => {
    dispatch({
        type: UNSET_SCREAM,
        payload: postId
    })
    axios
        .delete(`/scream/${postId}`)
        .catch((err) => {
            error_handle(err);
        })
}

export const handleLike = (liked, screamId, handle) => (dispatch) => {
    let action;
    if (!liked) {
        action = 'like';
    } else {
        action = 'unlike';
    }
    dispatch({
        type: TGGL_LIKE_SCREAM,
        payload: {
            liked, screamId, handle
        }
    });
    axios
        .get(`/scream/${screamId}/${action}`)
        .catch((err) => {
            error_handle(err);
        })
}

export const postComment = (comment, screamId, credentials) => (dispatch) => {
    const handle = credentials.handle;
    const imageUrl = credentials.imageUrl;

    if (comment.comment.trim().length === 0) {
        dispatch({
            type: SET_ERRORS,
            payload: { post: 'Cannot make blank post.' }
        });
        return
    }
    dispatch({
        type: SUBMIT_COMMENT,
        payload: {
            body: comment.comment,
            screamId,
            handle,
            imageUrl
        }
    });

    axios
        .post(`/scream/${screamId}/comment`, comment)
        .catch((err) => {
            error_handle(err);
        })
}


export const handleShare = () => (dispatch) => {

}


export const search = (postData, credentials) => (dispatch) => {
    dispatch({
        type: 'SEARCHING'
    })
    axios.get(`/search/${postData.query}`)
        .then((res) => {
            dispatch({
                type: 'SEARCH_RES',
                payload: res.data
            })
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const getViewUser = (handle) => (dispatch) => {
    dispatch({
        type: 'LOADING'
    })
    axios
        .get(`/user/${handle}`)
        .then((res) => {
            dispatch({
                type: 'GETVIEWUSER',
                payload: {
                    user: res.data.user,
                    screams: res.data.screams
                }
            })
        })
        .catch((err) => console.log(err));
}