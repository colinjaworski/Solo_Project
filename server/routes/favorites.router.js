const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET * favorite trees for user
 */
router.get('/', (req, res) => {

  console.log('in router.get, favorites router')

  if (req.isAuthenticated()) {
    const queryText = `SELECT *
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
 * DELETE route 
 */
// **************************************************************************

router.delete('/:id', (req, res) => {

  console.log('in router.delete, favorites router', req.params.id);

  if (req.isAuthenticated()) {
    const queryText = `DELETE from "favorites" WHERE "user_id" = $1 and "tree_id" = $2;`
    pool.query(queryText, [req.user.id, req.params.id])

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

//***************************************************************************** */


/**
 * POST route 
 */
 router.post('/:id', (req, res) => {

  console.log('in router.post, favorites router', req.params.id);

  if (req.isAuthenticated()) {
    const queryText = `insert into favorites ("user_id", "tree_id")
    values ($1, $2);`
    pool.query(queryText, [req.user.id, req.params.id])

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

module.exports = router;