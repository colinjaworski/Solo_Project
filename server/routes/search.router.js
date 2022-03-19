const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET * trees for user
 */
router.get(`/:maxHeight/:maxWidth/`, (req, res) => {

    console.log(`in router.get, search router, max height: ${req.params.maxHeight}, max width: ${req.params.maxWidth}`)

    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "recommended_trees" 
        WHERE "height" <= $1 AND "width" <= $2`;

        pool.query(queryText, [req.params.maxHeight, req.params.maxWidth])

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