from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, Post, Comment
from ..models.db import db
from ..errors import NotFoundError, ForbiddenError
from ..forms.post_form import PostForm
from .helpers import child_belongs_to_parent


comment_routes = Blueprint('comments', __name__)
