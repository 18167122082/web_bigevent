//注意: 每次调用$.get() 或 $.post() 或 $.ajxa()的时候,
//会先调用 ajxaPrefilter 这个函数
//在这个函数中,可以拿到我们给Ajxa提供的配置对象

//设置路径(测试)
var baseURL = 'http://ajax.frontend.itheima.net'
//设置路劲(生产)
// var baseURL = 'http://www.itcast.cn'
$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = baseURL + options.url;
    // console.log(options);

    //判断请求头路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }


    //无论是成功还是失败,最终都会调用 complete 回调函数
    //在 complete 回调函数中,可以使用res.response.JSON 拿到服务器响应回来的数据
    //3.所有的请求完成后都要进行身份认证判断:
    options.complete = function (res) {


        var data = res.responseJSON;
        // console.log(data);
        // console.log(data.status);
        // console.log(data.message);
        if (data.status === 1 && data.message === '身份认证失败！') {
            //1.删除token强制清空token

            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})