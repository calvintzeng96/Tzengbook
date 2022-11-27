import "./index.css"
import icon from "../../assets/default-profile-icon.png"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getUser } from "../../store/user"

const ProfileSub = ({ ele, createdAt }) => {
    const dispatch = useDispatch()
    const moment = require("moment")
    const timeAgo = moment(createdAt).fromNow()
    const history = useHistory()

    const goToProfile = () => {
        dispatch(getUser(ele.id))
            .then(() => {
                history.push(`/users/${ele.id}`)
            })
    }

    return (
        <div className="profile-in-post">
            <img onClick={goToProfile} className="profile-sub-icon cursor" src={icon} />
            <div>
                <div onClick={goToProfile} className="bold cursor">{ele.firstName} {ele.lastName}</div>
                <div className="grey">{timeAgo}</div>
            </div>
        </div>
    )
}

export default ProfileSub
