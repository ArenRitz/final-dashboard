const db = require('../../configs/db.config');

const getAllUsers = () => {
	return db.query("SELECT * FROM users;").then(data => {
		return data.rows;
	})
}

const getUserById = id => {
	return db.query("SELECT * FROM users WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}


// widget names = Horoscope, Twitch, Recipe, Clock, Bookmarks, Weather, Spotify, Maps, Search
// function to create new user in database and then create all widgets for that user in database, returns user id to client
const createUser = (user) => {
	console.log('creating user');
	return db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;", [user.username, user.email, user.password]).then(data => {
		console.log('user created');
		return data.rows[0].id;
	}).then(id => {
		console.log('creating widgets');
		return db.query("INSERT INTO widgets (user_id, name, visibility) VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $7), ($1, $8, $9), ($1, $10, $11), ($1, $12, $13), ($1, $14, $15), ($1, $16, $17), ($1, $18, $19);", [id, 'Horoscope', true, 'Twitch', true, 'Recipe', true, 'Clock', true, 'Bookmarks', true, 'Weather', true, 'Spotify', true, 'Maps', true, 'Search', true]).then(data => {
			console.log('widgets created');
			return id;
		})
	})
}


const loginUser = (user) => {
	return db.query("SELECT id FROM users WHERE email = $1 AND password = $2;", [user.email, user.password]).then(data => {	
		return data.rows[0].id;
	}).catch(err => {
		return err;
	})
}

const saveWorkHome = (data) => {
	return db.query(
		`
		UPDATE users SET home_location = $1, work_location = $2
		WHERE id = $3;
		`,
		[data.home_location, data.work_location, data.id]
	).then(data => {
		return data.rows[0];
	}).catch(err => {
		return err;
	})

}

// update user theme in database
const updateTheme = (theme, id) => {
	return db.query("UPDATE users SET theme = $1 WHERE id = $2;", [theme, id]).then(data => {
		return data.rows[0];
	}).catch(err => {
		return err;
	})
}

// update search engine in database
const updateSearchEngine = (searchEngine, id) => {
	return db.query("UPDATE users SET search_engine = $1 WHERE id = $2;", [searchEngine, id]).then(data => {
		return data.rows[0];
	}).catch(err => {
		return err;
	})
}




module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	loginUser,
	saveWorkHome,
	updateTheme,
	updateSearchEngine
}



