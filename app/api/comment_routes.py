from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, Post, Comment
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError
from ..forms import PostForm, CommentForm
from .helpers import child_belongs_to_parent, get_user_model
from datetime import datetime


comment_routes = Blueprint('comments', __name__)


@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def edit_comment(comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        edited_comment = Comment.query.get(comment_id)
    if edited_comment:
        try:
            user = get_user_model(current_user, User)
            child_belongs_to_parent(user, edited_comment, 'user_id')
        except ForbiddenError as e:
            return {"error": e.message}, e.status_code
        edited_comment.content = data['content']
        edited_comment.created_at = datetime.now()
        db.session.commit()
        return jsonify(edited_comment.to_dict())
    else:
        raise NotFoundError("Comment not found")


# Delete a Comment
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    deleted_comment = Comment.query.get(comment_id)

    if deleted_comment:
        try:
            child_belongs_to_parent(get_user_model(
                current_user, User), deleted_comment, 'user_id')
        except ForbiddenError as e:
            return {"error": e.message}, e.status_code
        db.session.delete(deleted_comment)
        db.session.commit()
        return {"message": "Comment successfully deleted.", "statusCode": 200}
    else:
        raise NotFoundError("Comment not found")
