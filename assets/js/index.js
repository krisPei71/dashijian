$(function () {
    getUserInfo()
    var layer = layui.layer;
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                renderAvatar(res.data)
            },
            complete: function (res) {
                // console.log(res);
                if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
            }
        })
    }
    function renderAvatar(data) {
        var userName = data.nickname ? data.nickname : data.username
        $('#welcome').html('欢迎' + ' ' + userName);
        var text_avatar = userName[0].toUpperCase();
        console.log(text_avatar)
        $('.text-avatar').html(text_avatar)
        if (data.user_pic) {
            $('.layui-nav-img').attr('src', data.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.text-avatar').show();
            $('.layui-nav-img').hide()
        }
    }
    $('.layui-nav-item').on('a', 'click', function () {
        layer.confirm('确定退出嘛？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})