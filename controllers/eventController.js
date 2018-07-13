const eventModel = require("../models/eventModel");
const errorHandler = require('../errors/handleError');

const eventController = {
    createEvent: (req, res) => {
        return eventModel.create(
            {
                name: req.body.name,
                date: req.body.date
            }
        )
            .then((data) => {
                return res.status(201).json({message: "Event created.", id: data._id});
            })
            .catch(errorHandler.handleError(res))
    },
    getEvents: (req, res) => {
        return eventModel.findAllWithPagination(req, res)
            .then(data => {
                return res.json(data);
            })
            .catch(errorHandler.handleError(res))
    },
    deleteEvent: (req, res) => {
        return eventModel.findByIdAndDelete(req.params.id)
            .then(data => {
                if (data) {
                    return res.json({message: 'Event deleted successfully.', id: data._id});
                }

                return res.status(404).json({message: "Can't find event by this id"});
            })
            .catch(errorHandler.handleError(res))
    },
    updateEvent: (req, res) => {
        return eventModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                date: req.body.date
            },
            {
                runValidators: true
            }
        )
            .then(data => {
                return res.json({message: 'Event updated successfully.', id: data._id});
            })
            .catch(errorHandler.handleError(res))
    }
};

module.exports = eventController;