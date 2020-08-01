$(function () {
    //1.获取用户信息
    getUserInfo()

    //3.退出登录
    //引入layer
    var layer = layui.layer;

    $('#btnLogout').on('click', function () {
        console.log(111);
        //3.1提示
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
        });
    })
});

// 获取用户信息分装
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //JQuery 中的ajax,专门用于设置请求头信息的属性
        //  headers: {
        //     Authorization:localStorage.getItem('token')||""
        //  },
        success: function (res) {
            //判断用户信息是否查询成功
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //调用用户渲染函数
            renderUser(res.data)
        }
    })
}

//封装用户渲染函数
function renderUser(user) {
    //1.渲染用户名
    var uname = user.nickname || user.username;
    console.log(uname);
    $('#welcome').html('欢迎&nbsp;&nbsp' + uname);
    //2.渲染用户头像
    //判断用户头像信息,如果有就渲染图片,如果没有就渲染文字
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(uname[0].toUpperCase())
    }
}