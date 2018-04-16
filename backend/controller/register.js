/**
 * Created by chenlu on 2018/4/4.
 */
const jwt = require('jsonwebtoken')
const User = require('../models/models')
const secret = 'jwt demo'

module.exports = {
    async singUp(ctx) {
        let result = {
            success: false,
            message: '注册失败'
        }
        console.log(ctx)
        console.log(ctx.request.body)
        const {loginName, password, sex, name, note} = ctx.request.body

        if(!loginName && !password) {
            result.message = '请填写用户名和密码'
            ctx.body = result
        } else {
            let user = await User.findOne({loginName})

            if(!user) {
                const newUser = new User({
                    loginName: loginName,
                    password: password,
                    sex: sex,
                    name: name,
                    note: note
                })
                const doc = await newUser.save()
                if (!doc.errors) {
                    ctx.body = {success:true, message:'注册成功',token}
                } else {
                    ctx.body = result
                }
            }
            else{
                ctx.body = {success: false, message: '用户名已存在'}
            }
        }
    },
    async signIn (ctx) {
        let result = {
            success: false,
            message: '用户不存在'
        }

        const {loginName, password} = ctx.request.body

        await User.findOne({
            loginName
        },(err, user) =>{
            if(err){
                throw  err
            }
            if(!user) {
                ctx.body = result
            } else {
                if(password === user.password) {
                    const userToken = {
                        loginName: loginName
                    }
                    const token = jwt.sign(userToken, secret, {expiresIn: '1h'})
                    ctx.body = {success: true, message: '登入成功', token}
                } else {
                    ctx.body = {success: false, message: '密码错误'}
                }
            }
        })
    },
    async getAllUsers (ctx) {
        await User.find({}).then(
            result => {
                const token = ctx.header.authorization
                if(token=='' || !token){
                    ctx.body = {success: false, message: 'authorization不能为空'}
                }else{
                    ctx.body = {success: true, data: result}
                }

            })
            .catch(() =>{
                ctx.body = 'error'
            })
    }

}