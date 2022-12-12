import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import { csrfFetch } from "../../store/csrf"
import { getLikeList, unlikePost, likePost } from "../../store/post"


const Likes = ({ post }) => {
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
                <div id="like-comment-count-1">
                    <i id="like-count-icon" class="fa-solid fa-thumbs-up"></i>
                    <div id="like-count-number">{post.Like_Count}</div>
                </div>
                    <div id="comment-count">{post.Comments_Count} comments</div>
            </div>
            <div id="post-buttons-container">
                <div onClick={() => clickLike(post.id)} id="post-comment-divider" className={liked ? "user-liked cursor" : "user-not-liked cursor"}>
                    {liked
                        ?
                        <i className="fa-solid fa-thumbs-up"></i>
                        :
                        <i className="fa-regular fa-thumbs-up"></i>
                    }

                    <div>
                        Like
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Likes
