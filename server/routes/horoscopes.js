const router = require('express').Router();
const horoscopes = require('../db/queries/horoscopes');

/* GET users listing. */
router.get('/:id', (req, res) => {
  horoscopes.getHoroscopeByUserId(req.params.id).then(data => {
    res.send({ data });
  })
});

module.exports = router;