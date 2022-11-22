from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    instance1 = Comment(
        post_id= 1,
        user_id= 1,
        content="comment1"
    )

    db.session.add(instance1)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
