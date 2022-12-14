from app.models import db, environment, SCHEMA

def seed_friends(users):
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

    #connection(needs to go both ways)

    user2.friends_list1.append(user1)
    user2.friends_list2.append(user1)
    user3.friends_list1.append(user1)
    user3.friends_list2.append(user1)
    user4.friends_list1.append(user1)
    user4.friends_list2.append(user1)


    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()
