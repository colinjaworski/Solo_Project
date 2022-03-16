const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET * trees for user
 */
 router.get('/', (req, res) => {

console.log('in router.get, search router')

    if (req.isAuthenticated()) {
        const queryText = `SELECT *
        FROM "recommended_southEast_deciduous"`;
        pool.query(queryText)

        .then((result) => {
          res.send(result.rows)
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        })
      } else {
          res.sendStatus(403);
      }
    });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;