const auth = require('./middleware/auth')

module.exports = app => {
  const { router, controller } = app;

  // tag
  router.get('/api/tags', controller.article.getTags)

  // article
  router.post('/api/articles', auth(), controller.article.creatOne)
  router.get('/api/articles', auth({ required: false }), controller.article.getAll)
  router.get('/api/articles/feed', auth(), controller.article.getFeed)
  router.get('/api/articles/:slug', auth({ required: false }), controller.article.getOne)
  router.put('/api/articles/:slug', auth(), controller.article.updateOne)
  router.delete('/api/articles/:slug', auth(), controller.article.deleteOne)
  router.post('/api/articles/:slug/comments', auth(), controller.article.addComment)
  router.get('/api/articles/:slug/comments', auth({ required: false }), controller.article.getComments)
  router.delete('/api/articles/:slug/comments/:id', auth(), controller.article.deleteComment)
  router.post('/api/articles/:slug/favorite', auth(), controller.article.favorite)
  router.delete('/api/articles/:slug/favorite', auth(), controller.article.unfavorite)

  // user
  router.post('/api/users/login', controller.user.login)
  router.post('/api/users', controller.user.registe)
  router.get('/api/user', auth(), controller.user.getUser)
  router.put('/api/user', auth(), controller.user.updateUser)

  // profile
  router.post('/api/profiles/:username/follow', auth(), controller.profile.follow)
  router.delete('/api/profiles/:username/follow', auth(), controller.profile.unfollow)
  router.get('/api/profiles/:username', auth({ required: false }), controller.profile.getProfile)

};
