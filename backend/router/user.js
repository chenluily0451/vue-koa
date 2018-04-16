/**
 * Created by chenlu on 2018/4/3.
 */
const router = require('koa-router')();
const userInfoController = require('../controller/register')

const register = router.post('/register', userInfoController.singUp)
                       .post('/login', userInfoController.signIn)
                       .get('/users', userInfoController.getAllUsers)

module.exports = register