const {
  mysql
} = require('../qcloud');

module.exports = async (ctx) => {
  // 1、增加浏览量计数
  const {
    id
  } = ctx.request.query;

  const addInfo = await mysql('books').where('id', id).increment('count', 1);
  const detailInfo = await mysql('books')
    .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .where('id', id)
    .first()

  const info = JSON.parse(detailInfo.user_info);
  // console.log("---------------detailInfo:", detailInfo);
  ctx.state.data = Object.assign({}, detailInfo, {
    summary: detailInfo.summary.split('\n'),
    user_info: {
      name: info.nickName,
      image: info.avatarUrl
    }
  })
}
