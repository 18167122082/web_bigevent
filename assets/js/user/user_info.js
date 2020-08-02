$(function () {
    //定义校验规则
    var form = layui.form;
    console.log(layui);
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return "昵称应该输入1-6之间!"
            }
        }
    })
    initUserInfo()

    //初始化用户的基本信息 (此方法必须是全局,后面要用到)
    function initUserInfo() {
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                //展示用户信息
                form.val('formUserInfo',res.data)
            }
        })
    }


    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //初始化用户信息
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
                //调用
                window.parent.getUserInfo()
            }
        })
    })
})