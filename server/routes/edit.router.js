const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/:id', (req, res) => {

    console.log('in router.put, edit router', req.body, req.params);
 

    if (req.isAuthenticated()) {
        const queryText = `UPDATE "recommended_southEast_deciduous"
        SET "img_url" = $1
        WHERE "id" = $2;`;

        pool.query(queryText, [req.body.data, req.params.id])

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
