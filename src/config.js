const host = 'http://localhost:5757';
const config = {
  host,
  demo: `${host}/weapp/demo`,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`,
  doubanBookUrl: `${host}/weapp/addbook`,
  bookList: `${host}/weapp/booklist`,
  getBookDetail: `${host}/weapp/getBookDetail`,
  getTop: `${host}/weapp/getTop`,
  addComment: `${host}/weapp/addComment`,
  getCommentList: `${host}/weapp/getCommentList`,
  pageUrl: {
    bookDetail: `/pages/bookDetail/main`
  }
}
export default config
