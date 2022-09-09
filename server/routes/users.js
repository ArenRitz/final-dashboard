const router = require('express').Router();

const users = require('../db/queries/users');


/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});

router.get('/:id', (req, res) => {
  users.getUserById(req.params.id).then(data => {
    res.json(data);
  })
});


module.exports = router;