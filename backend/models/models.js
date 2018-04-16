/**
 * Created by chenlu on 2018/4/3.
 */
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    loginName: String,
    password: String,
    sex: String,
    name: String,
    note: String
},{collection: 'User'})

const User = module.exports = mongoose.model('User', userSchema)