from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, Post
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError




post_routes = Blueprint('posts', __name__)


# Get All Posts
@post_routes.route("/")
@login_required
def all_posts():
    posts = Post.query.all()

    if not posts:
        raise NotFoundError("No posts found.")
    return jsonify({"Posts": [post.to_dict() for post in posts]})
