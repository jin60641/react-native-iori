import {createAction} from 'redux-actions';
import config from '../../config';
const { host } = config;

export const writePost = createAction('WRITEPOST');
export const getPosts = createAction('GETPOSTS');
export const getPost = createAction('GETPOST');
export const removePost = createAction('REMOVEPOSTS');

const writePostUri = `${host}/api/newsfeed/post/write`;
const getPostsUri = `${host}/api/newsfeed/post/get`;
const removePostUri = `${host}/api/newsfeed/post/remove`;

export const fetchRemovePost = (data) => {
	return async (dispatch) => {
		const resp = await fetch(removePostUri, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include'
		});
		const body = await resp.json();
		if(body.data){
			return dispatch(removePost(body.data));
		} else {
			return dispatch(removePost(new Error(body.message)));
		}
	}
};

export const fetchWritePost = (data) => {
	return async (dispatch) => {
		const resp = await fetch(writePostUri, {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
		const body = await resp.json();
		if(body.data){
			return dispatch(writePost(body.data));
		} else {
			return dispatch(writePost(new Error(body.message)));
		}
	}
};

export const fetchGetPosts = (data) => {
	return async (dispatch) => {
		const resp = await fetch(getPostsUri, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include'
		});
		const body = await resp.json();
		if(body.data){
			return dispatch(getPosts(body.data));
		} else {
			return dispatch(getPosts(new Error(body.message)));
		}
	}
};
