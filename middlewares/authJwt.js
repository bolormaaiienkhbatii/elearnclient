const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    // console.log("req headers ", req.headers)
    // console.log("authozation ", req.headers['authorization'])

    let token = req.headers['authorization']?.split(" ")[1]
    //console.log("verify token ",token)
    //console.log("req  verify token ", req.body)
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};
emptyToken = (req, res, next) => {
    
    console.log("empty token ", req.body)
    next()
    /*
    let authorization =req.headers['authorization'];
    if(authorization==undefined||authorization==null){
        req.userId = null
        next();
        return
    }
    let tokenAll = authorization?.split(" ")||""

    console.log("token all ", tokenAll, req.headers['authorization'])
    if(tokenAll.length<2){
        req.userId = null
        next();
        return
    }
    
    let token = tokenAll[1]

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
        */
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();

        try {
            const roles = await Role.find(
                {
                    _id: { $in: user.roles },
                }
            );

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            return;

        } catch (e) {
            res.status(500).send({ message: e });
            return;
        }


    } catch (e) {
        res.status(500).send({ message: e });
        return;
    }

};

isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        try {
            const roles = await Role.find(
                {
                    _id: { $in: user.roles },
                }
            );
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!" });
            return;

        } catch (e) {
            res.status(500).send({ message: e });
            return;
        }

    } catch (e) {
        res.status(500).send({ message: e });
        return;
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    emptyToken
};
module.exports = authJwt;  