const db = require('../../configs/db.config');

//function to return the id, name and visibility of all widgets by user ID
const getAllWidgetsByUserID = (id) => {
  return db.query(`
  SELECT widgets.id, widgets.name, widgets.visibility
  FROM widgets
  WHERE widgets.user_id = $1;
  `, [id]).then(data => {
    return data.rows;
  }).catch(err => {
    return err;
  })
}

//function to update the visibility of all widget by name and user ID
const updateWidgetVisibility = (name, visibility, id) => {  
  return db.query(`
  UPDATE widgets
  SET visibility = $1
  WHERE widgets.name = $2
  AND widgets.user_id = $3;
  `, [visibility, name, id]).then(data => {
    return data.rows;
  }).catch(err => {
    return err;
  })
}








module.exports = {
  getAllWidgetsByUserID, 
  updateWidgetVisibility
}



