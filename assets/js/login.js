$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.定义 layui 表单校验规则;
    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify()函数自定义校验规则
    form.verify({
        //自定义一个叫做 pwd 校验规则(密码校验规则)
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码中的内容
            // 还需拿到密码框中的内容
            // 然后进行一次等于判断
            // 如果判断失败，则return一个提示消息即可
            if ($('#reg-pwd').val() !== value) {
                return "两次密码输入不一致!"
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        console.log(111);
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 注册成功提示
            layer.msg(res.message)
            //触动切换到登录a链接的点击行为
            $('#link_login').click();
            //清空表单
            $('#form_reg')[0].reset();
        })
    })

    //监听登录表单的提交行为
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败!")
                }
                layer.msg('登录成功!')
                //保存token
                localStorage.setItem("token",res.token)
                //页面跳转
                location.href = "/index.html"
            }
        })
    })
})