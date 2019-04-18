const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    console.log('-------------------in addComment', ctx.request.body)
    ctx.state.data = {
        msg: 's'
    }
    const {
        bookid,
        comment,
        phone,
        location,
        openid
    } = ctx.request.body
    try {
        const result = await mysql('comments').insert({
            bookid,
            comment,
            openid,
            phone,
            location
        })
        console.log('-------------------addComment result:', result)
        if (result > 0) {
            ctx.state.data = {
                msg: 'success'
            }
        } else {
            ctx.state = {
                code: -1,
                data: {
                    msg: '评论失败'
                }
            }
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败' + e.sqlMessage
            }
        }
    }
}
