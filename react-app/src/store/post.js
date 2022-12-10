import { csrfFetch } from "./csrf"

const LOAD_ALL_POSTS = "/posts/LOAD_ALL_POSTS";
const LOAD_USERS_POSTS = "/posts/LOAD_USERS_POSTS";
const LOAD_SINGLE_POSTS = "/posts/LOAD_SINGLE_POSTS";
const NEW_POST = "/posts/NEW_POST";
const EDIT_POST = "/posts/EDIT_POST";
const DESTROY_POST = "/posts/DESTROY_POST";

const NEW_COMMENT = "/comments/NEW_COMMENT"
const DESTROY_COMMENT = "/posts/DESTROY_COMMENT";

const LIKE_POST = "/posts/LIKE_POSTS"
const UNLIKE_POST = "/posts/UNLIKE_POSTS"

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

const newComment = (comment) => {
    return {
        type: NEW_COMMENT,
        comment
    }
}

const destroyComment = (commentId, postId) => {
    return {
        type: DESTROY_COMMENT,
        payload: { "commentId": commentId, "postId": postId }
    }
}

const likePostAction = (postId) => {
    return {
        type: LIKE_POST,
        postId
    }
}
const unlikePostAction = (postId) => {
    return {
        type: UNLIKE_POST,
        postId
    }
}

// Get All Posts
export const getAllPosts = () => async (dispatch) => {

    const res = await csrfFetch("/api/posts/")

    if (res.ok) {
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

//Create a Comment
export const createComment = (postId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(newComment(comment))
        return comment
    }
}
//Edit a Comment
export const updateComment = (commentId, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        const comment = await res.json();
        return comment
    }
}
//Delete Comment
export const deleteComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const comment = await res.json()
        dispatch(destroyComment(commentId, comment.postId))
        return comment
    }
}

// Get List of Likes on Post
export const getLikeList = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes`)

    if (res.ok) {
        const list = await res.json();
        return list
    }
}

// Like Post
export const likePost = (postId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes/users/${userId}`, {
        method: "POST",
    });

    if (res.ok) {
        const list = await res.json();
        dispatch(likePostAction(postId))
        return list
    }
}
// Unlike Post
export const unlikePost = (postId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/likes/users/${userId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const list = await res.json();
        dispatch(unlikePostAction(postId))
        return list
    }
}


// REDUCER
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
        case NEW_COMMENT:
            let test = action.comment
            const createComment = { ...state, allPosts: { ...state.allPosts } }
            createComment.allPosts[test.post_id].Comments[test.id] = test
            return { ...createComment }
        case DESTROY_COMMENT:
            let test2 = action.payload
            const deleteComment = { ...state, allPosts: { ...state.allPosts } }
            let newCommentsArray = []
            for (let i = 0; i < deleteComment.allPosts[test2.postId].Comments.length; i++) {
                if (deleteComment.allPosts[test2.postId].Comments[i].id !== test2.commentId) {
                    newCommentsArray.push(deleteComment.allPosts[test2.postId].Comments[i])
                }
            }
            deleteComment.allPosts[test2.postId].Comments = newCommentsArray
            return { ...deleteComment }
        case LIKE_POST:
            let like = {...state, allPosts: {...state.allPosts}}
            like.allPosts[action.postId].Like_Count += 1
            return like
        case UNLIKE_POST:
            let unlike = {...state, allPosts: {...state.allPosts}}
            unlike.allPosts[action.postId].Like_Count -= 1
            return unlike
        default:
            return state;
    }
};
