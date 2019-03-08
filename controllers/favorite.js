const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');

router.get('/', function(req,res) {
    db.favorite.findAll().then(function(favorites) {
    res.render('favorites/index', {favorites});
    });
});

// fix routes for favorite
router.get('/:id', function(req,res) {
    let recipeUrl = 'https://api.edamam.com/search' + req.body.edamamUrl;
    request(recipeUrl, function(error, response, body) {
    let hits = JSON.parse(body).hits;
    res.render("profile", {hits});
    });
});

router.post('/', function(req,res) {
    db.favorite.create({
        title: req.body.title,
        edamamUrl: req.body.edamamUrl,
        userId: req.user.id
    }).then(function(favorites) {
        res.redirect('profile');
    });
});


module.exports = router;