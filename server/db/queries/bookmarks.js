const db = require('../../configs/db.config');

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

//delete category via user id and category id
const deleteCategory = (user_id, category_id) => {
	return db.query("DELETE FROM users_categories WHERE user_id = $1 AND id = $2;", [user_id, category_id]).then(data => {
		return data.rows;
	})
}

//add category via user id and category name
const addCategory = (user_id, category_name) => {
	return db.query("INSERT INTO users_categories (user_id, category_name) VALUES ($1, $2);", [user_id, category_name]).then(data => {
		return data.rows;
	})
}

//edit category via user id and category name
const editCategory = (user_id, category_name, category_id) => {
	return db.query("UPDATE users_categories SET category_name = $1 WHERE user_id = $2 AND id = $3;", [category_name, user_id, category_id]).then(data => {
		return data.rows;
	})
}

const getAllBookmarksForUser = (id) => {
	return db.query(`
	SELECT bookmarks.id, bookmarks.bookmark_title, bookmarks.bookmark_url, users_categories.category_name, users_categories.id AS user_category_id
	FROM bookmarks
	RIGHT JOIN users_categories ON users_categories.id = bookmarks.user_category_id
	WHERE users_categories.user_id = $1
	`, [id]).then(data => {
		return data.rows;
	})
};

module.exports = {getAllBookmarksForUser, deleteBookmark, addBookmark, editBookmark, deleteCategory, addCategory, editCategory};