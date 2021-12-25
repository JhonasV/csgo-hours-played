var express = require('express');
const steamService = require('../services/steam-service');
var router = express.Router();

/* GET home page. */
router.get('/api/v1/csgo/hours/:username', async function(req, res, next) {

  const username = req.params.username;
  const steamIdResult = await steamService.getSteamId(username);

  if(!steamIdResult.success){
    return res.send(steamIdResult.message)
  }

  const result = await steamService.getHoursStringify(steamIdResult.steamdId ,username);
  res.send(result.message); 
});

module.exports = router;
