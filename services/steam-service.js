const axios =  require("axios");

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
    if(data.includes('Cannot') || data.includes('An error') || data.includes('The player')){
        result.message = data;
        return result;
    }

    let hours = data.split(' ')[0];
    let hoursFormmated = new Intl.NumberFormat().format(hours);
    result.message = `El usuario ${username} tiene ${hoursFormmated} horas en CSGO`;
    return result;
}

module.exports = {
    getHoursStringify,
    getSteamId
}

