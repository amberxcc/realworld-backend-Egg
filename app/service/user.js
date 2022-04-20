const Service = require('egg').Service;
const validator = require('validator')

class UserService extends Service {

  async registe() {
    const { ctx } = this
    const { User } = this.app.model
    const body = ctx.request.body.user

    for (let p of ['username', 'email', 'password']) {
      ctx.assert(body[p], 422, `${p}不能为空`)
      if (p === 'email') {
        ctx.assert(validator.isEmail(body[p]), 422, `email格式不正确`)
      }
    }

    const usernameFindResult = await User.findOne({ username: body.username })
    ctx.assert(!usernameFindResult, 422, `用户名已存在`)

    const emailFindResult = await User.findOne({ email: body.email })
    ctx.assert(!emailFindResult, 422, `邮箱已存在`)
  }


  async login() {
    const { ctx } = this
    const { User } = this.app.model
    const body = ctx.request.body.user

    for (let p of ['email', 'password']) {
      ctx.assert(body[p] !== undefined, 422, `${p}不能为空`)
      if (p === 'email') {
        ctx.assert(validator.isEmail(body[p]), 422, `email格式不正确`)
      }
    }

    const user = await User.findOne({ email: body.email })
    ctx.assert(user, 422, `用户不存在`)
    ctx.assert(ctx.helper.myHash(body.password) === user.password, 422, `密码错误`)
    ctx.user = user
  }


  async update () {
    const { ctx } = this
    const user = ctx.request.body.user
    const User = ctx.app.model.User
    let usernameFindResult, emailFindResult

    for (let property in user) {
      if (property === 'username') {
        usernameFindResult = await User.findOne({ username: user.username })
        ctx.assert(!usernameFindResult, 422, '用户名已存在')
      }

      if (property === 'email') {
        emailFindResult = await User.findOne({ email: user.email })
        ctx.assert(!emailFindResult, 422, 'email已存在')
      }
    }
  }

}

module.exports = UserService
