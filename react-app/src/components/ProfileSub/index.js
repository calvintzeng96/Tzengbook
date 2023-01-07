import "./index.css"
import icon from "../../assets/default-profile-icon.png"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getUser } from "../../store/user"
import { useContext, useEffect } from "react"
import { getUsersPosts } from "../../store/post"
import { ModalContext } from "../../context/Modal"
import { useState } from "react"

const ProfileSub = ({ target, ele, createdAt, comment }) => {
    const dispatch = useDispatch()
    const moment = require("moment")
    let timeAgo = moment(createdAt).fromNow()
    const history = useHistory()
    const { modalType, setModalType } = useContext(ModalContext)
    const [targetWallId, setTargetWallId] = useState(0)
    const [targetName, setTargetName] = useState(0)

    let test = ""
    if (comment) {
        test = comment
        timeAgo = null
    }

    useEffect(() => {
        if (target !== 0) {
            setTargetWallId(target)
            let name = target.split("/")[1]
            setTargetName(name)
        }
    }, [target])



    const goToProfile = () => {
        if (modalType) {
            setModalType(null)
            history.push(`/users/${ele.id}`)
            return
        }
        dispatch(getUser(ele.id))
        history.push(`/users/${ele.id}`)
    }

    const goToProfile2 = (userId) => {
        history.push(`/users/${userId}`)
    }


    return (
        <div className="profile-in-post">
            <img onClick={() => goToProfile()} className="profile-sub-icon cursor" src={ele.profilePicture ? ele.profilePicture : icon} />

            <div id={test ? "comment-content" : "comment-content-not"}>
                <div className={test ? "small-text" : "target-post-display"}>
                    <div onClick={() => goToProfile()} className="cursor bold underline-hover">{ele.firstName} {ele.lastName}</div>
                    {targetWallId !== 0 && (
                        <div className="target-post-display-1">

                            <div className="target-post-display-1-1">{">"}</div>
                            <div onClick={() => goToProfile2(targetWallId)} className="cursor bold underline-hover">{targetName}</div>
                        </div>
                    )}
                </div>

                {test && (
                    <div id="comment-content-1">{comment}</div>
                )}
                {timeAgo && !modalType && (
                    <div className="small-text grey ">{timeAgo}</div>
                )}
            </div>
        </div>
    )
}

export default ProfileSub
