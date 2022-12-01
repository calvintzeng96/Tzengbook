import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, getAllPosts, updateComment } from "../../store/post";
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
    const [newComment, setNewComment] = useState("")
    const [currentComment, setCurrentComment] = useState("")
    const [editComment, setEditComment] = useState("")


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
    const editCommentSubmit = (e, commentId) => {
        e.preventDefault()

        const data = { "content": editComment }
        dispatch(updateComment(commentId, data))
            .then(() => {
                alert("success")
                setCurrentComment("")
            })
            .then(() => {
                dispatch(getAllPosts())
            })
            .catch(() => {
                alert("failed")
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


    const editCommentNumber = (comment) => {
        setCurrentComment(comment.id)
        setEditComment(comment.content)
    }


    return (
        <div>
            <div className="comment-container">
                <div id="post-comment-divider">future like/comment</div>
                {
                    ele.Comments.map((comment) => {

                        if (currentComment !== comment.id) {
                            return (
                                <div className="individual-comment">
                                    <ProfileSub ele={comment.user} comment={comment.content} />
                                    {/* <div>{comment.content}</div> */}
                                    {comment.user_id == currentUser.id && (
                                        <div className="edit-delete">
                                            <button className="cursor" onClick={() => editCommentNumber(comment)}>edit</button>
                                            <button className="cursor" onClick={() => deleteCommentButton(comment.id)}>delete</button>
                                        </div>
                                    )}
                                </div>
                            )
                        } else {
                            let testing = 123
                            console.log(testing)
                            return (
                                <div id="edit-comment-container">
                                    <img onClick={goToProfile} className="profile-sub-icon cursor" src={icon} />
                                    <form id="edit-comment-form" onSubmit={(e) => editCommentSubmit(e, comment.id)}>
                                        <input
                                            type="text"
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                            placeholder="Edit your comment..."
                                        />
                                    </form>
                                    <button id="edit-cancel-button" onClick={() => setCurrentComment("")}>cancel</button>
                                </div>
                            )
                        }
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
                </form>
            </div>
        </div>
    )
}

export default PostComments
