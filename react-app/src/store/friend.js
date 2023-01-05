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

const newFriend = (friend) => {
    return {
        type: NEW_FRIENDS,
        friend
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

export const createFriend = (myId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/user/${myId}/${userId}`, {
        method: "POST"
    })

    if (res.ok) {
        const friend = await res.json()
        dispatch(newFriend(friend))
        return friend
    }
}

let initialState = {
    allFriends: {}
}

export const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS_FRIENDS:
            const usersFriends = {...state, allFriends: {}}
            // usersFriends.allFriends = {}
            action.friends.friends.forEach(ele => {
                usersFriends.allFriends[ele.id] = ele
            })
            return usersFriends
        default:
            return state;
    }
};
