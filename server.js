const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const path = require('path')
const {fileURLToPath} = require('url')
// const __filename= fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename)
console.log(__dirname)

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "bezkoder-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true
    })
);
const dbConfig = require('./config/db.config')

const db = require("./models");
const Role = db.role;
db.mongoose
    .connect(`${dbConfig.HOST}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
// simple route
// app.post("/", (req, res) => {
//     console.log("req ", req.body)
//     res.json({ message: "Welcome to bezkoder application." });
// });
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/course.routes')(app);
require('./routes/post.routes')(app);
require('./routes/category.routes')(app);
require('./routes/payment.routes')(app);

app.use(express.static(path.join(__dirname, '/user-app/build')))
app.get("*", (req, res)=>res.sendFile(path.join(__dirname,'/user-app/build/index.html')))


// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


async function initial() {
    let count = await Role.estimatedDocumentCount();
    console.log(count)
    if (count == 0) {
        try {
            const userResult = new Role({
                name: "user"
            })
            await userResult.save();
            console.log("added 'user' to roles collection");
        } catch (e) {
            console.log("error", e);
        }

        try {
            const moderator = new Role({
                name: "moderator"
            });
            await moderator.save();
            console.log("added 'moderator' to roles collection");
        } catch (e) {
            console.log("error", e);

        }
        try {
            const adminResult = new Role({
                name: "admin"
            });
            await adminResult.save();
            console.log("added 'admin' to roles collection");
        } catch (e) {
            console.log("error", e);
        }


    }
}