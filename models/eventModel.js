const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    date_added: {
        type: String,
        default: Math.round(new Date().getTime()/1000.0)
    }
});

eventSchema.statics.findAllWithPagination = function(req, res) {
    let perPage = req.query.per_page || 10;
    let page = Math.max(0, req.query.page -1);
    let sort = req.query.sort || 'desc';

    return this.find()
        .limit(perPage)
        .skip(page * perPage)
        .sort({
            date: sort
        })
};

module.exports = mongoose.model('Event', eventSchema);