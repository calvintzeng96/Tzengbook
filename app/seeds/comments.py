from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    instance1 = Comment(
        post_id=15,
        user_id=8,
        content="Life isn't about getting and having, it's about giving and being."
    )
    instance2 = Comment(
        post_id=5,
        user_id=1,
        content="Whatever the mind of man can conceive and believe, it can achieve."
    )
    instance3 = Comment(
        post_id=13,
        user_id=7,
        content="Strive not to be a success, but rather to be of value."
    )
    instance4 = Comment(
        post_id=17,
        user_id=11,
        content="Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference."
    )
    instance5 = Comment(
        post_id=1,
        user_id=5,
        content="I attribute my success to this: I never gave or took any excuse."
    )
    instance6 = Comment(
        post_id=18,
        user_id=1,
        content="You miss 100% of the shots you don't take."
    )
    instance7 = Comment(
        post_id=15,
        user_id=10,
        content="I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."
    )
    instance8 = Comment(
        post_id=10,
        user_id=8,
        content="The most difficult thing is the decision to act, the rest is merely tenacity."
    )
    instance9 = Comment(
        post_id=5,
        user_id=6,
        content="Every strike brings me closer to the next home run."
    )
    instance10 = Comment(
        post_id=3,
        user_id=3,
        content="Definiteness of purpose is the starting point of all achievement."
    )
    instance11 = Comment(
        post_id=3,
        user_id=6,
        content="We must balance conspicuous consumption with conscious capitalism."
    )
    instance12 = Comment(
        post_id=9,
        user_id=2,
        content="Life is what happens to you while you're busy making other plans."
    )
    instance13 = Comment(
        post_id=10,
        user_id=2,
        content="We become what we think about."
    )
    instance14 = Comment(
        post_id=4,
        user_id=6,
        content="14.Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover."
    )
    instance15 = Comment(
        post_id=14,
        user_id=10,
        content="15.Life is 10% what happens to me and 90% of how I react to it."
    )
    instance16 = Comment(
        post_id=2,
        user_id=4,
        content="The most common way people give up their power is by thinking they don't have any."
    )
    instance17 = Comment(
        post_id=11,
        user_id=8,
        content="The mind is everything. What you think you become."
    )
    instance18 = Comment(
        post_id=3,
        user_id=6,
        content="The best time to plant a tree was 20 years ago. The second best time is now."
    )
    instance19 = Comment(
        post_id=18,
        user_id=1,
        content="An unexamined life is not worth living."
    )
    instance20 = Comment(
        post_id=20,
        user_id=5,
        content="Eighty percent of success is showing up."
    )
    instance21 = Comment(
        post_id=1,
        user_id=9,
        content="Your time is limited, so don't waste it living someone else's life."
    )
    instance22 = Comment(
        post_id=6,
        user_id=12,
        content="Winning isn't everything, but wanting to win is."
    )
    instance23 = Comment(
        post_id=4,
        user_id=10,
        content="I am not a product of my circumstances. I am a product of my decisions."
    )
    instance24 = Comment(
        post_id=9,
        user_id=6,
        content="Every child is an artist.  The problem is how to remain an artist once he grows up."
    )
    instance25 = Comment(
        post_id=17,
        user_id=7,
        content="You can never cross the ocean until you have the courage to lose sight of the shore."
    )
    instance26 = Comment(
        post_id=3,
        user_id=8,
        content="I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."
    )
    instance27 = Comment(
        post_id=11,
        user_id=9,
        content="Either you run the day, or the day runs you."
    )
    instance28 = Comment(
        post_id=9,
        user_id=1,
        content="Whether you think you can or you think you can't, you're right."
    )
    instance29 = Comment(
        post_id=16,
        user_id=2,
        content="The two most important days in your life are the day you are born and the day you find out why."
    )
    instance30 = Comment(
        post_id=15,
        user_id=6,
        content="Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it."
    )
    instance31 = Comment(
        post_id=9,
        user_id=11,
        content="The best revenge is massive success."
    )
    instance32 = Comment(
        post_id=12,
        user_id=6,
        content="People often say that motivation doesn't last. Well, neither does bathing.  That's why we recommend it daily."
    )
    instance33 = Comment(
        post_id=3,
        user_id=12,
        content="Life shrinks or expands in proportion to one's courage."
    )
    instance34 = Comment(
        post_id=2,
        user_id=7,
        content="If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced."
    )
    instance35 = Comment(
        post_id=13,
        user_id=4,
        content="There is only one way to avoid criticism: do nothing, say nothing, and be nothing."
    )
    instance36 = Comment(
        post_id=14,
        user_id=9,
        content="Ask and it will be given to you; search, and you will find; knock and the door will be opened for you."
    )
    instance37 = Comment(
        post_id=20,
        user_id=6,
        content="The only person you are destined to become is the person you decide to be."
    )
    instance38 = Comment(
        post_id=10,
        user_id=7,
        content="Go confidently in the direction of your dreams.  Live the life you have imagined."
    )
    instance39 = Comment(
        post_id=6,
        user_id=2,
        content="When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me."
    )
    instance40 = Comment(
        post_id=8,
        user_id=9,
        content="Few things can help an individual more than to place responsibility on him, and to let him know that you trust him."
    )
    instance41 = Comment(
        post_id=4,
        user_id=11,
        content="Certain things catch your eye, but pursue only those that capture the heart."
    )
    instance42 = Comment(
        post_id=1,
        user_id=1,
        content="Believe you can and you're halfway there."
    )
    instance43 = Comment(
        post_id=4,
        user_id=11,
        content="Everything you've ever wanted is on the other side of fear."
    )
    instance44 = Comment(
        post_id=18,
        user_id=11,
        content="We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light."
    )
    instance45 = Comment(
        post_id=16,
        user_id=5,
        content="Teach thy tongue to say, “I do not know,” and thous shalt progress."
    )
    instance46 = Comment(
        post_id=10,
        user_id=1,
        content="Start where you are. Use what you have.  Do what you can."
    )
    instance47 = Comment(
        post_id=2,
        user_id=9,
        content="When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy'.  They told me I didn't understand the assignment, and I told them they didn't understand life."
    )
    instance48 = Comment(
        post_id=12,
        user_id=4,
        content="Fall seven times and stand up eight."
    )
    instance49 = Comment(
        post_id=15,
        user_id=6,
        content="When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us."
    )
    instance50 = Comment(
        post_id=2,
        user_id=11,
        content="Everything has beauty, but not everyone can see."
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
    db.session.add(instance13)
    db.session.add(instance14)
    db.session.add(instance15)
    db.session.add(instance16)
    db.session.add(instance17)
    db.session.add(instance18)
    db.session.add(instance19)
    db.session.add(instance20)
    db.session.add(instance21)
    db.session.add(instance22)
    db.session.add(instance23)
    db.session.add(instance24)
    db.session.add(instance25)
    db.session.add(instance26)
    db.session.add(instance27)
    db.session.add(instance28)
    db.session.add(instance29)
    db.session.add(instance30)
    db.session.add(instance31)
    db.session.add(instance32)
    db.session.add(instance33)
    db.session.add(instance34)
    db.session.add(instance35)
    db.session.add(instance36)
    db.session.add(instance37)
    db.session.add(instance38)
    db.session.add(instance39)
    db.session.add(instance39)
    db.session.add(instance40)
    db.session.add(instance41)
    db.session.add(instance42)
    db.session.add(instance43)
    db.session.add(instance44)
    db.session.add(instance45)
    db.session.add(instance46)
    db.session.add(instance47)
    db.session.add(instance48)
    db.session.add(instance49)
    db.session.add(instance50)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
