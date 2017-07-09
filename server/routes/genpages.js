var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require("bluebird");

var fs = Promise.promisifyAll(require("fs"));
var env = require('../env.js');


router.param(['id', 'page'], function(req, res, next, value) {
    console.log('CALLED ONLY ONCE with', value);
    next();
})

/* 获取pagemake页面. */
router.get('/', function(req, res, next) {
    res.render('genpages', {
        data: {
            title: 'pagemaker'
        },
        request: req,
        isLogin: true,
        retcode: 200,
        retdesc: 'Express'
    });
});

/* 图片上传接口 */
router.post('/upload', require('../common/upload'));
/* 获取pagemake页面. */
router.get('/preview/:product/:name/', function(req, res, next) {
    var product = req.params.product,
        fileName = req.params.name;
    var options = {
        root: path.resolve(env.tmpdir, product, fileName),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile('index.html', options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
});

/* 检查目录可用性. */
router.all('/checkdir', function(req, res, next) {
    var body = req.body,
        product = body.product || 'all',
        dir = body.dir;
    if (env.refuse(product)) {
        res.json({
            retcode: 400,
            retdesc: '产品权限不足'
        });
        return;
    }
    if (dir) {
        var fullDir = path.resolve(env.tmpdir, product, dir);
        fs.existsSync(fullDir) ? res.json({
            retcode: 200,
            retdesc: '目录已存在'
        }) : res.json({
            retcode: 200,
            retdesc: '目录可使用'
        });
    } else {
        res.json({
            retcode: 400,
            retdesc: '参数错误'
        });
    }
});

/* 生成目录接口. */
router.post('/gen', function(req, res, next) {
    var retdesc,
        body = req.body,
        product = body.product || 'all',
        dir = body.dir,
        force = +body.force,
        password = body.pass,
        html = body.html;
    body.newpass = body.newpass || body.pass;
    if (env.refuse(product)) {
        res.json({
            retcode: 400,
            retdesc: '产品权限不足'
        });
        return;
    }
    if (dir && html) {
        var fullDir = path.resolve(env.tmpdir, product, dir),
            fullPath = path.resolve(fullDir, 'index.html'),
            configPath = path.resolve(fullDir, 'config.json');
        if (fs.existsSync(fullDir)) {
            fs.readFileAsync(configPath, "utf8").then(function(data) {
                var config = JSON.parse(data);
                if (force) {
                    if (config.newpass === undefined || config.newpass === password) {
                        fs.writeFileAsync(configPath, JSON.stringify(body)).then(function() {
                            return fs.writeFileAsync(fullPath, html);
                        }).then(function() {
                            res.json({
                                retcode: 400,
                                retdesc: '文件覆盖成功'
                            });
                        }).catch(Error, function(e) {
                            res.json({
                                retcode: 400,
                                retdesc: '配置写入失败'
                            });
                        }).catch(Error, function(e) {
                            res.json({
                                retcode: 400,
                                retdesc: '文件覆盖失败'
                            });
                        })
                    } else {
                        res.json({
                            retcode: 400,
                            retdesc: '密码错误，操作失败'
                        });
                    }
                } else {
                    res.json({
                        retcode: 400,
                        retdesc: '非强制修改，操作失败'
                    });
                }
            }).catch(Error, function(e) {
                res.json({
                    retcode: 400,
                    retdesc: '配置读出失败'
                });
            })
        } else {
            fs.mkdirAsync(fullDir).then(function() {
                return fs.writeFileAsync(configPath, JSON.stringify(body));
            }).then(function() {
                return fs.writeFileAsync(fullPath, html);
            }).then(function() {
                res.json({
                    retcode: 200,
                    retdesc: '文件创建成功'
                });
            }).catch(Error, function(e) {
                res.json({
                    retcode: 400,
                    retdesc: '目录创建失败'
                });
            }).catch(Error, function(e) {
                res.json({
                    retcode: 400,
                    retdesc: '配置写入失败'
                });
            }).catch(Error, function(e) {
                res.json({
                    retcode: 400,
                    retdesc: '文件创建失败'
                });
            })
        }
    } else {
        res.json({
            retcode: 400,
            retdesc: '参数错误'
        });
    }
});

module.exports = router;
