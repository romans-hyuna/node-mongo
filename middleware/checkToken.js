const jwt = require('jsonwebtoken');
const secretKey = require('../config.js').secretKey;
const userModel =  require('../models/userModel');


module.exports = (req, res, next) => {
    let dec;
    try {
        let token = req.header('x-access-token') || req.query.token;
        if (!token) {
            return res.status(401).json({message: "No x-access-token provided in headers"})
        }

        dec = jwt.verify(token, secretKey);
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Invalid token"})
    }

    userModel.findById(dec.id, function(err, user) {
        if (!user) {
            return res.status(401).json({message: "Can't find user."})
        }
        next()
    });

};