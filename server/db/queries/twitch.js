const db = require('../../configs/db.config');

// function to update the twitch_streamers array in the database
const updateTwitchStreamers = (streamers, id) => {
  return db.query(`
  UPDATE users
  SET twitch_streamers = $1
  WHERE users.id = $2;
  `, [streamers, id]).then(data => {
    return data.rows;
  }).catch(err => {
    return err;
  })
}










module.exports = {

}



