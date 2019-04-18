const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  // 1、获取参数
  const {
    bookId,
    openid
  } = ctx.request.query;
  //   console.log('-----------------------', ctx.request.query);
  //   console.log('-----------------------bookId,openid:', bookId, openid);
  const sqlStr = mysql('comments')
    .select('comments.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')

  let commentList = [];
  if (bookId) {
    //用于图书详情页
    // console.log("----------bookId:", bookId);
    commentList = await sqlStr.where('bookid', bookId)
  } else if (openid) {
    //用户我的评论页面
    commentList = await sqlStr.where('comments.openid', openid)
  }

  //   console.log('---------------commentList:', commentList)

  ctx.state.data = {
    list: commentList.map(item => {
      const userInfo = JSON.parse(item.user_info)
      return Object.assign({}, item, {
        user_info: {
          title: userInfo.nickName,
          image: userInfo.avatarUrl,
          openid: userInfo.openId
        }
      })
    })
  }

}
