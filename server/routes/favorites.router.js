const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET * favorite trees for user
 */
 router.get('/', (req, res) => {

console.log('in router.get, favorites router')

    if (req.isAuthenticated()) {
        const queryText = `SELECT species
        FROM "recommended_southEast_deciduous"
        JOIN "favorites"
        ON "recommended_southEast_deciduous"."id"="favorites"."tree_id" 
        JOIN "user" on "favorites"."user_id"="user"."id"
        WHERE "user"."id" = $1;`;
        pool.query(queryText, [req.user.id])

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