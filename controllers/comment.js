const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');

router.get('/', function(req,res) {
    db.comment.findAll()
    .then(function(comments) {
        res.render('favorites/show', {comments});
    });
});

router.get('/:id', function(req,res) {
    db.favorite.findById(req.params.id).then(function(favorite) {
        res.render('favorites/show', {favorite});
    });
});

router.post('/:id', function(req,res) {
    db.comment.create({
        content: req.body.content,
        favoriteId: req.body.favoriteId
    })
    .then(function(comment) {
        res.redirect('favorites/:id', {comment});
    });
});


module.exports = router;