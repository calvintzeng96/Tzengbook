import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUsersFriends } from "../../store/friend";
import "./index.css"


const SomeUsersFriends = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friend.allFriends)
    const friendsListArray = Object.values(friendsList)
    const history = useHistory()
    return (
        <div id="some-friends-container">
            test
        </div>
    )
}
export default SomeUsersFriends
