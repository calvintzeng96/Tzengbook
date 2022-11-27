from app.models import db, User, environment, SCHEMA

# PROFILE_PIC ="profile-pic.png"
# Adds a demo user, you can add other users here if you want

def seed_users():
    instance1 = User(
        username='username1',
        email='email1@gmail.com',
        password='password1',
        first_name="John",
        last_name="Smith",
        # profile_picture=PROFILE_PIC,
        bio="Diversity&Inclusion educator. Author, Pin Ups (9/20). Columnist, The Writer mag."
    )
    instance2 = User(
        username='username2',
        email='email2@gmail.com',
        password='password2',
        first_name="Li",
        last_name="Sam",
        # profile_picture=PROFILE_PIC,
        bio="Leica, GR3, Sony, Minolta & Film user, Street Photographer based in Hong Kon"
    )
    instance3 = User(
        username='username3',
        email='email3@gmail.com',
        password='password3',
        first_name="Thomas",
        last_name="Christopher",
        # profile_picture=PROFILE_PIC,
        bio="Science, psychology, and history. Sometimes with a personal angle."
    )
    instance4 = User(
        username='username4',
        email='email4@gmail.com',
        password='password4',
        first_name="Than",
        last_name="Siegel",
        # profile_picture=PROFILE_PIC,
        bio="The Universe is: Expanding, cooling, and dark. It starts with a bang! #Cosmology Science writer, astrophysicist, science communicator & NASA columnist."
    )
    instance5 = User(
        username='username5',
        email='email5@gmail.com',
        password='password5',
        first_name="Cory",
        last_name="Doctrowrow",
        # profile_picture=PROFILE_PIC,
        bio="Writer, blogger, activist."
    )

    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.add(instance5)
    db.session.commit()

    # return [instance for instance in User.query.all()]

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
