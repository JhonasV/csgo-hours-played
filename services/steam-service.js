const axios =  require("axios");
const timeUnitFormatter = require('../utils/time-unit');

const getSteamId = async (username) =>{
    let result = {success: false, message: '', steamdId: null}

    const response = await axios.get(`https://steamid.co/php/api.php?action=steamID&id=${username}`);
    if(response.status !== 200){
        result.message = `Error al consultar el steamId del usuario ${username}`;
        return result;
    }
        
    const data = response.data;
    if(data.steamID64 === undefined){
        result.message = `No se encontró el steamId para el usuario ${username}`;
        return result;
    }

    result.steamdId = data.steamID64;
    result.success = true;
    return result;
}

const getHoursStringify = async (steamId, username) => {
    let result = {success: false, message: ''}

    const response = await axios.get(`https://beta.decapi.me/steam/hours?id=${steamId}&appid=730`); 
    if(response.status !== 200){
        result.message = `Error al consultar las horas del usuario ${username}`; 
        return result;
    }

    let data = response.data;
    if(data.split(' ').length > 2){
        result.message = data;
        return result;
    }

    result.message = `El usuario ${username} tiene ${timeUnitFormatter(data)} en CSGO`;
    return result;
}

module.exports = {
    getHoursStringify,
    getSteamId
}

