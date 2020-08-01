//注意: 每次调用$.get() 或 $.post() 或 $.ajxa()的时候,
//会先调用 ajxaPrefilter 这个函数
//在这个函数中,可以拿到我们给Ajxa提供的配置对象

//设置路径(测试)
var baseURL = 'http://ajax.frontend.itheima.net'
//设置路劲(生产)
// var baseURL = 'http://www.itcast.cn'
$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = baseURL + options.url;
    console.log(options);

    //判断请求头路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token')||""
         }
    }

    //3.所有的请求完成后都要进行身份认证判断:
    options.complete = function (res) {
        var data = res.responseJSON;
        // console.log(data);
        if (data.status == 1 && data.message == '身份认证失败!') {
            //1.删除token
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})