import { csrfFetch } from "./csrf";


export const search = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/search/${data}`);

    if (res.ok) {
        const requests = await res.json();
        return requests
    }
}
