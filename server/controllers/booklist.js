const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        pageNum,
        pageSize
    } = ctx.request.query
    const books = await mysql('books').select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .limit(pageSize)
        .offset((Number(pageNum) - 1) * pageSize)
        .orderBy('books.id', 'desc')
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
