const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        console.log("signup ==> ", req.body)
        const email = req.body.email;
        const userExist = await User.findOne({email:email})
        console.log("userexist ", userExist)
        if(userExist!=null||userExist!=undefined){
            return res.status(400).json({ error:true, message: "User  was already registered successfully!" });
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        await user.save();
        if (req.body.roles) {
            try {
                const roles = await Role.find(
                    {
                        name: { $in: req.body.roles },
                    }
                );
                user.roles = roles.map((role) => role._id);
                try {
                    await user.save();
                    res.json({ error:false, message: "User was registered successfully!"});

                } catch (e) {
                    res.status(500).json({ message: e });
                    return;
                }
            } catch (err) {
                res.status(500).json({ message: err });
                return;
            }

        } else {
            try{
                const role = await Role.findOne({ name: "user" });
                    user.roles = [role._id];
                    console.log("user aa", user)
                    try{
                        await user.save();
                        res.json({ error:false, message: "User was registered successfully!" });
                    }catch(err){
                        res.status(500).json({ error:true, message: err });
                        return;
                    }
            }catch(e){
                res.status(500).json({ error:true, message: e });
                return;
            }
        }
    } catch (err) {
        res.status(500).json({ error:true, message: err });
        return;
    }
};

exports.signin =async (req, res) => {
    console.log("sign In ", req.body)
    try{
        const user = await User.findOne({
            email: req.body.email,
        })
        .populate("roles", "-__v")
        .exec();
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400*364, // 24 hours
                });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("" + user.roles[i].name);
            }

            req.session.token = token;

            res.status(200).json({
                error:false,
                data:{
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token:token
                },
                message:"Success"
            });
        
    }catch(e){
        res.status(500).json({error:true, message: e, data:null });
        return;
    }
    
};
exports.getMe =async (req, res) => {
    console.log("getMe ", req.userId);
    try{
        if(req.userId==null&&req.userId==undefined){
            return;
        }
        const user = await User.findOne({
            _id: req.userId
        })
        .populate("roles", "-__v")
        .exec();
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            req.session.token = token;

            res.status(200).json({
                error:false,
                data:{
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token:token
                },
                message:"Success"
            });
        
    }catch(e){
        res.status(500).json({error:true, message: e, data:null });
        return;
    }
    
};
exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).json({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};      