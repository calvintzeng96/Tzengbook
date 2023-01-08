import { useHistory } from "react-router-dom";
import FriendshipOption from "../FriendshipOption";
import "./index.css"
import "../Profile/index.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFriends } from "../../store/friend";

const AllUsersFriends = ({ friendsArray }) => {
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const [myFriends, setMyFriends] = useState([])
    const dispatch = useDispatch()
    const incoming = useSelector(state => state.request.incoming)
    const outgoing = useSelector(state => state.request.outgoing)

    const helper = (userId) => {
        let temp = "not friends"
        if (currentUser.id == userId) {
            temp = "myself"
        } else {
            for (let i = 0; i < myFriends.length; i++) {
                if (myFriends[i].id == userId) {
                    temp = "friends"
                    break
                }
            }
        }
        if (temp === "not friends") {
            let incomingKeys = Object.keys(incoming)
            let outgoingKeys = Object.keys(outgoing)
            if (incomingKeys.includes(userId)) {
                temp = "incomingRequest"
            } else if (outgoingKeys.includes(userId)) {
                temp = "outgoingRequest"
            }
        }
        return temp
    }

    useEffect(() => {
        dispatch(getUsersFriends(currentUser.id))
            .then((res) => {
                setMyFriends(res.friends)
            })
    }, [currentUser.id, dispatch])

    return (
        <div id="all-friends-outer-container">
            <div id="all-friends-title">Friends</div>
            <div id="all-friends-container">

                {friendsArray.length > 0 && friendsArray.map(ele => {
                    let status = helper(ele.id)
                    return (
                        <div id="all-friends-card" key={ele.id}>
                            <img className="cursor" onClick={() => history.push(`/users/${ele.id}`)} src={ele.profilePicture} alt="profile icon" />
                            <div className="cursor underline-hover" onClick={() => history.push(`/users/${ele.id}`)} id="all-friends-name">{ele.firstName} {ele.lastName}</div>
                            <FriendshipOption status={status} userId={ele.id} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default AllUsersFriends
