
// 注册接口
function registry() {// 点击完成注册用户
  const data = { username: $("#username").val(), password: $("#password").val() }
  $.ajax({ // 发起异步请求
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    url: 'http://localhost:3000/api/register',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function (res) { // 请求成功将用户信息存入sessionStorage中
      const user = res
      sessionStorage.setItem('user', JSON.stringify(user))
      console.log(res, 'seccess')
      if(user._id) return window.location.href = 'index.html'
    },
    error: function (err) { // 请求失败的回调函数
      // 获取异常状态码
      const { status, statusText }  = err
      if (status) return $.toast.fail(`接口请求：${ status } ${ statusText }`)
      console.log(err, 'err')
    }
  })	
}

// 登录接口
function login() {
  const data = { username: $('#username').val(), password: $('#password').val()  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/login',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(data),
    success(res) {
      console.log(res, 'seccess')
      const loginTime = new Date().toLocaleString()
      if (res.message) return $.toast.fail(res.message)
      sessionStorage.setItem('user', JSON.stringify({ loginTime, ...res.user }))
      sessionStorage.setItem('token', JSON.stringify(res.token))
      if(res.token) return window.location.href = 'index.html'
    },
    error(err) {
      const { status, statusText }  = err
      if (status) return $.toast.fail(`接口请求：${ status } ${ statusText }`)
      console.log(err, 'err')
    }
  })
}

// 退出登录的方法
function logout() {
  console.log('exit')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('token')
  $('.login').css('display', 'inline-block')
  $('.registry').css('display', 'inline-block')
  $('.userinfo').css('display', 'none')
  $('.exit').css('display', 'none')
  // window.location.href = 'index.html'
}