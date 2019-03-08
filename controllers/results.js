const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');


// GET /results
router.get('/', function(req,res) {
    let recipeUrl = `https://api.edamam.com/search?q=${req.query.search}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&from=0&to=9`;
    request(recipeUrl, function(err, response, body) {
        let hits = JSON.parse(body).hits;
        res.render('results', {hits});
        // res.json(hits);
    });
});

// router.post("/", function(req,res) {
//     db.favorite.create({
//       name: req.body.name
//     }).then(function(favorites) {
//       res.redirect("/favorite");
//     });
//   });




module.exports = router;