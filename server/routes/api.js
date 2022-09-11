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
router.put('/bookmarks/:id/:category_id', (req, res) => {
  bookmarks.addBookmark(req.params.category_id, req.body.title, req.body.url).then(data => {
    //get all bookmarks for user after adding bookmark
    bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
      res.json(data);
    })
  })
})

// function to edit bookmark url and title in database by user ID, category ID, and bookmark id
router.put('/bookmarks/:bookmark_id', (req, res) => {
  bookmarks.editBookmark(req.params.bookmark_id, req.body.title, req.body.url).then(data => {
    //get all bookmarks for user after editing bookmark
    bookmarks.getAllBookmarksForUser(req.body.user_id).then(data => {
      res.json(data);
    })
  })
})


//function to delete category from database for specific user id by category id
router.delete('/categories/:id/:category_id', (req, res) => {
  bookmarks.deleteCategory(req.params.id, req.params.category_id).then(data => {
    //get all bookmarks for user after deleting category
    bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
      res.json(data);
    })
  })
})

//function to add category to database for specific user id by category name
router.put('/categories/:id', (req, res) => {
  bookmarks.addCategory(req.params.id, req.body.category_name).then(data => {
    //get all bookmarks for user after adding category
    bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
      res.json(data);
    })
  })
})

//function to edit category name in database for specific user id by category id
router.put('/categories/:id/:category_id', (req, res) => {
  bookmarks.editCategory(req.params.category_id, req.body.category_name).then(data => {
    //get all bookmarks for user after editing category
    bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
      res.json(data);
    })
  })
})




module.exports = router;


