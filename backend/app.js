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

app.use( async (ctx) =>{
    if(ctx.url === '/cookies') {
        ctx.cookies.set(
            'mycookies',
            'it is a long story',
            {
                domain: 'localhost',
                path: '/cookies',
                maxAge: 10*60*1000,
                expires: new Date('2018-04-15'),
                httpOnly: false,
                overwrite: false
            }
        )
        ctx.body = 'cookies is ok'
    } else {
        ctx.body = 'err'
    }
})

app.use(routers.routes()).use(routers.allowedMethods())
app.listen(3030,() =>{
    console.log('port 3030 has been listened...')
})
