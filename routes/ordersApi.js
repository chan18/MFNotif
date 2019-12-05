var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var router = express.Router({
    mergeParams: true
});
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/order', (req, res) => {
    res.json({
        query: req.query,
        params: req.params
    });
});

// export the orders-api-middleware
module.exports = router;