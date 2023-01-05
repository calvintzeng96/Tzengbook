import { csrfFetch } from "./csrf";

const LOAD_INCOMING_REQUESTS = "requests/LOAD_INCOMING_REQUESTS"
const LOAD_OUTGOING_REQUESTS = "requests/LOAD_OUTGOING_REQUESTS"
const NEW_REQUESTS = "requests/NEW_REQUESTS"
const DESTROY_REQUESTS = "requests/DESTROY_REQUESTS"

const incomingRequests = (requests) => {
    return {
        type: LOAD_INCOMING_REQUESTS,
        requests
    }
}
const outgoingRequests = (requests) => {
    return {
        type: LOAD_OUTGOING_REQUESTS,
        requests
    }
}

const newRequest = (request) => {
    return {
        type: NEW_REQUESTS,
        request
    }
}
const destroyRequest = (request) => {
    return {
        type: DESTROY_REQUESTS,
        request
    }
}

// Get incoming Requests
export const getIncomingRequests = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/requests/${userId}/incoming_requests`);

    if (res.ok) {
        const requests = await res.json();
        dispatch(incomingRequests(requests));
        return requests
    }
}
// Get outgoing Requests
export const getOutgoingRequests = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/requests/${userId}/outgoing_requests`);

    if (res.ok) {
        const requests = await res.json();
        dispatch(outgoingRequests(requests));
        return requests
    }
}
// Create a Request
export const createRequest = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/requests/${userId}`, {
        method: "POST",
    });

    if (res.ok) {
        const request = res.json();
        dispatch(newRequest(request));
        return request
    }
}
// // Delete a Request
// export const deleteRequest = () => async (dispatch) => {
//     const res = await csrfFetch(`/api/requests/`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         dispatch(destroyRequest())
//     }
// }

let initialState = {
    incoming: {},
    outgoing: {}
}

export const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INCOMING_REQUESTS:
            return
        case LOAD_OUTGOING_REQUESTS:
            return
        case NEW_REQUESTS:
            return
        case DESTROY_REQUESTS:
            return
        default:
            return state;
    }
};
