//消息数目
var i_n_count = randomString(1);
if(i_n_count > 0) {
	$('.input-i-n-count').val(i_n_count);
	$('.i-n-count').text('(' + i_n_count + ')');
}
$('.input-i-n-count').bind('input propertychange', function() {
	var val = $(this).val();
	if(isNaN(val) || val == 0) {
		$('.i-n-count').text('');
		return false;
	}
	val = '(' + $(this).val() + ')';
	$('.i-n-count').text(val);
});
$('.btn-del-i-n-count').click(function() {
	$('.i-n-count').text('');
	$('.input-i-n-count').val('');
	return false;
});

//添加文字对话
$('body').on('click', '.a-u-dialog a', function() {
	console.log("触发")
	var user = $(this).parents('.add-user');
	var index = user.index();
	var name = user.find('.a-u-name .a-u-data-name').val();
	var content = user.find('.a-u-name textarea').val();
	var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
	var type = user.find('.a-u-dialog-master a').hasClass('btn-success');

	if(name == '') {
		alert('请输入用户名！');
		return false;
	}

	if(content == '') {
		alert('请输入聊天内容！');
		return false;
	}

	if(!img.length) {
		img = '<img src="images/default-head.png" />';
	}
	console.log(content)
	content = replace_qq_emoji(content);
	console.log(content)
	var msg_class = type ? 'i-b-sen-text' : 'i-b-rec-text';
	var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

	var dialog = $('<div class="' + msg_class + '"><div>' + nick + '<span><i></i><em>' + content + '</em><a class="msg-del"></a></span></div></div>');
	dialog.prepend(img);
	$('.i-body').append(dialog);
	//显示名称
	$(".radio-i-b-nick:checked").click();
	return false;
});

//添加对话时间
$('.add-time-btn').click(function() {
	var xinqi = $('.slt-xinqi option:selected').val();
	var shi = $('.slt-shi option:selected').val();
	var hour = $('.slt-hour option:selected').val();
	var minite = $('.slt-minite option:selected').val();
	var str = '';
	if(xinqi != '-')
		str += xinqi + ' ';
	if(shi != '-')
		str += shi;
	str += hour + ':';
	str += minite;
	var html = '<div class="i-b-time"><span>' + str + '</span><a class="msg-del"></a></div>';
	$('.i-body').append(html);
	return false;
});

function addInfoBg(a) {
	$(a).prev().click();
}

//添加对话背景图片
function set_info_bg(input) {
	
	if(!$(input).val()) {
		return false;
	}
	var dir = $(input).attr('data-dir');
	var user = $(input).parents('.add-user');
	var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
	var index = user.index();
	var name = user.find('.a-u-name .a-u-data-name').val();
	var pay = user.find('.a-u-name .a-u-data-pay').val();

	var img = $(input).parent().parent().find('.a-u-pic-show img').clone();
	if(!img.length) {
		img = '<img src="images/default-head.png" />';
	}

	var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
	var pay_class = dir = 'i-pay-img';
	var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

	var html = $('<div class="' + wrap_class + '"><div class="i-b-pay">' + nick + '<span class="' + pay_class + '"><a class="msg-del"></a></span></div></div>');
	html.prepend(img);
	$('.i-body').append(html);

	//					console.log(	$(".i-body .i-b-sen-text:last-child .i-pay-img"))
	//					$(".i-body .i-b-sen-text:last-child .i-pay-img").css("background-image","url('"+$(input).val()+"')");

	var imgFile = $(input).get(0);
	console.log(imgFile.files[0])
	if(window.URL && imgFile.files[0]) {
		var reader = new FileReader();
		reader.readAsDataURL(imgFile.files[0]);
		reader.onload = function(e) {
			if(wrap_class == "i-b-sen-text") {
				$(".i-body .i-b-sen-text:last-child .i-pay-img").css({
					"background-image": "url('" + this.result + "')"
				})
			} else {
				$(".i-body .i-b-rec-text:last-child .i-pay-img").css({
					"background-image": "url('" + this.result + "')"
				})
			}

		}
	}

	//显示名称
	$(".radio-i-b-nick:checked").click();
	return false;
}


var set_body_bg = function() {
	var img = $('.a-u-pic-bodybg img');
	var src = img.attr('src');

	$('.i-body').css('background-image', 'url(' + src + ')');

}

//切换背景图片
$('body').on('change', '.a-u-pic-show input', function() {

	var img = document.createElement('img'); //创建 img 对象
	var _this = $(this);
	var callback = _this.attr('data-callback');

	window.URL = window.URL || window.webkitURL;

	var imgFile = $(this).get(0);
	console.log(imgFile.files[0])
	if(window.URL && imgFile.files[0]) {
		var reader = new FileReader();
		reader.readAsDataURL(imgFile.files[0]);
		reader.onload = function(e) {

			var img = '<img src="' + this.result + '" alt=""/>';
			
			_this.parent().find('img').remove();
			_this.parent().append(img);

			if(callback) {
				eval(callback + '()');
			}
		}
	}
});

//添加用户
$('#add-user').click(function() {
	var time = (new Date()).valueOf();
	var html = $('<div class="add-user"><div class="a-u-pic">' +
		'<div class="a-u-pic-show"><input type="file" accept="image/jpeg,image/x-png" />' +
		'</div></div><div class="a-u-name"><p><span>用户名：</span>' +
		'<input class="a-u-data-name" type="text" value="" /></p><p><span>聊天内容：</span>' +
		'<textarea class="a-u-content' + time + '">随便说两句吧</textarea>' +
		'<a class="a-u-face btn-add-face" data-input="a-u-content' + time + '" href="#">表情</a></p>' +
		'<p><span>转账/收钱金额：</span><input class="a-u-data-pay" type="text" value="288.88" /></p>' +
		'<p><span>语音时间：</span><input class="a-u-data-voice" type="text" value="15" /></p>' +
		'<p><input style="margin-right:5px;" class="btn-rand-username btn btn-primary" type="button" value="随机用户名" />' +
		'<input class="btn-rand-face btn btn-primary" type="button" value="随机头像" /></p></div>' +
		'<div class="a-u-dialog" style="clear:both;"><a class="btn btn-primary" data-type="left" href="#">添加文字对话</a></div>' +
		'<div class="a-u-dialog-voice"><a class="btn btn-primary" data-type="left" href="#">添加语音对话</a></div>' +
		'<div class="a-u-dialog-img"><input type="file" onchange="set_info_bg(this)" data-callback="set_info_bg(this)" style="display: none;">' +
		'<a class="btn btn-primary" onclick="addInfoBg(this)" data-dir="img" data-type="left" href="#">添加图片</a></div>' +
		'<div class="a-u-dialog-tag"><a class="btn btn-primary" data-dir="tag" data-type="left" href="#">添加红包</a></div>' +
		'<div class="a-u-dialog-pay"><a class="btn btn-primary" data-dir="send" data-type="left" href="#">添加转账对话</a></div>' +
		'<div class="a-u-dialog-pay"><a class="btn btn-primary" data-dir="rec" data-type="left" href="#">添加收钱对话</a></div>' +
		'<div class="a-u-dialog-master"><a class="btn btn-primary" href="#">设为主人</a></div><div class="a-u-dialog-del"><a class="btn btn-danger" href="#">删除用户</a></div></div>');
	$('.users').append(html);
	html.find('.btn-rand-username').click();
});

//删除用户
$('body').on('click', '.a-u-dialog-del', function() {
	if(confirm('您确认要删除？')) {
		$(this).parents('.add-user').remove();
	}
	return false;
});

//删除单条对话
$('body').on('click', '.msg-del', function() {
	$(this).parents('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
});

//删除所有对话
$('.clear-dialog').click(function() {
	if(confirm('您确认要清除所有对话？')) {
		$('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
	}
});

//添加转账对话
$('body').on('click', '.a-u-dialog-pay a', function() {
	var dir = $(this).attr('data-dir');
	var user = $(this).parents('.add-user');
	var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
	var index = user.index();
	var name = user.find('.a-u-name .a-u-data-name').val();
	var pay = user.find('.a-u-name .a-u-data-pay').val();
	var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
	console.log(img)
	if(name == '') {
		alert('请输入用户名！');
		return false;
	}

	if(pay == '') {
		alert('请输入红包/转账/收钱金额！');
		return false;
	}

	if(isNaN(pay)) {
		alert('您输入的金额有误！');
		return false;
	}

	if(!img.length) {
		img = '<img src="images/default-head.png" />';
	}

	var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
	var pay_class = dir == 'send' ? 'i-pay-send' : 'i-pay-rec';
	var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

	var html = $('<div class="' + wrap_class + '"><div class="i-b-pay">' + nick + '<span class="' + pay_class + '"><i></i><em>' + toDecimal2(pay) + '</em><a class="msg-del"></a></span></div></div>');
	html.prepend(img);
	$('.i-body').append(html);
	//显示名称
	$(".radio-i-b-nick:checked").click();
	return false;
});

//添加红包
$('body').on('click', '.a-u-dialog-tag a', function() {
	var dir = $(this).attr('data-dir');
	var user = $(this).parents('.add-user');
	var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
	var index = user.index();
	var name = user.find('.a-u-name .a-u-data-name').val();
	var pay = user.find('.a-u-name .a-u-data-pay').val();
	var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
	console.log(img)
	if(name == '') {
		alert('请输入用户名！');
		return false;
	}

	if(!img.length) {
		img = '<img src="images/default-head.png" />';
	}

	var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
	var pay_class = dir = 'i-pay-tag';
	var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

	var html = $('<div class="' + wrap_class + '"><div class="i-b-pay">' + nick + '<span class="' + pay_class + '"><a class="msg-del"></a></span></div></div>');
	html.prepend(img);
	$('.i-body').append(html);
	//显示名称
	$(".radio-i-b-nick:checked").click();
	return false;
});

//添加语音对话
$('body').on('click', '.a-u-dialog-voice a', function() {
	var user = $(this).parents('.add-user');
	var name = user.find('.a-u-name .a-u-data-name').val();
	var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
	var voice = user.find('.a-u-name .a-u-data-voice').val();
	var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
	console.log(img)
	if(name == '') {
		alert('请输入用户名！');
		return false;
	}

	if(voice == '') {
		alert('请输入语音时间！');
		return false;
	}

	if(isNaN(voice)) {
		alert('您输入的语音时间有误！');
		return false;
	}

	if(!img.length) {
		img = '<img src="images/default-head.gif" />';
	}

	var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
	var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

	var v_len = 0;
	var len = 0;
	v_len = voice > 60 ? 60 : voice;
	len = (360 - 96) / 60 * v_len + 96;

	var unread = ''; //type ? '' : '<strong></strong>';

	var html = $('<div class="' + wrap_class + '"><div class="i-b-voice">' + nick + '<span style="width:' + len + 'px"><i></i><b></b><em>' + voice + '\'\'</em>' + unread + '<a class="msg-del"></a></span></div></div>');

	html.prepend(img);
	$('.i-body').append(html);
	//显示名称
	$(".radio-i-b-nick:checked").click();
	return false;
});

//主人切换
$('body').on('click', '.a-u-dialog-master a', function() {
	var parent = $(this).parents('.users');
	parent.find('.a-u-dialog-master a').removeClass('btn-success');
	$(this).addClass('btn-success');
	return false;
});

$('.body_bg_del').click(function() {
	$('.i-body').css('background-image', 'none');
	$('.a-u-pic-bodybg img').remove();
	return false;
});

$('#add-user').click();

setTimeout(function() {
	$('.btn-rand-face').click();
	$('.btn-rand-username').click();

	var _title = '';
	$(".a-u-data-name").each(function() {
		_title = $(this).val();
	});

	$('.input-common').val(_title);
	$('.i-n-name span').text(_title);
}, 500);

