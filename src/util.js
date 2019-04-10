import config from './config';


export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    shoCancel: false
  })
}

function request(url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    console.log('data:', data);
    wx.request({
      data,
      method,
      header,
      url: url,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg);
          reject(res.data);
        }
      }
    })
  })
}

export function post(url, data) {
  console.log('in post', url, data);
  return request(url, 'POST', data);
}

export function get(url, data) {
  return request(url, 'GET', data);
}
