let test = [{ "quote": "Life isn't about getting and having, it's about giving and being."},
{ "quote": "Whatever the mind of man can conceive and believe, it can achieve."},
{ "quote": "Strive not to be a success, but rather to be of value."},
{ "quote": "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference."},
{ "quote": "I attribute my success to this: I never gave or took any excuse."},
{ "quote": "You miss 100% of the shots you don't take."},
{ "quote": "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."},
{ "quote": "The most difficult thing is the decision to act, the rest is merely tenacity."},
{ "quote": "Every strike brings me closer to the next home run."},
{ "quote": "Definiteness of purpose is the starting point of all achievement."},
{ "quote": "We must balance conspicuous consumption with conscious capitalism."},
{ "quote": "Life is what happens to you while you're busy making other plans."},
{ "quote": "We become what we think about."},
{ "quote": "14.Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover."},
{ "quote": "15.Life is 10% what happens to me and 90% of how I react to it."},
{ "quote": "The most common way people give up their power is by thinking they don't have any."},
{ "quote": "The mind is everything. What you think you become."},
{ "quote": "The best time to plant a tree was 20 years ago. The second best time is now."},
{ "quote": "An unexamined life is not worth living."},
{ "quote": "Eighty percent of success is showing up."},
{ "quote": "Your time is limited, so don't waste it living someone else's life."},
{ "quote": "Winning isn't everything, but wanting to win is."},
{ "quote": "I am not a product of my circumstances. I am a product of my decisions."},
{ "quote": "Every child is an artist.  The problem is how to remain an artist once he grows up."},
{ "quote": "You can never cross the ocean until you have the courage to lose sight of the shore."},
{ "quote": "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."},
{ "quote": "Either you run the day, or the day runs you."},
{ "quote": "Whether you think you can or you think you can't, you're right."},
{ "quote": "The two most important days in your life are the day you are born and the day you find out why."},
{ "quote": "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it."},
{ "quote": "The best revenge is massive success."},
{ "quote": "People often say that motivation doesn't last. Well, neither does bathing.  That's why we recommend it daily."},
{ "quote": "Life shrinks or expands in proportion to one's courage."},
{ "quote": "If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced."},
{ "quote": "There is only one way to avoid criticism: do nothing, say nothing, and be nothing."},
{ "quote": "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you."},
{ "quote": "The only person you are destined to become is the person you decide to be."},
{ "quote": "Go confidently in the direction of your dreams.  Live the life you have imagined."},
{ "quote": "When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me."},
{ "quote": "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him."},
{ "quote": "Certain things catch your eye, but pursue only those that capture the heart."},
{ "quote": "Believe you can and you're halfway there."},
{ "quote": "Everything you've ever wanted is on the other side of fear."},
{ "quote": "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light."},
{ "quote": "Teach thy tongue to say, “I do not know,” and thous shalt progress."},
{ "quote": "Start where you are. Use what you have.  Do what you can."},
{ "quote": "When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy'.  They told me I didn't understand the assignment, and I told them they didn't understand life."},
{ "quote": "Fall seven times and stand up eight."},
{ "quote": "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us."},
{ "quote": "Everything has beauty, but not everyone can see."}]
function spreadComment(test) {
    let arr = []
    for (let i = 0; i < test.length; i++) {
        arr.push(test[i].quote)
    }
    return arr
}

let newArray = spreadComment(test)
// console.log(newArray[0])

for (let i = 0; i < 50; i++) {
    let random20 = Math.floor(Math.random() * 20 + 1)
    let random12 = Math.floor(Math.random() * 12 + 1)
    let a = `instance${i + 1} = Comment (`
    let b = `post_id= ${random20}`
    let c = `user_id= ${random12}`
    let d = `content= "${newArray[i]}"`
    let e = ")"
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
    console.log(e)
}
