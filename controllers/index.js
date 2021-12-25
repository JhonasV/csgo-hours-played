const steamService = require('../services/steam-service');

const indexController = {};

indexController.getHours = async (req, res, next) => {

  const username = req.params.username;
  const steamIdResult = await steamService.getSteamId(username);

  if(!steamIdResult.success){
    return res.send(steamIdResult.message)
  }

  const result = await steamService.getHoursStringify(steamIdResult.steamdId ,username);
  res.send(result.message); 
}

module.exports = indexController;


