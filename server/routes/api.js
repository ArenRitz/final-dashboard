const router = require('express').Router();

const users = require('../db/queries/users');
const bookmarks = require('../db/queries/bookmarks');


// put request for creating new user in database, returns user id to client or error if user with that email already exists

router.put('/users', (req, res) => {
  users.createUser(req.body).then(data => {
    res.json({id: data});
  }).catch(err => {
    res.json({error: err});
  })
})

// put reqest for logging in user, returns user id to client or error if user with that email does not exist
  router.put('/login', (req, res) => {
    users.loginUser(req.body).then(data => {
      res.json({id: data});
    }).catch(err => {
      res.json({error: err});
    })
  })

//function to delete bookmark from database for specific user id by bookmark title and category name
router.delete('/bookmarks/:id/:category_id/:title', (req, res) => {
  bookmarks.deleteBookmark(req.params.category_id, req.params.title).then(data => {
      //get all bookmarks for user after deleting bookmark
      bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
        res.json(data);
      })
  })
})


// function to add bookmark to database for specific user by category ID and bookmark title
router.post('/bookmarks/:id/:category_id', (req, res) => {
  bookmarks.addBookmark(req.params.category_id, req.body.title, req.body.url).then(data => {
    //get all bookmarks for user after adding bookmark
    bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
      res.json(data);
    })
  })
})




module.exports = router;


