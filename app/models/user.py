from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.orm import validates
from .post import Post
from .request import requests


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    profile_picture = db.Column(db.String)
    bio = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    friend_requests = db.relationship(
        "User",
        secondary=requests,
        primaryjoin=(requests.c.invitee == id),
        secondaryjoin=(requests.c.inviter == id),
        backref=db.backref("outgoing", lazy="dynamic"),
        lazy="dynamic"
    )

    # friends = db.relationship(
    #     "User"
    # )

    # Relationships
    posts_destination = db.relationship(
        "Post", back_populates="user_destination", foreign_keys=[Post.wall_id])
    posts_author = db.relationship(
        "Post", back_populates="user_author", foreign_keys=[Post.user_id])
    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    # request_inviter = db.relationship("Request", back_populates="user_inviter", foreign_keys=[requests.inviter])
    # request_invitee = db.relationship("Request", back_populates="user_invitee", foreign_keys=[requests.invitee])

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @validates("outgoing")
    def validates_friend_requests(self, key, value):
        if value == self.id:
            raise ValueError("You can not friend request yourself")

    #Check/Create/Delete friend requests
    def already_requested(self, userId):
        return self.outgoing.filter(requests.c.invitee == userId).count() > 0

    def create_request(self, user):
        if not self.already_requested(user.id):
            self.outgoing.append(user)
            return self

    def delete_request(self, user):
        if self.already_requested(user.id):
            self.outgoing.remove(user)
            return self
    #------------------------------------

    def to_dict(self):
        return {
            'id': self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "bio": self.bio,
            "profilePicture": self.profile_picture,
            "created": self.created_at,
            # "requests_out": self.friend_requests.items,
            # "requests_in": self.outgoing.items,
        }

    # def to_dict_basic_info(self):
    #     return {
    #         'id': self.id,
    #         "firstName": self.first_name,
    #         "lastName": self.last_name,
    #         "profilePicture": self.profile_picture,
    #     }
