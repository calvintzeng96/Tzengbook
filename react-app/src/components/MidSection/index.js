const MidSection = () => {
    return (
        <div id="all-post-middle">
            <div>
                <div className="create-comment-div">
                    <img src={icon} onClick={() => history.push(`/users/${user.id}`)} />
                    <button className="cursor" onClick={() => setModalType("CreatePost")}>{`What's on your mind, ${currentUser?.firstName}?`}</button>
                </div>
            </div>
            {posts && postsArray.map(ele => {
                return (
                    <div key={ele.id} className="single-post">
                        <div className="single-post-top">
                            <ProfileSub ele={ele.User} createdAt={ele.createdAt} />
                            {currentUser.id == ele.userId && (
                                <div className="edit-delete">
                                    <button onClick={() => openEditModal(ele.id)}>Edit</button>
                                    <button onClick={() => deleteSinglePost(ele.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                        <div className="single-post-content">POST CONTENT: {ele.content} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
                        {/* {console.log(ele.image)} */}
                        {ele.image && <img className="post-image" src={ele.image} />}
                        <PostComments ele={ele} />
                    </div>
                )
            })}
        </div>
    )
}
