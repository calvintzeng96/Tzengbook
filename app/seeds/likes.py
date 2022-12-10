from app.models import db, Like, environment, SCHEMA


def seed_likes():
    instance1 = Like(
        post_id= 1,
        user_id= 1
    )

    db.session.add(instance1)
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
