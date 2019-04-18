const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        size
    } = ctx.request.query
    const info = await mysql('books').select('id', 'title', 'image', 'count').orderBy('count', 'desc').limit(size)
    ctx.state.data = {
        list: info
    }
}
