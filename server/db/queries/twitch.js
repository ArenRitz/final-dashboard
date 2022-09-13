const db = require('../../configs/db.config');

// function to update the twitch_usernames array in the database returning the updated array
const updateTwitchStreamers = (streamers, id) => {
  return db.query(`
  UPDATE users
  SET twitch_usernames = $1
  WHERE id = $2
  RETURNING twitch_usernames;
  `, [streamers, id]).then(data => {
    return data.rows;
  })
}











module.exports = {
  updateTwitchStreamers
}



