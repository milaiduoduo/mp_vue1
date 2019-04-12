const host = 'http://localhost:5757';
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`,
  doubanBookUrl: `${host}/weapp/addbook`,
  bookList: `${host}/weapp/booklist`,
  getBookDetail: `${host}/weapp/getBookDetail`,
  getTop: `${host}/weapp/getTop`
}
export default config
