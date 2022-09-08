const router = require('express').Router();

const bookmarks = require('../db/queries/bookmarks');


/* GET users listing. */
router.get('/:id', (req, res) => {
  bookmarks.getAllBookmarksForUser(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  })
});

module.exports = router;