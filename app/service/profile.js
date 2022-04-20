const Service = require('egg').Service;

class ProfileService extends Service {
  
  async getProfile() {
    const { ctx } = this
    const User = this.app.model.user

    const user = await User.findOne({ username: ctx.params.username })
    ctx.assert(user, 422, '用户不存在')
    ctx.targetUser = user
  }


  async follow() {
    const { ctx } = this
    const User = this.app.model.user

    const user = await User.findOne({ username: ctx.params.username })
    ctx.assert(user, 422, '用户不存在')
    ctx.targetUser = user
  }



  async unfollow() {
    const { ctx } = this
    const User = this.app.model.user

    const user = await User.findOne({ username: ctx.params.username })
    ctx.assert(user, 422, '用户不存在')
    ctx.targetUser = user
  }

}

module.exports = ProfileService;
