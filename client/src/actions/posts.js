import { FETCH_POST, CREATE, FETCH_ALL, DELETE, UPDATE, LIKE, FETCH_By_SEARCH, START_LOADING, END_LOADING, COMMENT } from "../constants/actionsTypes";
import * as api from '../api';

export const getPost = (id) => async (dispatch) => { 
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data}); 
        dispatch({type: END_LOADING}); 
    } catch (error) {
        console.log(error.message);
    }
}

export const getPosts = (page) => async (dispatch) => { 
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => { 
    try { 
        dispatch({type: START_LOADING});                                    
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_By_SEARCH, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post, history) => async (dispatch)  => {
    try {
        const { data } = await api.createPost(post);
        dispatch ({type: CREATE, payload: data});
        history(`/posts/${data._id}`);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch ({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch ({ type: DELETE, payload: {id} })
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch)=> {
    try {
        const { data } = await api.likePost(id);
        dispatch ({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.response);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };