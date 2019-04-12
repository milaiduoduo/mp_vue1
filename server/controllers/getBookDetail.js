const {
  mysql
} = require('../qcloud');

module.exports = async (ctx) => {
  // 1、增加浏览量计数
  const {
    id
  } = ctx.request.query;
  console.log("---------------------id:", id);
  const info = await mysql('books').where('id', id).increment('count', 1);
  console.log('---------------------info:', info);
}
