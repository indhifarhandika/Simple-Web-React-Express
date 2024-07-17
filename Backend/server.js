const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL_FE = 'http://localhost:3001'

app.use(bodyParser.json());
app.use(passport.initialize());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Jika menggunakan kredensial (misalnya cookies)
    next();
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    knex('users').where({ email: profile.emails[0].value }).first()
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                const newUser = {
                    google_id: profile.id,
                    username: profile.emails[0].value,
                    email: profile.emails[0].value,
                    membership_type_id: 1
                };
                return knex('users').insert(newUser).then(ids => {
                    newUser.id = ids[0];
                    return done(null, newUser);
                });
            }
        })
        .catch(err => {
            return done(err);
        });
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    knex('users').where({ email: profile.emails[0].value }).first()
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                const newUser = {
                    facebook_id: profile.id,
                    username: profile.emails[0].value,
                    email: profile.emails[0].value,
                    membership_type_id: 1
                };
                return knex('users').insert(newUser).then(ids => {
                    newUser.id = ids[0];
                    return done(null, newUser);
                });
            }
        })
        .catch(err => {
            return done(err);
        });
}));

const generateToken = (user) => {
    console.log(process.env.JWT_SECRET)

    return jwt.sign({ id: user.id, membership_type: user.membership_type }, process.env.JWT_SECRET, { expiresIn: 86400 });
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(token, process.env.JWT_SECRET)
        if (err) return res.status(401).json({ error: err });
        req.user_id = decoded.id;
        req.membershipType = decoded.membership_type;
        next();
    });
};

// **********************************
// ************ ROUTE ***************
// **********************************

app.post('/register', async (req, res) => {
    const { email, password, username, membershipType } = req.body;
    let membership_type_id = 1
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        if(membershipType == 'A') {
            membership_type_id = 1
        } else if(membershipType == 'B') {
            membership_type_id = 2
        } else if(membershipType == 'C') {
            membership_type_id = 3
        }

        await knex('users').insert({ username, password: hashedPassword, email, membership_type_id });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Username/Email already exists' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await knex('users').where({ email }).first();
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ token });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(BASE_URL_FE + `/auth/success?token=${token}`);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(BASE_URL_FE + `/auth/success?token=${token}`);
});

app.get('/profile', authMiddleware, async (req, res) => {
    const user = await knex('users').where({ id: req.user_id }).first();
    const membership = await knex('membership_type').where({ id: user.membership_type_id }).first();
    const maxArticles = membership.max_articles === -1 ? 'All' : membership.max_articles;
    const maxVideos = membership.max_videos === -1 ? 'All' : membership.max_videos;
    
    
    res.json({ user, max_content: {maxArticles, maxVideos} });
});

app.get('/content', authMiddleware, (req, res) => {
    knex('users').where({ id: req.user_id }).first()
        .then(user => {
            if (!user) return res.status(404).json({ error: 'User not found' });
            knex('membership_type').where({ id: user.membership_type_id }).first()
                .then(membershipType => {
                    if (!membershipType) return res.status(404).json({ error: 'Membership type not found' });
                    const articleLimit = membershipType.max_articles;
                    const videoLimit = membershipType.max_videos;
                    if(articleLimit == -1 && videoLimit == -1) {
                        Promise.all([
                            knex.select().table('articles'),
                            knex.select().table('videos')
                        ]).then(([articles, videos]) => {
                            res.json({ articles, videos });
                        });
                    } else {
                        Promise.all([
                            knex('articles').limit(articleLimit),
                            knex('videos').limit(videoLimit)
                        ]).then(([articles, videos]) => {
                            res.json({ articles, videos });
                        });
                    }
                    
                });
        })
        .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
