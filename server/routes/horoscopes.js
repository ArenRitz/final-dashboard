const router = require('express').Router();
const horoscopes = require('../db/queries/horoscopes');

router.post('/update', (req, res) => {
  const { id, horoscope } = req.body;
  horoscopes.updateHoroscopeByUserId(id, horoscope)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    })
});

module.exports = router;