var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies.P_INFO) {
        res.render('index', {
            data: {
                title: 'Express'
            },
            request: req,
            isLogin: true,
            retcode: 200,
            retdesc: 'Express'
        });
    } else {
        res.cookie('P_INFO', 'mengchen', {
            maxAge: 365 * 24 * 60 * 60 * 1000
        });
        res.render('index', {
            data: {
                title: 'Error'
            },
            request: req,
            isLogin: false,
            retcode: 200,
            retdesc: 'Express'
        });
    }
});

module.exports = router;
