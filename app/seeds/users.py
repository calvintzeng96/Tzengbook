from app.models import db, User, environment, SCHEMA

# PROFILE_PIC ="profile-pic.png"
# Adds a demo user, you can add other users here if you want

def seed_users():
    instance1 = User(
        username='username1',
        email='email1@gmail.com',
        password='password1',
        first_name="Jane",
        last_name="Smith",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1382731.jpg",
        # profile_picture=PROFILE_PIC,
        bio="Diversity&Inclusion educator. Author, Pin Ups (9/20). Columnist, The Writer mag."
    )
    instance2 = User(
        username='username2',
        email='email2@gmail.com',
        password='password2',
        first_name="Li",
        last_name="Sam",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-merve-13199813.jpg",
        bio="Leica, GR3, Sony, Minolta & Film user, Street Photographer based in Hong Kon"
    )
    instance3 = User(
        username='username3',
        email='email3@gmail.com',
        password='password3',
        first_name="Thomas",
        last_name="Christopher",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-mohamed-abdelghaffar-771742.jpg",
        bio="Science, psychology, and history. Sometimes with a personal angle."
    )
    instance4 = User(
        username='username4',
        email='email4@gmail.com',
        password='password4',
        first_name="Than",
        last_name="Siegel",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-nikola-vuckovic-11497216.jpg",
        bio="The Universe is: Expanding, cooling, and dark. It starts with a bang! #Cosmology Science writer, astrophysicist, science communicator & NASA columnist."
    )
    instance5 = User(
        username='username5',
        email='email5@gmail.com',
        password='password5',
        first_name="Cory",
        last_name="Doctrowrow",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-anastasiia-shevchenko-10568834.jpg",
        bio="Writer, blogger, activist."
    )
    instance6 = User(
        username='username6',
        email='email6@gmail.com',
        password='password6',
        first_name="Clive",
        last_name="Thompson",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-pixabay-220453.jpg",
        bio="I write 3X a week on tech, science, culture — and how those collide. Writer at NYT mag/Wired; author, 'Coders'. "
    )
    instance7 = User(
        username='username7',
        email='email7@gmail.com',
        password='password7',
        first_name="Shana",
        last_name="Frey",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-pixabay-415829.jpg",
        bio="Thought leader in mind mapping, visual thinking and creativity for 15+ years. Relentless explorer, learner and dot-collector. I help you elevate your thinking."
    )
    instance8 = User(
        username='username8',
        email='email8@gmail.com',
        password='password8',
        first_name="Daniel",
        last_name="Burrus",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-roel-varor-14531499.jpg",
        bio="#1 Bestselling Author, Global Futurist, Innovation Expert and Keynote Speaker. One of the Worlds Leading Futurists on Global Trends and Innovation."
    )
    instance9 = User(
        username='username9',
        email='email9@gmail.com',
        password='password9',
        first_name="Cait",
        last_name="Mack",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-david-bartus-610294.jpg",
        bio="Lean Living: I simplify everything so you can focus on crushing life"
    )
    instance10 = User(
        username='username10',
        email='email10@gmail.com',
        password='password10',
        first_name="Ben",
        last_name="LeFort",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-sergey-meshkov-11478016.jpg",
        bio="Making of a Millionaire editor | Personal finance writer | Author of 'The Financial Freedom Equation'"
    )
    instance11 = User(
        username='username11',
        email='email11@gmail.com',
        password='password11',
        first_name="Emily",
        last_name="Kernan",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-ann-martynova-3484670.jpg",
        bio="Quality over quantity. Always on the hunt for a good story. That guy from Quora. Writing out of Tampa, Florida."
    )
    instance12 = User(
        username='username12',
        email='email12@gmail.com',
        password='password12',
        first_name="Jamie",
        last_name="Jackson",
        profile_picture="https://tzengbook.s3.us-east-2.amazonaws.com/sample+profile+photos/pexels-george-dolgikh-1310522.jpg",
        bio="Between two skies."
    )
    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.add(instance4)
    db.session.add(instance5)
    db.session.add(instance6)
    db.session.add(instance7)
    db.session.add(instance8)
    db.session.add(instance9)
    db.session.add(instance10)
    db.session.add(instance11)
    db.session.add(instance12)
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
