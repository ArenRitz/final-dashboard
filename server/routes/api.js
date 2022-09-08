const router = require('express').Router();

const users = require('../db/queries/users');


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



module.exports = router;


