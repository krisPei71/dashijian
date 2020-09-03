$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 自定义验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        repwd: function (value) {
            var pwdValue = $('.reg-box [name=password]').val()
            if (pwdValue !== value) {
                return '两次输入密码不一致'
            }
        }
    })
    //注册
    var layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                } else {
                    $('#link_login').click();
                    return layer.msg('注册成功，请登录');
                }
            }
        })
    })
    // 登录
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: {
                username: $('.login-box [name=username]').val(),
                password: $('.login-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                location.href = '/index.html';
                return layer.msg(res.message)

            }
        })
    })

})