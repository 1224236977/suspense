/*** Created by Administrator on 2017/6/20.*/
$(function () {
    $.fn.extend({
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
    })
    // 切换ac函数
    function changeac(obj) {
        obj.click(function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
    }
    changeac($('.nav').children())
    changeac($('.icon_ol').children())
    // 点击改变图片src
    $('.icon_ol').children().click(function () {
        var index=$(this).index()
        $('.icon img').attr('src','images/icon'+index+'.jpg')
    })
    // 点击更换内容
    $('.Nav_nav li').click(function () {
        var index=$(this).index()
        $('.scroll').remove()
        // $('.main').eq(index).show().siblings().hide()
        $('.main').hide()
        $('.main').eq(index).attr('data-scroll-reveal','enter from the top after 0.1s').show()
        // console.log(index)
        // console.log($('.main').eq(index))
        Scroll($('.article_wrap')[index])
    })
    $('.form_ul li').click(function () {
        var index=$(this).index()
        $('.form').hide()
        $('.form').eq(index).show()
    })

    // 定时器
    // $('.carousel').carousel({
    //     interval: 3000
    // })

    // window.scrollReveal = new scrollReveal({ reset: true, move: '20px' });

    Scroll($('.article_wrap')[0])

    // 自定义滚动条
    function Scroll(obj) {

        var oBox=$(obj);

        // console.log(obj.innerHeight)

        var oBox_h=oBox.height(); //盒子的实际高度

        var oBox_cont_h=oBox.prop('scrollHeight') //盒子的内容高度

        // console.log(oBox_cont_h)
        if(oBox_cont_h>oBox_h){ //如果盒子的内容高度大于盒子的实际高度

            var scrollBox=$('<div class="scroll"></div>') //声明变量保存滚动条

            oBox.append(scrollBox) //把滚动条放入box盒中

            var n_oBox_cont_h = oBox.prop('scrollHeight') //重新获取盒子内容高度

            var h_rate = oBox_h / n_oBox_cont_h //内容高度/新盒子内容高度的比例

            var scrollBox_h = oBox_h * h_rate //滚动条的高度等于盒子的高度*比例

            scrollBox.height(scrollBox_h < 50 ? 50 : scrollBox_h) //滚动条的高度如果小于50 高度就等于50

            //拖拽---------------------------------------------
            scrollBox.mousedown(function(ev) {
                var disY = ev.pageY - scrollBox.position().top; //disY=鼠标的Y轴坐标-滚轮自身相对于父级盒子的定位top值
                $(document).mousemove(function(ev) {
                    var t = ev.pageY - disY //滚轮距离盒子的距离
                    move(t)
                })
                $(document).mouseup(function() {
                    $(document).unbind('mousemove')
                })
                return false //阻止默认事件
            });
            //移动
            function move(t) {
                if(t<0){
                    t=0
                }
                if (t > oBox.height() - scrollBox_h) { //滚轮距离盒子的距离    如果小于盒子的高度减去滚轮自身的高度    就等于盒子的高度减去滚轮自身的高度
                    t = oBox.height() - scrollBox_h
                }
                //计算移动比例
                var move_rate = t / (oBox_h - scrollBox_h);

                var tt = (n_oBox_cont_h - oBox_h) * move_rate; //内容移动的距离

                oBox.children('.article').css('top', -tt) //盒子内容的位置

                scrollBox.css('top', t) //滚动条的位置

            };
            // 滚轮事件
            oBox.mouseenter(
                function () {
                    oBox.mouseWheel(function(drt){
                        var t=0
                        // true ↓    false ↑
                        if(drt){
                            t=scrollBox.position().top+15
                            move(t)
                        }else{
                            t=scrollBox.position().top-15
                            move(t)
                        }
                        // console.log(drt)
                    });
                }
            )

        }

    }
})
