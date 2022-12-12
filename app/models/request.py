from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


requests = db.Table(
    "requests",
    db.Column("inviter", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id"))),
    db.Column("invitee", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
)
if environment == "production":
    requests.schema = SCHEMA
