const router = require('express').Router();
const timezoneQuery = require('../db/queries/timezone');

router.post('/update', (req, res) => {
  const { id, timezone } = req.body;
  timezoneQuery.updateTimezoneByUserId(id, timezone)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    })
});

module.exports = router;