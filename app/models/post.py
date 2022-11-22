from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    wall_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String)

    #Relationships
    user_destination = db.relationship("User", back_populates="posts_destination", foreign_keys=[wall_id])
    user_author = db.relationship("User", back_populates="posts_author", foreign_keys=[user_id])
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "wallId": self.wall_id,
            "userId": self.user_id,
            "content": self.content,
            "image": self.image
        }
