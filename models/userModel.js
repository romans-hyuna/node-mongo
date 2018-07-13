const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please fill a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

userSchema.statics.register = function(req, res) {
    return this.findOne({email: req.body.email, password: req.body.password})
        .then(data => {
            if (data) {
                return Promise.reject({message: 'User already exist'});
            }

            return this.create({email: req.body.email, password: req.body.password});
        })
};

module.exports = mongoose.model('User', userSchema);