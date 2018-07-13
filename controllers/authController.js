const userModel =  require('../models/userModel');
const errorHandler = require('../errors/handleError');
const jwt = require('jsonwebtoken');
const secretKey = require('../config.js').secretKey;

function validateData(email, password) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return Promise.reject({message: 'Please fill a valid email address'});
    }
    console.log(password);
    if (!password || 0 === password.length) {
        return Promise.reject({message: 'Please fill a password'});
    }

    return Promise.resolve({email: email, password: password});
}

const userController = {
    auth: (req, res) => {
        return validateData(req.body.email, req.body.password)
            .then(data => {
                return userModel.findOne({email: data.email, password: data.password})
            })
            .then(data => {
                if (!data) {
                    return res.status(404).json({message: "Can't find user with this credentials"});
                }

                let token = jwt.sign({ id: data._id }, secretKey, {
                    expiresIn: 86400
                });

                return res.status(201).send({token: token});
            })
            .catch(errorHandler.handleError(res))
    },
    register: (req, res) => {
        return userModel.register(req, res)
            .then(data => {
                return res.status(201).json({message: "User created.", email: data.email});
            })
            .catch(errorHandler.handleError(res))
    }
};

module.exports = userController;