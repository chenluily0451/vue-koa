/**
 * Created by chenlu on 2018/4/3.
 */

const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const routers = require('./router/index')
const bodyParser = require("koa-bodyparser")



var db = mongoose.connect('mongodb://localhost:27017/koa-login')
app.use(bodyParser())

app.use(routers.routes()).use(routers.allowedMethods())
app.listen(3030,() =>{
    console.log('port 3030 has been listened...')
})
