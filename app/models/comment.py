from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("posts.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    #Relationships
    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")



    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.post_id,
            "userId": self.user_id,
            "content": self.content,
            "created": self.created_at
        }

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'content': self.content,
            "created_at": self.created_at,
            "user": self.user.to_dict()
        }
