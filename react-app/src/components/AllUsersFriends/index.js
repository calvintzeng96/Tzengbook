import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUsersFriends } from "../../store/friend";
import "./index.css"

const AllUsersFriends = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friend.allFriends)
    const friendsListArray = Object.values(friendsList)
    const history = useHistory()

    useEffect(() => {
        console.log("00000000000000", friendsListArray)
        dispatch(getUsersFriends(user.id))
        // .then(() => {
        //     console.log("222222222222222", friendsList)
        //     alert("success")
        // })
        // .catch(() => {
        //     alert("failed")
        // })
    }, [friendsList])
    return (
        <div id="all-friends-outer-container">
            <div id="all-friends-title">Friends</div>
            {console.log("33333333333333333", friendsListArray, typeof friendsListArray)}
            <div id="all-friends-container">

                {friendsList && friendsListArray.map(ele => {
                    return (
                        <div id="all-friends-card" key={ele.id}>
                            <img className="cursor" onClick={() => history.push(`/users/${ele.id}`)} src={ele.profilePicture} />
                            <div className="cursor" onClick={() => history.push(`/users/${ele.id}`)} id="all-friends-name">{ele.firstName} {ele.lastName}</div>
                        </div>
                    )
                })}
                {!friendsList && (
                    <div>CURRENTLY HAVE NO FRIENDS</div>
                )}
            </div>
        </div>
    )
}
export default AllUsersFriends
