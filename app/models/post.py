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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())


    #Relationships
    user_destination = db.relationship("User", back_populates="posts_destination", foreign_keys=[wall_id])
    user_author = db.relationship("User", back_populates="posts_author", foreign_keys=[user_id])
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    likes = db.relationship("Like", back_populates="post", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "wallId": self.wall_id,
            "userId": self.user_id,
            "content": self.content,
            "image": self.image,
            "createdAt": self.created_at,
            "User": self.user_author.to_dict()
        }

    def to_dict_with_comments(self):
        test = [ele.to_dict_with_user() for ele in self.comments]
        return {
            "id": self.id,
            "wallId": self.wall_id,
            "userId": self.user_id,
            "content": self.content,
            "image": self.image,
            "createdAt": self.created_at,
            "User": self.user_author.to_dict(),
            "Comments": test,
            "Comments_Count": len(test),
        }

    def to_dict_with_comments_likes(self):
        test = [ele.to_dict_with_user() for ele in self.comments]
        return {
            "id": self.id,
            "wallId": self.wall_id,
            "userId": self.user_id,
            "content": self.content,
            "image": self.image,
            "createdAt": self.created_at,
            "User": self.user_author.to_dict(),
            "Comments": test,
            "Comments_Count": len(test),
            "Like_Count": len(self.likes)
        }
