import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, getAllPosts, updateComment, getUsersPosts2, getFeed } from "../../store/post";
import ProfileSub from "../ProfileSub";
import { useHistory, useParams } from "react-router-dom";
import icon from "../../assets/default-profile-icon.png"
import "./index.css"
const PostComments = ({ ele }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const [newComment, setNewComment] = useState("")
    const [currentComment, setCurrentComment] = useState("")
    const [editComment, setEditComment] = useState("")
    const { userId } = useParams()


    const commentSubmit = (e, postId) => {
        e.preventDefault()
        let data = { "content": newComment }

        dispatch(createComment(postId, data))
            .then(() => {
                setNewComment("")
            })
            .then(() => {
                if (userId) {
                    dispatch(getUsersPosts2(userId))
                } else {
                    dispatch(getFeed(currentUser.id))
                }
            })
        return
    }
    const editCommentSubmit = (e, commentId) => {
        e.preventDefault()

        const data = { "content": editComment }
        dispatch(updateComment(commentId, data))
            .then(() => {
                setCurrentComment("")
            })
            .then(() => {
                if (userId) {
                    dispatch(getUsersPosts2(userId))
                } else {
                    dispatch(getFeed(currentUser.id))
                }
            })
        return
    }

    const deleteCommentButton = (commentId) => {
        dispatch(deleteComment(commentId))
        return
    }

    const goToProfile = () => {
        history.push(`/users/${currentUser.id}`)
    }


    const editCommentNumber = (comment) => {
        setCurrentComment(comment.id)
        setEditComment(comment.content)
    }
    useEffect(() => {
        if (currentComment) {
            let comment = document.getElementsByClassName("comment-being-edited")[0]
            comment.select()
        }
    }, [currentComment])


    return (
        <div>
            <div className="comment-container">
                {
                    ele.Comments.map((comment) => {

                        if (currentComment !== comment.id) {
                            return (
                                <div key={comment.id} className="individual-comment">
                                    <ProfileSub target={0} ele={comment.user} comment={comment.content} />
                                    {comment.user_id === currentUser.id && (
                                        <div className="edit-delete">
                                            <button className="cursor" onClick={() => editCommentNumber(comment)}>edit</button>
                                            <button className="cursor" onClick={() => deleteCommentButton(comment.id)}>delete</button>
                                        </div>
                                    )}
                                </div>
                            )
                        } else {
                            return (
                                <div>

                                    {editComment.length > 2000 && <div id="edit-comment-error" className="error-handling">Characters Exceeded- Current Characters: {editComment.length}/2000</div>}
                                    <div id="edit-comment-container">
                                        <img onClick={goToProfile} className="profile-sub-icon cursor" src={currentUser.profilePicture ? currentUser.profilePicture : icon} alt="profile" />
                                        <form id="edit-comment-form" onSubmit={(e) => editCommentSubmit(e, comment.id)}>
                                            <input
                                                type="text"
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                                placeholder="Edit your comment..."
                                                required
                                                className="comment-being-edited"
                                                autoComplete="off"
                                            />
                                        </form>
                                        <button id="edit-cancel-button" onClick={() => setCurrentComment("")}>cancel</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="create-comment-container">
                <img onClick={goToProfile} className="profile-sub-icon cursor" src={currentUser.profilePicture ? currentUser.profilePicture : icon} alt="profile" />
                <form className="create-comment-form" onSubmit={(e) => commentSubmit(e, ele.id)}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        required
                        id={"PostId"+ele.id}
                        autoComplete="off"
                    />
                    {newComment.length > 2000 && <div className="error-handling">Characters Exceeded- Current Characters: {newComment.length}/2000</div>}
                </form>
            </div>
        </div>
    )
}

export default PostComments
