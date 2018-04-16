/**
 * Created by chenlu on 2018/4/11.
 */
const LocalData = function (item) {
  this.set = function (value) {
    return localStorage.setItem(item, value)
  }
  this.get = function () {
    return localStorage.getItem(item)
  }
  this.clear = function () {
    return localStorage.clear()
  }
}

const lsLogin = new LocalData('ls_login')
const lsClear = new LocalData()

export default {
  lsLogin,
  lsClear
}
