import "./index.css"
import icon from "../../assets/default-profile-icon.png"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../store/user"
import { useContext, useEffect, useState } from "react"
import { getUsersPosts } from "../../store/post"
import { ModalContext } from "../../context/Modal"

const ProfileSub = ({ ele, createdAt, comment }) => {
    const dispatch = useDispatch()
    const moment = require("moment")
    let timeAgo = moment(createdAt).fromNow()
    const history = useHistory()
    const [iconOnly, setIconOnly] = useState(false)
    const { modalType, setModalType } = useContext(ModalContext)
    // const currentUser = useSelector(state=> state.session.user)

    let test = ""
    if (comment) {
        test = comment
        timeAgo = null
    }



    const goToProfile = () => {
        if (modalType) {
            setModalType(null)
            history.push(`/users/${ele.id}`)
            return
        }
        dispatch(getUser(ele.id))
            .then(() => {
                dispatch(getUsersPosts(ele.id))
            })
        history.push(`/users/${ele.id}`)
    }



    return (
        <div className="profile-in-post">
            <img onClick={() => goToProfile()} className="profile-sub-icon cursor"  src={ele.profilePicture ? ele.profilePicture : icon} />

            <div id={test ? "comment-content" : "comment-content-not"}>
                    <div onClick={() => goToProfile()} className={test ? "small-text bold cursor" : "bold cursor" }>{ele.firstName} {ele.lastName}</div>
                {test && (
                    <div id="comment-content-1">{comment}</div>
                )}
                {timeAgo && !modalType && (
                    <div className="grey">{timeAgo}</div>
                )}
            </div>
        </div>
    )
}

export default ProfileSub
