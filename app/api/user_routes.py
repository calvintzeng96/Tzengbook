from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Post
from ..models.db import db
from .helpers import get_user_model
from app.errors import NotFoundError, ForbiddenError
from ..forms.post_form import PostForm
from datetime import datetime

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

# print("*******************")


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



# Get all Posts by a UserId
@user_routes.route("/<int:userId>/posts")
@login_required
def all_users_posts(userId):
    user = User.query.get(userId)
    if not user:
        raise NotFoundError("User not found")
    posts = Post.query.filter(Post.user_id == userId).all()
    return {"Posts": [post.to_dict() for post in posts]}


# Create a Post
@user_routes.route("/<int:userId>/post", methods=["POST"])
@login_required
def create_post(userId):
    print("--------------------------------")
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(wall_id=userId,
                        user_id=current_user.id,
                        content=form.data['content'],
                        image=form.data['image'],
                        created_at=datetime.now())
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
