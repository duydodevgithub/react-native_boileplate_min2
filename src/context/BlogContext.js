import React, {useReducer} from "react";
import createDataContext from "./createDataContext"

const BlogReducer = (state, action) => {
    switch(action.type) {
        case 'add_blogpost':
            return [...state,{id: Math.floor(Math.random() * 99999),title: action.payload.title, content: action.payload.content}]
        case 'delete_blogpost':
            return state.filter((item) => {
                return item.id !== action.payload
            })
        case 'edit_blogpost':
            return state.map((blogPost) => {
                if(blogPost.id === action.payload.id) {
                    return action.payload
                } else {
                    return blogPost
                }
            })
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: {title, content}});
        if(callback) {
            callback();
        }
    }
}

const deleteBlogPost = (dispatch) => {
    return id => {
        dispatch({type: 'delete_blogpost', payload: id})
    }
}

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({type: 'edit_blogpost', payload: {id, title, content}})
        if(callback) {
            callback();
        }
    }
}


export const {Context, Provider} = createDataContext(BlogReducer, {addBlogPost, deleteBlogPost, editBlogPost}, []);