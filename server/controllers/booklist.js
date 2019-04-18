const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  const {
    pageNum,
    pageSize,
    openid
  } = ctx.request.query
  console.log("---------------booklist,openid:", openid, ctx.request.query);
  let books = [];
  sqlStr = mysql('books').select('books.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')


  if (openid) {
    //根据用户的openid过滤
    books = await sqlStr.where('books.openid', openid).orderBy('books.id', 'desc');
  } else {
    books = await sqlStr.limit(pageSize)
      .offset((Number(pageNum) - 1) * pageSize)
      .orderBy('books.id', 'desc')
  }
  console.log("---------------books.length:", books.length);
  ctx.state.data = {
    list: books.map(item => {
      const info = JSON.parse(item.user_info)
      return Object.assign({}, item, {
        user_info: {
          'nickName': info.nickName
        }
      })
    })
  }
}
