const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET * trees for user
 */
router.get(`/:deciduous/:shadeTolerance/:maxHeight/:maxWidth/`, (req, res) => {

    console.log('in router.get', req.params.shadeTolerance)

    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "recommended_trees" 
        WHERE "deciduous" = $1 AND "shade_tolerance" = $2 AND "height" <= $3 AND "width" <= $4`;

        pool.query(queryText, [req.params.deciduous, req.params.shadeTolerance, req.params.maxHeight, req.params.maxWidth])

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