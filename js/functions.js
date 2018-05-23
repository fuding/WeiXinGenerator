function insertAtCursor(myField, myValue) {
	//IE
	if(document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.select();
	}
	//MOZILLA/NETSCAPE 
	else if(myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var restoreTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
		if(restoreTop > 0) {
			myField.scrollTop = restoreTop;
		}
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
	} else {
		myField.value += myValue;
		myField.focus();
	}
}

function index_in_array(value, array) {
	for(var i = 0; i < array.length; i++) {
		var v = array[i];
		if(v == value) {
			return i;
		}
	}
	return -1;
}

function replace_qq_emoji(str) {
	str = str.replace(/\[.*?\]/g, function(word) {
		var w = word.replace('[', '').replace(']', '');
		var index = index_in_array(w, qq_emoji);
		return '<img class="qq_emoji" src="../images/qq_emoji/Expression_' + (index + 1) + '@2x.png" />';
	});
	return str;
}

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function get_random_num(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}

function randomString(len, words) {　　
	len = len || 32;　　
	var $chars = '0123456789';
	if(words) {
		$chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	}　　
	var maxPos = $chars.length;　　
	var pwd = '';　　
	for(i = 0; i < len; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}　　
	return pwd;
}

function randName() {
	randomnum = get_random_num(0, names.length);
	return names[randomnum];
}

/*保存按钮*/

function mkhandel(mid) {

	//$('.pop-pic .tips a#goon').click(function(){
	//	$('.pop-pic').hide();
	//	$('#wrapper').show();
	//	//location.reload(true);
	//});

	$('.go_make').click(function() {
		var _this = $(this);
		var type = $(this).attr('val'); //类型

		//$.post('/make/handle/',{type:type,mid:mid},function(result){

		//	if(result.sy == 1){
		//		$('.phone-wrap').addClass('ok');
		//		$('#waters').removeClass('i-water');
		//	}else{
		//		$('#waters').addClass('i-water');
		//	}

		//	if(result.status == 'success'){

		$('.msg-del').hide();
		//--------------------制图-----------------------
		if(mid == 10) {
			$('#iphone').css('height', '5636px'); 
		} else if(mid == 15) {
			$('#iphone').css('height', '1505px');
		} else if(mid == 16) {
			$('#iphone').css('height', '1148px');
		} else if(mid == 21) {
			$('#iphone').css('height', '508px');
		}else{
			$('#iphone').css('height', '695px');
		}

		var div = $('.phone-wrap'); //容器
		//var box = div;

		//var my_image = $('.my-image');
		//var mask = $('.mask');
		//if(!my_image.length){
		//  my_image = $('<div class="my-image">成功生成图片，点击 <a class="my-image-view" target="_blank" href="#">这里</a> 查看，<a class="my-image-continue" href="#">继续制作</a></div>');
		//  $('body').append(my_image);
		//}
		//if(!mask.length){
		//  $('body').append('<div class="mask"></div>');
		//}
		div.css('transform', 'scale(1.0)');
		div.css('padding', 0).css('border', 0);

		//$('#ifm').contents().find('body').append(div);

		//alert($('#ifm').contents().find('body').html());return false;

		_this.hide();
		$('.loading').show();
		//$('.my-image').hide();
		//$('.mask').hide();

		html2canvas(div, {
			onrendered: function(canvas) {
				var myImage = canvas.toDataURL("image/png");
				
				//$.post('/make/handle_pic/',{myImage:myImage,mid:mid},function(result){

				//	if(result.status == 'success'){
				//  $("#make114").html("<img src='" + myImage + "' style='width:480px'>");
				layer.open({
					type: 1,
					shade: false,
					title: false, //不显示标题
					area: ['380px', '80%'],
					shadeClose: true, //开启遮罩关闭
					content: '<img src="' + myImage + '" style="width:380px">',
					//content: $('.layer_notice'), //捕获的元素
					cancel: function() {
						//layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
						$('#wrapper').show();
						div.css('transform', 'scale(0.5)');
					}
				});

				//var pop_pic = $('.pop-pic');
				//var pop_class = 'pc';
				//if(browser.versions.mobile){
				//	pop_class = 'mobile';
				//}
				//pop_pic.find('.tips').addClass(pop_class);
				//pop_pic.find('img').attr('src', myImage);
				////pop_pic.find('#save_not').attr('href',result.path);

				////$('#save_not').click(function(){
				////	alert('点击确定后请稍后，跳出大图后按住三秒即可保存！');
				////})

				//pop_pic.show();
				$('#wrapper').hide();
				$('.loading').hide();
				_this.show();
				$('.msg-del').show();
				////	}else{
				////		layer.msg(result.message);
				////	}														
				////},'json');
				//div.css('transform','scale(0.5)');
				//div.remove();
				//$('.clone_box').html(box);

			}
		});

		$('.btn-apps').click(function() {
			$('.apps').toggle();
		});

		$('.apps-close').click(function() {
			$('.apps').hide();
		});

		$('.my-btns').after($('.apps'));

		//--------------------制图-----------------------

		//	}else{
		//		layer.msg(result.message);
		//	}

		//},'json');

	})

}

/*保存按钮(备用)*/

function mkhandel2(mid) {

	$('.pop-pic .tips a#goon').click(function() {
		$('.pop-pic').hide();
		$('#wrapper').show();
	});

	$('.go_make').click(function() {
		var _this = $(this);
		var type = $(this).attr('val'); //类型

		$.post('/make/handle/', {
			type: type,
			mid: mid
		}, function(result) {

			if(result.sy == 1) {
				$('.phone-wrap').addClass('ok');
				$('.phone-wrap').css('transform', 'scale(1.0)');
				$('#waters').removeClass('i-water');
			} else {
				$('.phone-wrap').css('transform', 'scale(1.0)');
				$('#waters').addClass('i-water');
			}

			if(result.status == 'success') {

				//--------------------制图-----------------------
				var div = $('.phone-wrap'); //容器
				var box = div;
				html2canvas(div, {
					onrendered: function(canvas) {
						var myImage = canvas.toDataURL("image/png");
						//生成图片

						$.post('/make/handle_pic/', {
							myImage: myImage,
							mid: mid
						}, function(result) {

							if(result.status == 'success') {

								var my_image = $('.my-image');
								var mask = $('.mask');
								if(!my_image.length) {
									my_image = $('<div class="my-image">成功生成图片，点击 <a class="my-image-view" target="_blank" href="#">这里</a> 查看，<a class="my-image-continue" href="#">继续制作</a></div>');
									$('body').append(my_image);
								}
								if(!mask.length) {
									$('body').append('<div class="mask"></div>');
								}

								$('#ifm').contents().find('body').append(div);
								_this.hide();
								$('.loading').show();
								$('.my-image').hide();
								$('.mask').hide();
								var pop_pic = $('.pop-pic');
								var pop_class = 'pc';
								if(browser.versions.mobile) {
									pop_class = 'mobile';
								}
								pop_pic.find('.tips').addClass(pop_class);
								pop_pic.find('img').attr('src', myImage);
								pop_pic.show();
								$('#wrapper').hide();
								$('.loading').hide();
								_this.show();

							} else {
								layer.msg(result.message);
							}
						}, 'json');

						div.remove();
						$('.clone_box').html(box);

					}
				});

				$('.btn-apps').click(function() {
					$('.apps').toggle();
				});

				$('.apps-close').click(function() {
					$('.apps').hide();
				});

				$('.my-btns').after($('.apps'));

				//--------------------制图-----------------------

			} else {
				layer.msg(result.message);
			}

		}, 'json');

	})

}

//中文转unicode
function toUnicode(data) {
	var str = '';
	for(var i = 0; i < data.length; i++) {
		str += "\\u" + parseInt(data[i].charCodeAt(0), 10).toString(16);
	}
	console.log(str)
	return str;
}
//unicode转中文
function toZh(data) {
	data = data.split("\\u");
	var str = '';
	for(var i = 0; i < data.length; i++) {
		str += String.fromCharCode(parseInt(data[i], 16).toString(10));
	}
	console.log(str)
	return str;
}