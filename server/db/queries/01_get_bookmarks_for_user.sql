-- Write a query that returns all bookmarks for each category for a given user

SELECT * FROM bookmarks
JOIN users_categories ON bookmarks.user_category_id = users_categories.id
WHERE users_categories.user_id = $1;
