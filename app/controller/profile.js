const Controller = require('egg').Controller;

class ProfileController extends Controller {
  async getProfile() {
    const { ctx } = this

    const target = ctx.targetUser
    let following = false
    if (ctx.user) {
      following = target.assertFollower(ctx.user.id)
    }

    const profile = {
      username: target.username,
      bio: target.bio,
      image: target.image,
      following
    }

    return ctx.body = { profile }
  }


  async follow() {
    const { ctx } = this

    const target = ctx.targetUser
    target.addFollower(ctx.user.id)

    const profile = {
      username: target.username,
      bio: target.bio,
      image: target.image,
      following: target.assertFollower(ctx.user.id)
    }

    return ctx.body = { profile }
  }


  async unfollow() {
    const { ctx } = this

    const target = ctx.targetUser
    target.removeFollower(ctx.user.id)

    const profile = {
      username: target.username,
      bio: target.bio,
      image: target.image,
      following: target.assertFollower(ctx.user.id)
    }

    return ctx.body = { profile }
  }
}

module.exports = ProfileController;
