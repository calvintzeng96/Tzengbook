import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUsersFriends } from "../../store/friend";
import "./index.css"


const SomeUsersFriends = ({ friendsArray }) => {
    const history = useHistory()

    //test this logic out later with user that has 6+ friends
    return (
        <div id="some-friends-container">
            {friendsArray.length > 0 && friendsArray.map(ele => {
                return (
                    <div id="some-friends-card" key={ele.id}>
                        <img className="cursor" onClick={() => history.push(`/users/${ele.id}`)} src={ele.profilePicture} />
                        <div id="some-friends-name" className="cursor" onClick={() => history.push(`/users/${ele.id}`)} >{ele.firstName} {ele.lastName}</div>
                    </div>
                )
            })}
            {friendsArray.length == 0 && (
                <div>CURRENTLY HAVE NO FRIENDS</div>
            )}
        </div>
    )
}
export default SomeUsersFriends
