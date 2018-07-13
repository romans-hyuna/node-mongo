const express = require('express');
const router = express.Router();
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const checkToken = require("../middleware/checkToken");

//auth routes
router.post('/register', authController.register);
router.post('/auth', authController.auth);

//event routes
router.get('/events', checkToken ,eventController.getEvents);
router.post('/events', checkToken, eventController.createEvent);
router.put('/events/:id', checkToken, eventController.updateEvent);
router.delete('/events/:id', checkToken ,eventController.deleteEvent);

module.exports = router;