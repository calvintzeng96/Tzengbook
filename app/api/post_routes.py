from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, Post
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError
from ..forms.post_form import PostForm



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
