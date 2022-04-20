const Service = require('egg').Service;

class ArticleService extends Service {

  async creatArticle() {
    const { ctx } = this

    for (let property of ['title', 'description', 'body']) {
      assert(ctx.request.body.article[property], 422, `${property} 不能为空`)
    }
    await next()
  }


  async getArticle() {
    const { ctx } = this
    const { Article } = this.app.model

    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)

    ctx.targetArticle = target
    await next()
  }


  async updateArticle() {
    const { ctx } = this
    const { Article } = this.app.model

    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)

    ctx.targetArticle = target
    await next()
  }


  async deleteArticle() {
    const { ctx } = this
    const { Article } = this.app.model
    
    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)
    assert(target.author.toString() === ctx.user.id, 403, `无权限删除`)

    ctx.targetArticle = target
    await next()
  }


  async addComment() {
    const { ctx } = this
    const { Article } = this.app.model
    
    assert(ctx.request.body.comment.body, 422, '评论内容不能为空')
    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)

    ctx.targetArticle = target
    await next()
  }


  async getComments() {
    const { ctx } = this
    const { Article } = this.app.model
    
    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)

    ctx.targetArticle = target
    await next()
  }

  async deleteComment() {
    const { ctx } = this
    const { isValidObjectId } = this.app.mongoose
    const { Article, Comment } = this.app.model
    
    const slug = ctx.params.slug
    const id = ctx.params.id
    const targetArticle = await Article.findOne({ slug })
    const targetComment = await Comment.findOne({ id })

    assert(target, 422, `slug:${ctx.params.slug} 不存在`)
    assert(isValidObjectId(id), 422, `id${id}格式错误`)
    assert(ctx.user.id === targetComment.author, 403, `无权限删除`)

    ctx.targetArticle = targetArticle
    ctx.targetComment = targetComment
    await next()
  }


  async favorite() {
    const { ctx } = this
    const { Article } = this.app.model

    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)

    ctx.targetArticle = target
    await next()
  }


  async unfavorite() {
    const { ctx } = this
    const { Article } = this.app.model

    const target = await Article.findOne({ slug: ctx.params.slug })
    assert(target, 422, `slug:${ctx.params.slug} 不存在`)

    ctx.targetArticle = target
    await next()
  }
}

module.exports = ArticleService;
