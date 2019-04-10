// import https from 'https';
const {
  https
} = require('https');
module.exports = function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = '';
      res.on('data', data => {
        urlData += data
      });
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData);
        if (bookinfo.title) {
          reslove(bookinfo)
        }
        reject(bookinfo);
      })
    })
  })

}
