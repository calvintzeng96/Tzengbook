from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


friends = db.Table(
    "friends",
    db.Column("friend1", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id"))),
    db.Column("friend2", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
)
if environment == "production":
    friends.schema = SCHEMA
