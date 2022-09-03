const db = require('../../configs/db.config');

const getAllBookmarksForUser = (id) => {
	return db.query("SELECT * FROM bookmarks JOIN users_categories ON bookmarks.user_category_id = users_categories.id WHERE users_categories.user_id = $1;", [id]).then(data => {
		return data.rows;
	})
}



module.exports = {getAllBookmarksForUser}