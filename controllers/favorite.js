const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');
const methodOverride = require('method-override');

router.get("/", function(req,res) {
    db.favorite.findAll().then(function(favorites) {
    res.render("favorites/index", {favorites});
    });
});

router.get('/:id', function(req,res) {
    db.favorite.findById(req.params.id).then(function(favorite) {
        res.render('favorites/show', {favorite});
    });
});

router.get('/:id/edit', function(req,res) {
    db.favorite.findById(parseInt(req.params.id))
    .then(function(favorites) {
        res.render('favorites/edit', {favorites});
    });
});

router.post("/", function(req,res) {
    db.favorite.create({
    title: req.body.title,
    edamamUrl: req.body.edamamUrl,
    userId: req.body.id,
    notes: req.body.notes
    })
    .then(function(favorite) {
    res.redirect("/favorites");
    });
});

router.put('/:id', function(req,res) {
    db.favorite.update({
        title: req.body.title,
    }, { where: {id: req.user.id}})
    .then(function() {
        res.redirect('/favorites/');
    });
});

router.delete("/:id", function(req,res) {
    db.favorite.destroy({
    where: {id: req.params.id}
    })
    .then(function(favorites) {
    res.redirect("/favorites/");
    });
});




module.exports = router;