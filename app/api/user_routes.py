from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Post, Like, Comment
from ..models.db import db
from .helpers import get_user_model
from app.errors import NotFoundError, ForbiddenError, TestError
from ..forms.post_form import PostForm
from datetime import datetime
from sqlalchemy import desc, asc

from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# Get details of current User
@user_routes.route("/profile")
@login_required
def get_current_user():
    curr_user = get_user_model(current_user, User)

    if current_user:
        return curr_user.to_dict()
    else:
        return NotFoundError("There is no current user")

# Get detail of User by id


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if user:
        return user.to_dict()
    else:
        raise NotFoundError("User not found")


# Get all Posts by a UserId
@user_routes.route("/<int:userId>/posts")
@login_required
def all_users_posts(userId):
    user = User.query.get(userId)
    # like_count = Like.query.filter(Like.post_id == postId).count()
    # print("-----------------------")
    # print(like_count)
    if not user:
        raise NotFoundError("User not found")
    posts = Post.query.filter(Post.user_id == userId).order_by(
        Post.created_at.desc()).all()
    # like_count = Like.query.filter(Like.post_id == post.id)
    # count = len(like_count)
    # post.to_dict_with_comments()["Likes"] = count
    new_list = []
    for ele in posts:
        like_count = Like.query.filter(Like.post_id == ele.id).count()
        print("-----------------------")
        print(type(like_count))
        post = ele.to_dict_with_comments()
        # post["Count"] = like_count
        post["Like_Count"] = like_count
        new_list.append(post)
    # return {"Posts": [post.to_dict_with_comments() for post in posts]}
    return {"Posts": new_list}


@user_routes.route("/<int:userId>/posts2")
@login_required
def all_users_posts2(userId):
    user = User.query.get(userId)
    if not user:
        raise NotFoundError("User not found")
    posts = Post.query.filter(Post.user_id == userId).order_by(
        Post.created_at.desc()).all()
    posts2 = Post.query.filter(Post.wall_id == userId).order_by(
        Post.created_at.desc()).all()
    new_list = []
    for ele in posts:
        like_count = Like.query.filter(Like.post_id == ele.id).count()
        target_user = User.query.get(ele.to_dict()["wallId"])
        post = ele.to_dict_with_comments()
        post["Like_Count"] = like_count
        post["Target_Name"] = f"{target_user.first_name} {target_user.last_name}"
        new_list.append(post)
    for ele in posts2:
        like_count = Like.query.filter(Like.post_id == ele.id).count()
        target_user = User.query.get(ele.to_dict()["wallId"])
        post = ele.to_dict_with_comments()
        post["Like_Count"] = like_count
        post["Target_Name"] = f"{target_user.first_name} {target_user.last_name}"

        new_list.append(post)
    return {"Posts": new_list}

# user's feed----------------------------


@user_routes.route("/<int:userId>/feed")
@login_required
def feed(userId):
    # user = User.query.get(userId)
    user = get_user_model(current_user, User)
    if not user:
        raise NotFoundError("User not found")
    print("===================1", user.friends_list1.all())
    friends_list = user.friends_list1.all()
    # makes f_list = [array of friend's id(integer)]
    f_list_id = [ele.to_dict()["id"] for ele in friends_list]
    f_list_id.append(user.id)
    print("===================2", f_list_id)
    feed_posts_list = []
    for ele in f_list_id:
        posts = Post.query.filter(Post.user_id == ele).all()
        print("0000000000000000000000000000", posts)
        posts2 = Post.query.filter(Post.wall_id == ele).all()
        print("0000000000000000000000000001", posts2)
        temp = [*posts, *posts2]
        print("0000000000000000000000000002", temp)
        feed_posts_list.extend(temp)
    feed_posts_list = list(set(feed_posts_list))
    print("===================3", feed_posts_list)
    print("===================4", len(feed_posts_list))


    new_list = []
    for ele in feed_posts_list:
        like_count = Like.query.filter(Like.post_id == ele.id).count()
        target_user = User.query.get(ele.to_dict()["wallId"])
        post = ele.to_dict_with_comments()
        post["Like_Count"] = like_count
        post["Target_Name"] = f"{target_user.first_name} {target_user.last_name}"
        new_list.append(post)
    return {"Posts": new_list}


# --------------------------------------
@user_routes.route('', methods=['POST'])
def upload_image():
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400
    image = request.files["image"]
    if not image:
        text = "no image"
        return text
    if not allowed_file(image.filename):
        # raise TestError("file type not supported")
        return jsonify("file type not permitted"), 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    return url


# --------------------------------------


# Create a Post
@user_routes.route("/<int:userId>/post", methods=["POST"])
@login_required
def create_post(userId):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data["image"]:
            new_post = Post(wall_id=userId,
                            user_id=current_user.id,
                            content=form.data['content'],
                            image=form.data['image'],
                            created_at=datetime.now())
        else:
            new_post = Post(wall_id=userId,
                            user_id=current_user.id,
                            content=form.data['content'],
                            created_at=datetime.now())
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
