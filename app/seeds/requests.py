from app.models import db, environment, SCHEMA

def seed_requests(users):
    user1 = users[0]
    user2 = users[1]
    user3 = users[2]
    user4 = users[3]
    user5 = users[4]
    user6 = users[5]
    user7 = users[6]
    user8 = users[7]
    user9 = users[8]
    user10 = users[9]
    user11 = users[10]
    user12 = users[11]

    # user2.outgoing.append(user1)
    user9.outgoing.append(user1)
    user10.outgoing.append(user1)
    user11.outgoing.append(user1)
    user12.outgoing.append(user1)

    db.session.commit()


def undo_requests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM requests")

    db.session.commit()
