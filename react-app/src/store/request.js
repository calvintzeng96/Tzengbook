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
const destroyRequest = (res) => {
    return {
        type: DESTROY_REQUESTS,
        res
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
        const request = await res.json();
        dispatch(newRequest(request));
        return request
    }
}
// Delete a Request
export const deleteRequest = (myId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/requests/${userId}/inviter/${myId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const request = await res.json()
        dispatch(destroyRequest(request))
        return request
    }
}

let initialState = {
    incoming: {},
    outgoing: {}
}

export const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INCOMING_REQUESTS:
            const incomingRequests = {...state, incoming: {}}
            action.requests.incoming_requests.forEach(ele => {
                incomingRequests.incoming[ele.id] = ele
            })
            return incomingRequests
        case LOAD_OUTGOING_REQUESTS:
            const outgoingRequests = {...state}
            action.requests.outgoing_requests.forEach(ele => {
                outgoingRequests.outgoing[ele.id] = ele
            })
            return outgoingRequests
        case NEW_REQUESTS:
            const newRequest = {...state, outgoing: {...state.outgoing}}
                let newId = action.request.message.split("Request ")[1]
                newRequest[newId] = {"key": "value"}
            return newRequest
        case DESTROY_REQUESTS:
            const deleteRequest = {...state, incoming: {...state.incoming}, outgoing: {...state.outgoing}}
            let test = action.res.message.split("User ")
            let requester = Number(test[1].split(">")[0])
            let requestee = Number(test[2].split(">")[0])
            if (deleteRequest.incoming[requester]) {
                delete deleteRequest.incoming[requester]
            }
            if (deleteRequest.incoming[requestee]) {
                delete deleteRequest.incoming[requestee]
            }
            if (deleteRequest.outgoing[requester]) {
                delete deleteRequest.outgoing[requester]
            }
            if (deleteRequest.outgoing[requestee]) {
                delete deleteRequest.outgoing[requestee]
            }
            return deleteRequest
        default:
            return state;
    }
};
