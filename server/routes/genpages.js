var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require("bluebird");

var fs = Promise.promisifyAll(require("fs"));
var env = require('../env.js');
var request = require('request');
var dir = require('../common/dir.js');

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

/* 发布页面接口 */
router.post('/release', function(req, res, next) {
    var data = req.body;
    var filepath = './release/' + data.name + '.html';
    var formatData = decodeURI(data.html);
    fs.writeFile(filepath, formatData, function(err) {
        if(err) console.log(err);
        res.json({
            filepath: filepath,
            retcode: 200,
            retdesc: '下载成功'
        });
    });
});

/* 文件上传接口 */
router.post('/upload', require('../common/upload'));

/* 文件下载接口 */
router.post('/download', function(req, res, next) {
    var basepath = './files/download/';
    var randNum = Math.random().toString(16).slice(2);
    var filename = 'config.json';
    var filepath = basepath + randNum + ".json";
    var data = JSON.stringify(req.body);
    // console.log(req.body);
    //创建目录
    dir.mkdirsSync(basepath);
    fs.writeFile(filepath, data, function(err) {
        if(err) console.log(err);
        res.json({
            filepath: filepath,
            retcode: 200,
            retdesc: '下载成功'
        });
        // express的方法不好使
        // res.download(filepath, filename, function(err){
        //     if(err) console.log(err);
        //     fs.unlinkSync(filepath);
        // }); 

    });
});


/* 文件删除接口 */
router.post('/delete', function(req, res, next) {
    var filepath = JSON.stringify(req.body);
    fs.unlinkSync(filepath);
    res.json({
        retcode: 200,
        retdesc: '删除成功'
    });
});

/* 用户信息接口 */
router.get('/username', function(req, res, next) {
    // 查询数据库代码...
    res.json({
        data:{
            username: '魏天尧'
        },
        retcode: 200,
        retdesc: '请求成功'
    });
});


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
