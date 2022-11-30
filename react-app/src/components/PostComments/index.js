import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, getAllPosts } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { getUser } from "../../store/user";
import { useHistory } from "react-router-dom";
import icon from "../../assets/default-profile-icon.png"
import "./index.css"
import { getUsersPosts } from "../../store/post";

const PostComments = ({ ele }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const posts = useSelector(state => state.post.allPosts)
    const [newComment, setNewComment] = useState("")


    useEffect(() => {

    }, [posts])

    const commentSubmit = (e, postId) => {
        e.preventDefault()
        let data = { "content": newComment }

        dispatch(createComment(postId, data))
        .then(() => {
            dispatch(getAllPosts())
        })
        .then(() => {
            setNewComment("")
        })
        return
    }

    const deleteCommentButton = (commentId) => {
        dispatch(deleteComment(commentId))
        return
    }

    const goToProfile = () => {
        dispatch(getUser(ele.id))
            .then(() => {
                dispatch(getUsersPosts(ele.id))
            })
        history.push(`/users/${currentUser.id}`)
    }


    return (
        <div>

            <div className="comment-container">
                <div id="post-comment-divider">future like/comment</div>
                {
                    ele.Comments.map(comment => {
                        return (
                            <div className="individual-comment">
                                <ProfileSub ele={comment.user} comment={comment.content} />
                                {/* <div>{comment.content}</div> */}
                                {comment.user_id == currentUser.id && (
                                    <div className="edit-delete">
                                        <button>edit</button>
                                        <button onClick={() => deleteCommentButton(comment.id)}>delete</button>
                                    </div>
                                )}



                            </div>
                        )
                    })
                }
            </div>
            <div className="create-comment-container">
                <img onClick={goToProfile} className="profile-sub-icon cursor" src={icon} />
                <form className="create-comment-form" onSubmit={(e) => commentSubmit(e, ele.id)}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    {/* <button type="submit">submit</button> */}
                </form>
            </div>
        </div>
    )
}

export default PostComments
