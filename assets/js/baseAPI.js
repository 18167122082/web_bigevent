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
})