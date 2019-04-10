const https = require('https');
const {
  mysql
} = require('../qcloud');
const {
  getJSON
} = require('../utils.js');
// import {
//   getJSON
// } from '../utils.js';
const {
  myConfig
} = require('../myconfig/config.js');
// import myConfig from '../myconfig/config.js';

module.exports = async (ctx) => {
  console.log('ctx.request.body:', ctx.request.body);
  //1、取得isbn,openid
  const {
    isbn,
    openid
  } = ctx.request.body;
  //2、向豆瓣发请求获取图书详情
  const bookinfo = await getJSON(myConfig + isbn);
  console.log('bookinfo:', bookinfo);
  ctx.state.data = {
    title: '123',
    msg: 'joke'
  }
}
