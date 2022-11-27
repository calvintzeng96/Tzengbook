import { csrfFetch } from "./csrf"

const LOAD_ALL_POSTS = "/posts/LOAD_ALL_POSTS";
const LOAD_USERS_POSTS = "/posts/LOAD_USERS_POSTS";
const LOAD_SINGLE_POSTS = "/posts/LOAD_SINGLE_POSTS";
const NEW_POST = "/posts/NEW_POST";
const EDIT_POST = "/posts/EDIT_POST";
const DESTROY_POST = "/posts/DESTROY_POST";

// ACTIONS
const allPosts = (posts) => {
    return {
        type: LOAD_ALL_POSTS,
        posts
    }
}

const usersPosts = (posts) => {
    return {
        type: LOAD_USERS_POSTS,
        posts
    }
}

const singlePost = (post) => {
    return {
        type: LOAD_SINGLE_POSTS,
        post,
    };
};

const newPost = (post) => {
    return {
        type: NEW_POST,
        post
    }
}
const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}
const destroyPost = (postId) => {
    return {
        type: DESTROY_POST,
        postId
    }
}


// THUNKS

// Get All Posts
export const getAllPosts = () => async (dispatch) => {

    console.log("HERERERE")
    const res = await csrfFetch("/api/posts/")
    console.log("HERERERE2")

    if (res.ok) {
        console.log("-----------------123", res)
        const posts = await res.json();
        dispatch(allPosts(posts));
        return posts
    }
}

// Get all Posts by a UserId
export const getUsersPosts = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/posts`);

    if (res.ok) {
        const posts = await res.json();
        dispatch(usersPosts(posts));
        return posts
    }
}

// Get details of a Post from an id
export const getSinglePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`);

    if (res.ok) {
        const post = await res.json();
        dispatch(singlePost(post));
        return post;
    }
}

// Create a Post
export const createPost = (wallId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${wallId}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const post = res.json();
        dispatch(newPost(post));
        return post
    }
}

// Edit a Post
export const updatePost = (postId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        const post = res.json();
        dispatch(editPost(post));
        return post
    }
}

// Delete a Post
export const deletePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(destroyPost(postId))
    }
}


// REDUCER
//don't think will ever use load all posts......

let initialState = {
    allPosts: {},
    singlePost: {}
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_POSTS:
            const allPosts = { ...state, allPosts: {} }
            action.posts.Posts.forEach(ele => {
                allPosts.allPosts[ele.id] = ele
            })
            return allPosts
        case LOAD_USERS_POSTS:
            const usersPosts = { ...state, allPosts: {} }
            action.posts.Posts.forEach(ele => {
                usersPosts.allPosts[ele.id] = ele
            })
            return usersPosts
        case LOAD_SINGLE_POSTS:
            const singlePost = { ...state, singlePost: action.post }
            return { ...singlePost }
        case NEW_POST:
            const newPost = { ...state, singlePost: action.post }
            return { ...newPost }
        case EDIT_POST:
            const editedPost = { ...state, singlePost: action.post }
            return { ...editedPost }
        case DESTROY_POST:
            const deletePost = {
                allPosts: { ...state.allPosts },
                singlePost: {},
            };
            delete deletePost.allPosts[action.storyId]
            return { ...deletePost }
        default:
            return state;
    }
};