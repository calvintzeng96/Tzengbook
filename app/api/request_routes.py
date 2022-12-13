from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError
from .helpers import child_belongs_to_parent, get_user_model
from datetime import datetime
from sqlalchemy import desc, asc
from .user_routes import get_current_user


request_routes = Blueprint('requests', __name__)


#Get all incoming friend request
@request_routes.route("/<int:user_id>/incoming_requests")
def incoming_requests(user_id):
    user = User.query.get(user_id)
    friend_requests = user.friend_requests.all()

    return jsonify({"incoming_requests": [ele.to_dict() for ele in friend_requests] })


#Get all outgoing friend request of current user
@request_routes.route("/<int:user_id>/outgoing_requests")
def outgoing_requests(user_id):
    user = User.query.get(user_id)
    outgoing = user.outgoing.all()

    return jsonify({"outgoing_requests": [ele.to_dict() for ele in outgoing] })

#Create outgoing request
@request_routes.route("/<int:invitee_id>", methods=["POST"])
@login_required
def create_request(invitee_id):
    invitee = User.query.get(invitee_id)
    inviter = get_user_model(current_user, User)
    print("11111111111111111111")
    print(invitee)
    if not invitee:
        raise NotFoundError("User not found.")
    res = inviter.create_request(invitee)
    inviter.outgoing = res.outgoing

    db.session.commit()
    return {"message": "Successfully Friend Requested", "statusCode": 201}

#Delete request
@request_routes.route("/<int:invitee_id>/inviter/<int:inviter_id>", methods=["DELETE"])
@login_required
def delete_request(invitee_id, inviter_id):
    invitee = User.query.get(invitee_id)
    inviter = User.query.get(inviter_id)
    if not (current_user.id == invitee_id or current_user.id == inviter_id):
        raise ForbiddenError("You are not authorized to delete request")
    if not invitee:
        raise NotFoundError(f'User {invitee} does not exist.')
    if not inviter:
        raise NotFoundError(f'User {inviter} does not exist.')
    if inviter not in invitee.friend_requests:
        return {"message": f"There is not request from user{inviter} to user{invitee}"}

    res = inviter.delete_request(invitee)
    inviter.outgoing = res.outgoing

    db.session.commit()
    return {"message": f"Successfully removed request from user{inviter} to user{invitee}"}
