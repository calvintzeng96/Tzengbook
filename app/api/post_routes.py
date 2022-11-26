from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, Post, Comment
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError
from ..forms import PostForm
from ..forms import CommentForm
from .helpers import child_belongs_to_parent, get_user_model
from datetime import datetime


post_routes = Blueprint('posts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


# Get All Posts
@post_routes.route("/")
@login_required
def all_posts():
    posts = Post.query.all()

    if not posts:
        raise NotFoundError("No posts found.")
    return {"Posts": [post.to_dict() for post in posts]}


# Get details of a Post from an id
@post_routes.route("/<int:postId>")
@login_required
def single_post(postId):
    post = Post.query.get(postId)
    if not post:
        raise NotFoundError("Post not found")
    else:
        return post.to_dict()


# Edit a Post
@post_routes.route("/<int:post_id>", methods=["PUT"])
@login_required
def edit_post(post_id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        update_data = form.data
        del update_data['csrf_token']
        if update_data.get('submit'):
            del update_data['submit']

        post = Post.query.get(post_id)
        if not post:
            raise NotFoundError("Post not found")
        try:
            child_belongs_to_parent(User.query.get(current_user.id), post, 'user_id')
        except ForbiddenError as e:
            return {"error": e.message}, e.status_code

        for key, value in update_data.items():
            setattr(post, key, update_data[key])
        db.session.commit()
        return jsonify(post.to_dict())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# Delete a Post
@post_routes.route('/<int:post_id>', methods=["DELETE"])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        raise NotFoundError('Post not found')

    try:
        child_belongs_to_parent(current_user, post, 'user_id')
    except ForbiddenError as e:
        return {"error": e.message}, e.status_code

    db.session.delete(post)
    db.session.commit()
    return {"message": f"Post {post_id} successfully deleted.", "statusCode": 200}


# Get all Comments by post id
@post_routes.route('/<int:post_id>/comments')
@login_required
def get_comments(post_id):
    post = Post.query.get(post_id)
    if not post:
        raise NotFoundError("Post not found")
    #if not post, return err
    comments = Comment.query.filter(Comment.post_id == post_id).all()
    if not comments:
        return {"Comments": []}
        # raise NotFoundError('Comment not found.')
    return {"Comments": [comment.to_dict_with_user() for comment in comments]}


#Create a Comment
@post_routes.route("/<int:post_id>/comments", methods=["POST"])
@login_required
def create_comment(post_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user=get_user_model(current_user, User),
            post_id=post_id,
            content=form.data['content'],
            created_at=datetime.now())
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict_with_user(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
