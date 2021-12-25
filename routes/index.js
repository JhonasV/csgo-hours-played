var express = require('express');
var router = express.Router();

const indexController = require('../controllers');

router.get('/api/v1/csgo/hours/:username', indexController.getHours);


module.exports = router;