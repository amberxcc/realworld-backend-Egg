# realworld-backend-Egg.js

### Description

An implementation of [realworld](https://github.com/gothinkster/realworld) backend by Egg([realworld api doc](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints)).

### API Feature
1. Authentication（JWT）（登录）
2. Registration（注册）
3. Get Current User（获取当前用户）
4. Update User（修改当前用户信息）
5. Get Profile（获取指定用户的基础信息）
6. Follow/Unfollow user（关注、取消关注）
7. List Articles（获取所有文章）
8. Feed Articles（获取已关注用户的文章）
9. C/R/U/D Article（文章增删改查）
10. Add/Get Comments to an Article（添加、获取某篇文章的评论）
11. Delete Comment（删除某个评论）
12. Favorite/Unfavorite Article（收藏、取消收藏文章）
13. Get Tags（获取所有文章标签）

### Development

```bash
$ npm i
$ npm run dev
```

### Deploy

```bash
$ npm install
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
