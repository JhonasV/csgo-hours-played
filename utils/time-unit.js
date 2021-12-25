const units = require('./units-translated');

module.exports = (timePlayed) => {
    let count = timePlayed.split(' ')[0];
    let unit = timePlayed.split(' ')[1];
    let hoursFormmated = new Intl.NumberFormat().format(count);
    return `${hoursFormmated} ${units[unit]}`;
}