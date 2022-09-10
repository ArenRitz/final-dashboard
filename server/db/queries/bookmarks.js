const db = require('../../configs/db.config');



// getAllBookmarksForUser(); but also return bookmark id

// query to get all bookmarks for specific user by user ID returning bookmark id, bookmark title, bookmark url, category name, and category ID
// tables; users_categories, bookmarks
const getAllBookmarksForUser = (id) => {
	return db.query(`
	SELECT bookmarks.id, bookmarks.bookmark_title, bookmarks.bookmark_url, users_categories.category_name, users_categories.id AS user_category_id
	FROM bookmarks
	JOIN users_categories ON users_categories.id = bookmarks.user_category_id
	WHERE users_categories.user_id = $1
	`, [id]).then(data => {
		return data.rows;
	})
};




// query to delete bookmark from database for specific by category ID and bookmark title
const deleteBookmark = (category_id, title) => {
	
	return db.query("DELETE FROM bookmarks WHERE user_category_id = $1 AND bookmark_title = $2;", [category_id, title]).then(data => {
		return data.rows;
	})
}


//query to add new bookmark to database for specific user by category ID and bookmark title
const addBookmark = (category_id, title, url) => {
	return db.query("INSERT INTO bookmarks (user_category_id, bookmark_title, bookmark_url) VALUES ($1, $2, $3);", [category_id, title, url]).then(data => {
		return data.rows;
	})
}

// postGres querty to edit bookmark url and title in database by category ID and bookmark id 
const editBookmark = ( bookmark_id, title, url) => {
	return db.query("UPDATE bookmarks SET bookmark_title = $1, bookmark_url = $2 WHERE id = $3;", [title, url, bookmark_id]).then(data => {
		return data.rows;
	})
}








module.exports = {getAllBookmarksForUser, deleteBookmark, addBookmark, editBookmark}