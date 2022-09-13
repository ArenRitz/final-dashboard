const db = require('../../configs/db.config');

const getTimezoneByUserId = (id) => {
  return db.query("SELECT timezone FROM users WHERE id = $1;", [id]).then(data => {
    return data.rows;
  })
}

const updateTimezoneByUserId = (id, timezone) => {
  return db.query("UPDATE users SET timezone = $1 WHERE id = $2;", [timezone, id]).then(data => {
    return data.rows;
  })
}

module.exports = {
  getTimezoneByUserId,
  updateTimezoneByUserId
};