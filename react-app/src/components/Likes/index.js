import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import { csrfFetch } from "../../store/csrf"
import { getLikeList, unlikePost, likePost } from "../../store/post"


const Likes = ({post}) => {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(getLikeList(post.id))
        .then((res) => {
            let likeList = res.Likes
            let yes = likeList.filter(ele => ele.userId == currentUser.id)
            if (yes.length) {
                setLiked(true)
            }
        })
    }, [])
    const clickLike = (postId) => {
        if (liked) {
            dispatch(unlikePost(postId, currentUser.id))
            setLiked(false)
        } else {
            dispatch(likePost(postId, currentUser.id))
            setLiked(true)
        }
    }

    return (
        <div id="likes-container">
            <div id="like-comment-count-container">
                <div>Like Count: {post.Like_Count}</div>
                <div>Comment Count: {post.Comments_Count}</div>
            </div>
            <div onClick={() => clickLike(post.id)} id="post-comment-divider" className={liked ? "user-liked cursor" : "cursor"}>Space saved for "Likes" feature</div>
        </div>
    )

}

export default Likes
