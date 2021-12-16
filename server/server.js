const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const expressJwt = require('express-jwt');
const { exit } = require('process');
const cors = require('cors');
const { sendMail } = require('./email');
const randomstring = require("randomstring");

const {
    Member,
} = require("./db/db");

const port = process.env.PORT || 4000;

const JWT_SECRET = '747-the-queen-of-the-skies';;
if (!JWT_SECRET) {
    console.error('JWT_SECRET env var must be defined');
    exit(1);
}

const verifyJwtMiddleware = expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] })

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyJwtMiddleware.unless({ path: ['/register', '/login', /^\/verify\/.*/] }));

app.get("/api/members", async (req, res) => {
    const members = await Member.find();
    res.send(members);
});

app.get("/api/membersasc", async (req, res) => {
    const members = await Member.find().sort({ age: 'asc' });
    res.send(members);
});

app.get("/api/membersascminimum", async (req, res) => {
    const { age } = req.body;
    if (!age) {
        const members = await Member.find().sort({ age: 'desc' });
        res.send(members);
    } else {
        const members = await Member.find().where('age').gt(age).sort({ age: 'asc' });
        res.send(members);
    }
});

app.get("/api/membersdesc", async (req, res) => {
    const members = await Member.find().sort({ age: 'desc' });
    res.send(members);
});

app.get("/api/membersdescminimum", async (req, res) => {
    const { age } = req.body;
    if (!age) {
        const members = await Member.find().sort({ age: 'desc' });
        res.send(members);
    } else {
        const members = await Member.find().where('age').gt(age).sort({ age: 'desc' });
        res.send(members);
    }

});

app.get("/api/membersaboveage/:age", async (req, res) => {
    const { age } = req.params;
    const members = await Member.find().where('age').gt(age);
    res.send(members);
});

app.post("/register", async (req, res) => {
    const { username, first_name, last_name, email, age, password } = req.body;
    Member.find({ $or: [{ username: username }, { email: email }] }, async function (err, arr) {
        if (arr.length > 0) {
            res.send({ message: "User already exists" })
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const uniquestring = randomstring.generate(10);
            const newUser = {
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                password: hashedPassword,
                isvalid: false,
                uniquestring: uniquestring,
            }
            const user = new Member(newUser);
            await user.save(function (err) {
                if (!err) {
                    sendMail(email, newUser.uniquestring);
                    res.send({ message: "Please Check your inbox" })
                } else {
                    res.send(err.errors);
                }

            });
        }
    })
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Member.find({ username: username });
    if (user.length === 0) {
        res.json({ data: 'User does not exist' });
    }
    if (!user[0].isvalid) {
        res.json({ data: 'Please verify your user' });
    } else {
        bcrypt.compare(password, user[0].password, function (err, result) {
            if (result === false) {
                res.json({ data: 'Invalid username/password' });
            } else {
                const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
                res.json({ status: 'Ok', data: token, user: user });
            }
        });
    }

})

app.get("/verify/:uniquestring", async (req, res) => {
    const { uniquestring } = req.params;
    const user = await Member.find({ uniquestring: uniquestring });
    if (user) {
        const response = await Member.updateOne({ uniquestring: uniquestring }, { isvalid: true, uniquestring: "" });
        res.redirect('http://localhost:3000/');
    } else {
        res.json("User not found");
    }
})
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Error occured');
    }
});

app.listen(port, () => {
    console.log("server is up");
});


