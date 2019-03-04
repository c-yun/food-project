const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', function(req, res) {
    db.event.findAll()
    .then(function(events) {
        res.render('events/index', {events})
    });
});

// POST /events - creates a new event
router.post('/', function(req, res) {r
    db.event.create(
        {name: req.body.name}
    ).then(function(event) {
        res.redirect('/events');
    });
});

// GET /events/new - sends the form for creating a new event
router.get('/new', function(req, res) {
    res.render('events/new');
});

// GET /events/:id - show one event and their recipes
router.get('/:id', function(req, res) {
    db.event.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.recipe]
    }).then(function(event) {
        res.render('events/show', {event});
    });
});

module.exports = router;