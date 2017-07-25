var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require("bluebird");

var fs = Promise.promisifyAll(require("fs"));
var env = require('../env.js');
var dir = require('../common/dir.js');
var bcrypt = require('bcrypt');


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

/* 平台密码验证接口 */
router.post('/verifyPassWord', function(req, res, next) {
    let password = req.body.password;
    let filepath = './data/password.json';
    fs.readFile(filepath, 'utf-8', function(err, data) {
        if(err) console.log(err);
        let tmp = JSON.parse(data);
        bcrypt.compare(password, tmp.value, function(err, result) {
            if(result){
                res.json({
                    retcode: 200,
                    retdesc: '验证成功'
                });
            }else{
                res.json({
                    retcode: 400,
                    retdesc: '验证失败'
                });
            }
        });
    });
});

/* 检查目录接口 */
router.post('/checkDirname', function(req, res, next) {
    let dirname = req.body.dirname;
    let filepath = './data/';
    let existDirname = [];
    fs.readdir(filepath, function(err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function(file) {
            let stats = fs.statSync(filepath + file);
            if(stats.isDirectory() && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(file)){
                existDirname.push(file);
            }
        });
        if(existDirname.indexOf(dirname) != -1){
            res.json({
                retcode: 201,
                retdesc: '发布目录已存在'
            });
        }else{
            res.json({
                retcode: 200,
                retdesc: '新的发布目录'
            });
        }
    });
});


module.exports = router;








