// JavaScript Document
$.fn.extend({

	/*页面居中显示*/
	showCenter: function() { //obj:居中显示的对象
		var _this;


		function center() {
			var screenW = $(window).width();
			var screenH = $(window).height();
			_this.show();
			var l = (screenW - _this.outerWidth()) / 2;
			var t = (screenH - _this.outerHeight()) / 2;
			_this.css({
				'left': l,
				"top": t
			})
		};

		return this.each(function() {
			_this = $(this)
			center();
			$(window).resize(center);
		})
	},

	/*拖拽*/

	drag: function(title) { // obj:拖拽对象   title：可拖拽标题

		return this.each(function() {

			var _this = $(this)

			title = title || _this; //拖拽判断

			title.mousedown(function(ev) {
				//鼠标按下，计算盒子偏移距离
				var disX = ev.pageX - _this.offset().left;
				var disY = ev.pageY - _this.offset().top;

				//-------------------------------------------
				$(document).mousemove(function(ev) {
					var t = ev.pageY - disY;
					var l = ev.pageX - disX;

					var screenW = $(window).width(); //屏幕宽度
					var screenH = $(window).height(); //屏幕高度

					if (l < 0) {
						l = 0;
					};
					if (t < 0) {
						t = 0;
					};

					if (l > screenW - _this.outerWidth()) { //屏幕宽度---盒子宽度
						l = screenW - _this.outerWidth()
					};

					if (t > screenH - _this.outerHeight()) { //屏幕宽度---盒子宽度
						t = screenH - _this.outerHeight()
					};

					_this.css({
						'left': l,
						'top': t
					})
				});
				//-----------------------------------------
				$(document).mouseup(function() {
					$(document).unbind('mousemove');
				});
				return false; //阻止默认事件
			});

		})
	},
	
	//滑轮
	mouseWheel:function(fn){
		return this.each(function(){
			if(window.navigator.userAgent.indexOf('Firefox')!=-1){
				this.addEventListener('DOMMouseScroll',wheeLFn,true);
			}else{
				this.onmousewheel=wheelFn;
			};
			function wheelFn(ev){
				var direct=ev.wheelDelta ? ev.wheelDelta<0 : ev.detail>0;
				fn&&fn(direct);//将direct作为参数传出去
				ev.preventDefault();//DOM 2 级 阻止默认事件 firefox
			};
		})
	}

});

$.extend({
	//模态层
	modal: function() {
		var oM = $('<div class="modal"></div>');
		$(document.body).append(oM);
		return function() {
			oM.remove(); //删除模态层	
		};
	},

	//confirm弹框
	confirmBox: function(msg, fn) {

		var delModal = $.modal(); //调用模态层 并接收返回值  函数 

		var oBox = $('<div class="confirmBox"><p>' + msg + '</p><button type="button">确定</button>　　<button type="button">取消</button></div>');
		$(document.body).append(oBox);
		//居中 /*拖拽*/
		oBox.showCenter().drag()

		oBox.on('click', 'button:first', function() {
			oBox.remove(); //删除alertBox
			delModal();
			fn && fn();
		});
		oBox.on('click', 'button:last', function() {
			oBox.remove(); //删除alertBox
			delModal();
		})

	},
	//alert弹框
	alertbox: function(msg) {
		//声明一个变量等于模态层
		var delModal = $.modal()
			//创建一个div  //div的命名     	//div中增加的内容
		var oBox = $('<div class="alertBox"><p>' + msg + '</p><button type="button">确定</button></div>')
			//把div插入到body中
		$('body').append(oBox);
		/*居中*/ //拖拽
		oBox.showCenter().drag()
			/*点击确定按钮删除*/
		oBox.children('button').click(function() {
			//删除box
			oBox.remove();
			//删除模态层
			delModal()
			//取消事件冒泡
			return false;
		})
	},
	//prompt弹窗
	promptbox:function(fn){
		//声明一个变量等于模态层
		var delModal = $.modal()
			//创建一个div  //div的命名     	//div中增加的内容
		var oBox = $('<div class="promptBox"><h4>请输入内容</h4><textarea></textarea><button type="button">确定</button><button type="button">取消</button></div>')
			//把div插入到body中
		$('body').append(oBox);
		/*居中*/ //拖拽
		oBox.showCenter().drag()
		//promptBox盒子中的文本域和按钮获得焦点
		oBox.find('textarea,button').mousedown(function(ev){
			ev.stopPropagation()
		})
		oBox.find('button').first().click(function(){//点击确定按钮
			//把文本域中的内容传给  wrao盒中的文本域
			fn&&fn(oBox.find('textarea').val())
		})
		oBox.find('button').click(function(){//oBox中所有的盒子点击
			//删除box
			oBox.remove()
			//删除模态层
			delModal()
		})
	}
})