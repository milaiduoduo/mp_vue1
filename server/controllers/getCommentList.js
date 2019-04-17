const {
  mysql
} = require('../qcloud');

module.exports = async (ctx) => {
  //1、获取参数
  const bookId = ctx.request.query.bookId;
  const commentList = await mysql('comments')
    .select('comments.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
    .where('bookid', bookId);
  ctx.state.data = {
    list: commentList.map(item => {
      const userInfo = JSON.parse(item.user_info)
      return Object.assign({}, item, {
        title: userInfo.nickName,
        image: userInfo.avatarUrl
      })
    })
  }
}
