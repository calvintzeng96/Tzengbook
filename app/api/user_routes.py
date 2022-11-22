from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post
from .helpers import get_user_model

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


#Get details of current User
@user_routes.route("/profile")
@login_required
def get_current_user():
    curr_user = get_user_model(current_user, User)

    if current_user:
        posts = Post.query.filter(Post.user_id == curr_user.id)
        answer = curr_user.to_dict()
        answer["Posts"] = [ele.to_dict() for ele in posts]
        return answer

# Get detail of User by id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
