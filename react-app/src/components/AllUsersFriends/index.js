import { useHistory } from "react-router-dom";

import "./index.css"

const AllUsersFriends = ({ friendsArray }) => {
    // const [friendsArray, setFriendsArray] = useState([])
    const history = useHistory()
    // useEffect(() => {
    //     setFriendsArray(Object.values(friends))
    // }, [])

    return (
        <div id="all-friends-outer-container">
            <div id="all-friends-title">Friends</div>
            <div id="all-friends-container">

                {friendsArray.length > 0 && friendsArray.map(ele => {
                    //function/check/algorithms put here
                    return (
                        <div id="all-friends-card" key={ele.id}>
                            <img className="cursor" onClick={() => history.push(`/users/${ele.id}`)} src={ele.profilePicture} />
                            <div className="cursor" onClick={() => history.push(`/users/${ele.id}`)} id="all-friends-name">{ele.firstName} {ele.lastName}</div>
                            <div> test </div>
                        </div>
                    )
                })}
                {friendsArray.length == 0 && (
                    <div>CURRENTLY HAVE NO FRIENDS</div>
                )}
            </div>
        </div>
    )
}
export default AllUsersFriends
