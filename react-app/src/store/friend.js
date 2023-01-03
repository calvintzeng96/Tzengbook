import { csrfFetch } from "./csrf";

const LOAD_USERS_FRIENDS = "friends/LOAD_USERS_FRIENDS"
const NEW_FRIENDS = "friends/NEW_FRIENDS"
const DESTROY_FRIENDS = "friends/DESTROY_FRIENDS"

const usersFriends = (friends) => {
    return {
        type: LOAD_USERS_FRIENDS,
        friends
    }
}

export const getUsersFriends = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/user/${userId}`);

    if (res.ok) {
        const friends = await res.json();
        dispatch(usersFriends(friends));
        return friends
    }
}

let initialState = {
    allFriends: {}
}

export const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS_FRIENDS:
            const usersFriends = {...state}
            console.log("1111111111111111", action.friends)
            action.friends.friends.forEach(ele => {
                usersFriends.allFriends[ele.id] = ele
            })
            return usersFriends
        default:
            return state;
    }
};
