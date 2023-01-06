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

const destroyFriend = (res) => {
    return {
        type: DESTROY_FRIENDS,
        res
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

export const deleteFriend = (myId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/user/${myId}/${userId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const friend = await res.json()
        dispatch(destroyFriend(friend))
        return friend
    }
}

let initialState = {
    allFriends: {}
}

export const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS_FRIENDS:
            const usersFriends = { ...state, allFriends: {} }
            // usersFriends.allFriends = {}
            action.friends.friends.forEach(ele => {
                usersFriends.allFriends[ele.id] = ele
            })
            return usersFriends
        case DESTROY_FRIENDS:
            const deleteFriend = {...state, allFriends: {...state.allFriends}}
                let destroyResponse = action.res.message.split("User ")
                let user1 = Number(destroyResponse[1].split(">")[0])
                let user2 = Number(destroyResponse[2].split(">")[0])
                if (deleteFriend.allFriends[user1]) {
                    delete deleteFriend.allFriends[user1]
                }
                if (deleteFriend.allFriends[user2]) {
                    delete deleteFriend.allFriends[user2]
                }
            return deleteFriend
        default:
            return state;
    }
};
