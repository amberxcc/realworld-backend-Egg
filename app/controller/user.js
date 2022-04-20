const Controller = require('egg').Controller;

class UserController extends Controller {

  async registe() {
    const { ctx } = this
    const { User } = this.app.model

    await this.service.user.registe()
    const newUser = new User(ctx.request.body.user)
    await newUser.save()

    const user = {
      username: newUser.username,
      email: newUser.email,
      token: ctx.helper.jwtSign({ id: newUser._id }),
      bio: newUser.bio,
      image: newUser.image,
    }

    return ctx.body = { user }
  }


  async login() {
    const { ctx } = this

    await this.service.user.login()
    const user = {
      username: ctx.user.username,
      email: ctx.user.email,
      bio: ctx.user.bio,
      image: ctx.user.image,
      token: ctx.helper.jwtSign({ id: ctx.user._id })
    }

    return ctx.body = { user }
  }

  async getUser() {
    const { ctx } = this

    await this.service.user.getUser()
    const user = {
      username: ctx.user.username,
      email: ctx.user.email,
      bio: ctx.user.bio,
      image: ctx.user.image,
      token: ctx.helper.jwtSign({ id: ctx.user._id })
    }

    return ctx.body = { user }
  }

  async updateUser() {
    const { ctx } = this

    await this.service.user.updateUser()
    for (let property in ctx.request.body.user) {
      ctx.user[property] = ctx.request.body.user[property]
    }
    await ctx.user.save()

    const user = {
      username: ctx.user.username,
      email: ctx.user.email,
      bio: ctx.user.bio,
      image: ctx.user.image,
      token: ctx.helper.jwtSign({ id: ctx.user._id })
    }

    return ctx.body = { user }
  }
}

module.exports = UserController;
