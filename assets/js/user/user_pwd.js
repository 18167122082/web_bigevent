$(function () {
    var form = layui.form
    console.log(layui);
    form.verify({
        //新密码不能与旧密码相同
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            console.log(value);
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与原密码相同!'
            }
        },
        //二次验证密码
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success:function(res){
                    if (res.status !== 0) {
                        return layui.layer.msg('更新用户信息失败!')
                    }
                    layui.layer.msg('更新用户信息成功!')
                    //重置表单
                    $('.layui-form')[0].reset()
            }
        })
    })
})