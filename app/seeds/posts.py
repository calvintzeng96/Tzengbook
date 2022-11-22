from app.models import db, Post, environment, SCHEMA


def seed_posts():
    instance1 = Post(
        wall_id= 1,
        user_id= 1,
        content="content1"
    )

    db.session.add(instance1)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
