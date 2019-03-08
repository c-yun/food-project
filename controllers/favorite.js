const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');

router.get("/", function(req,res) {
    db.favorite.findAll().then(function(favorites) {
    res.render("favorites/index", {favorites});
    });
});

router.get('/favorites/:id', function(req,res) {
    db.favorite.findById(req.params.id).then(function(favorite) {
        res.render('favorites/show', {favorite})
    });
});

router.put('/favorites/:id', function(req,res) {
    db.favoriote.update({
        title: req.body.title,
        edamamUrl: req.body.edamamUrl,
        userId: req.user.id,
    }, { where: {id: req.params.id}}).then(function() {
        res.redirect('/favorites/' + parseInt(req.params.id))
    });
});

router.post("/", function(req,res) {
    db.favorite.create({
    title: req.body.title,
    edamamUrl: req.body.edamamUrl,
    userId: req.body.id
    })
    .then(function(favorite) {
    res.redirect("/favorites");
    });
});




module.exports = router;