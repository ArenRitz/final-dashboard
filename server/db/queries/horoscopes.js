const db = require('../../configs/db.config');

const getHoroscopeByUserId = (id) => {
	return db.query("SELECT horoscope_sign FROM users WHERE id = $1;", [id]).then(data => {
		return data.rows;
	})
}

module.exports = { getHoroscopeByUserId }