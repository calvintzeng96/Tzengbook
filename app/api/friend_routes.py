from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError
from .helpers import child_belongs_to_parent, get_user_model
from datetime import datetime
from sqlalchemy import desc, asc
from .user_routes import get_current_user


friend_routes = Blueprint('friends', __name__)

#Get all friends by User id
@friend_routes.route("/user/<int:user_id>")
@login_required
def all_users_friends(user_id):
    user = User.query.get(user_id)
    all_my_friends = user.friends_list1.all()

    return jsonify({"friends": [ele.to_dict_basic_info() for ele in all_my_friends]})


#Create friendship (after user accepts request)
@friend_routes.route("/user/<int:user1_id>/<int:user2_id>", methods=["POST"])
@login_required
def create_friendship(user1_id, user2_id):
    friend2 = User.query.get(user2_id)
    friend1 = User.query.get(user1_id)
    #NEED TO ADD IF THERE IS REQUEST, THEN YOU CAN CREATE THE FRIENDSHIP

    requests = friend1.friend_requests.all()
    print("---------------------------")
    print(requests)
    # print(friend1)
    # print(friend2)
    if friend2 not in requests:
        raise ForbiddenError(f"user{friend2.id} did not send you a request")

    # print(friend)
    res1 = friend1.create_connection(friend2)
    friend1.friends_list2 = res1.friends_list2
    res2 = friend2.create_connection(friend1)
    friend2.friends_list2 = res2.friends_list2
    res3 = friend2.delete_request(friend1)
    friend2.outgoing = res3.outgoing

    db.session.commit()
    return {"message": f"Successfully connected user{user1_id} & user{user2_id}", "statusCode": 201}

#Delete friendship (needs to be able to work from either side)
@friend_routes.route("/user/<int:user1_id>/<int:user2_id>", methods=["DELETE"])
@login_required
def delete_friendship(user1_id, user2_id):
    friend2 = User.query.get(user2_id)
    friend1 = User.query.get(user1_id)



    if not (current_user.id == user2_id or current_user.id == user1_id):
        raise ForbiddenError("You are none of those user, nice try")
    if friend1 not in friend2.friends_list1:
            return {"message": f"{friend1.id} is not friends with {friend2.id}"}

    res1 = friend1.delete_connection(friend2)
    friend1.friends_list2 = res1.friends_list2
    res2 = friend2.delete_connection(friend1)
    friend2.friends_list2 = res2.friends_list2

    db.session.commit()
    return {"message": f"Successfully removed connection between {friend1} & {friend2}"}
