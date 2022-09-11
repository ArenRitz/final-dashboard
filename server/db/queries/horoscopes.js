const db = require('../../configs/db.config');

const getHoroscopeByUserId = (id) => {
	return db.query("SELECT horoscope_sign FROM users WHERE id = $1;", [id]).then(data => {
		return data.rows;
	})
}

const updateHoroscopeByUserId = (id, horoscope) => {
	return db.query("UPDATE users SET horoscope_sign = $1 WHERE id = $2;", [horoscope, id]).then(data => {
		return data.rows;
	})
}

module.exports = { getHoroscopeByUserId, updateHoroscopeByUserId };