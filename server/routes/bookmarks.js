const router = require('express').Router();

const bookmarks = require('../db/queries/bookmarks');



// get all bookamrks for user, even empty categories

router.get('/:id', (req, res) => {
  bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
    res.json(data);
  })
});


module.exports = router;