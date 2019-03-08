const express = require('express');
const db = require('../models');
const router = express.Router();
const request = require('request');

// GET /search
router.get('/', function(req,res) {
        res.render('search');
    });

    
module.exports = router;