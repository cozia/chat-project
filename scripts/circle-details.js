/**
 * Created by chun on 2017/1/10.
 */


function enterGroupWay1(firstItem,secondItem,hiddenVal,showVal){
    var iptName="addRoomMethod";
    ShrinkUL(iptName);
    enterGroupWay(firstItem,hiddenVal);
    enterGroupWay(secondItem,showVal);
    function enterGroupWay(wayContainer,height){
        var $con=$('.change-enter-circle-way');
        $(wayContainer).click(function(){
            if($(this).attr('class')=='enter-grouper-confirm'){
                $('input[name='+iptName+']').attr('value',1);
            }else{
                $('input[name='+iptName+']').attr('value',2);
            }
            $con.animate({'height':height},100).find('img').hide();
            $(this).find('img').show();
        });
    }
}
enterGroupWay1('.enter-grouper-confirm','.enter-group-need-password','134px','178px');


function ShrinkUL(inputName){
    var $con=$('.change-enter-circle-way');
    var $status=$('input[name='+inputName+']').attr('value');
    if($status==1){
        $('.enter-grouper-confirm').find('img').show();
        $con.animate({'height':"134px"},100);
    }else{
        $('.enter-group-need-password').find('img').show();
        $con.animate({'height':"178px"},100);
    }
}

//按钮组件
;(function(win,$){
    function ToggleBtn(options){
        this.btnBox=$('.slide-button');
        ToggleBtn.CONFIG= $.extend(ToggleBtn.CONFIG,options);
        this.initButton();
        this.toggle();
    }
    ToggleBtn.CONFIG={
        activebg:'#4cd864',
        background:'#e5e5e5',
        left:'1px'
    };
    ToggleBtn.prototype={
        constructor:ToggleBtn,
        initButton:function(){
            var _this=this;
            var $buttonItem=$("<span class='slide-button-item'></span>");
            $($buttonItem).css({
                display:'inline-block',
                transition: 'left .2s ease-in-out',
                width:' 22px',
                height: '22px',
                borderRadius: '11px',
                background: "#ffffff",
                position: 'absolute',
                top:'1px',
                left:ToggleBtn.CONFIG.left,
                boxShadow:'0 3px 4px 0 rgba(0,0,0,.3)'
            });
            this.btnBox.append($buttonItem).css({
                display:'inline-block',
                width:' 45px',
                height: '24px',
                borderRadius: '12px',
                background: ToggleBtn.CONFIG.background,
                position: 'relative'
            });
            this.btnBox.each(function(){
                if($(this).find('input')[0].checked){
                    $(this).css('background','#4cd864').find('.slide-button-item').css("left","21px")
                }
            });
        },
        toggle:function(){
            var _this=this;
            this.btnBox.click(function(){
                var $itemID='#'+$(this).attr('for');
                if(!$($itemID)[0].checked){
                    $(this).css('background','#e5e5e5').find('.slide-button-item').css("left","1px");
                    $(this).find('input').removeAttr('checked');
                }else{
                    $(this).css('background','#4cd864').find('.slide-button-item').css("left","21px");
                    $(this).find('input').attr('checked','checked')
                }
            })
        }
    };
    win['ToggleBtn']=ToggleBtn;
})(window,jQuery);
new ToggleBtn();


//announcement.html

;(function(win,$){
    function Textarea(textCon,clearBtn){
        var _this=this;
        this.con=$(textCon);
        this.clearBtn=$(clearBtn);
        //btn显示和隐藏
        this.isShow();
        //清空所有
        this.clearAll();
    }
    Textarea.prototype={
        constructor:Textarea,
        isShow:function(){
            var _this=this;
            this.con.keyup(function(){
                if($(this).val()!=''){
                    _this.clearBtn.show();
                }else{
                    _this.clearBtn.hide();
                }
            })
        },
        clearAll:function(){
            var _this=this;
            this.clearBtn.click(function(){
                $(this).hide();
                _this.con.val('');
            })
        }
    };
    win['Textarea']=Textarea;
})(window,jQuery,undefined);

new Textarea('#circle-announcement','#clear-all-words-btn');



//圈详情
;(function(win,doc,$,undefined){
    function Carousel(carousel,urls){
        this.carousel=carousel;
        this.urls=urls;
        //将图片组url打散
        var options=this.urlSplit(',');
        this.len=options['urls'].length;
        //合并参数
        $.extend(Carousel.CONFIG,options,{width:$('body').width()});
        console.log(Carousel.CONFIG);
        //渲染轮播容器
        this.renderContainer();
        //渲染轮播子项目
        this.renderItems();
        //左滑
        this.leftSlider();
        //右滑
        this.rightSlider();
        //点击展开图片
        this.expendPic();
    }
    Carousel.prototype={
        constructor:Carousel,
        urlSplit:function(decollator){
            return {urls:this.urls.split(decollator)};
        },
        renderContainer:function(){
            var cfg=Carousel.CONFIG;
            var $currentPicBox=$('<div class="S-currentPic"><span class="S-current">1</span><span>/</span><span class="S-total">8</span></div>');
            $currentPicBox.css({'position':'absolute','right':'12px','bottom':'12px'});
            $(this.carousel).css({'position':'relative','width':cfg.width,'height':cfg.height,'background':'red','overflow':'hidden'}).append($currentPicBox)
        },
        renderItems:function(){
            var cfg=Carousel.CONFIG;
            var len=this.len;
            var $imgCon=$('<div class="imgContainer"></div>');
            var imgStr='';
            for(var i= 0;i<len;i++){
                imgStr+='<div class="imgCon"><img src="'+cfg.urls[i]+'"/></div>'
            }
            $imgCon.append($(imgStr));
            $(this.carousel).append($imgCon);
            $('.imgContainer').css({'width':len*cfg.width,'height':cfg.height,'display':'flex','flexDirection':'row'});
            $('.imgCon').css({'width':cfg.width,'height':cfg.height,'overflow':'hidden'});
        },
        leftSlider:function(){

        },
        rightSlider:function(){

        },
        expendPic:function(){

        }
    };
    Carousel.init=function(){
        var _this_=this;
        $('.S-carousel').each(function(){
            new _this_(this,$(this).attr('data-url'));
        })
    };
    Carousel.CONFIG={
        width:'100%',
        height:'175px',
        urls:[]
    };
    win['Carousel']=Carousel;
})(window,document,jQuery);
Carousel.init();

//canvas


//使用说明：必须使用S-canvas类名
//自定义属性说明：
//属性名：data-opt
//属性值(需严格使用JSON格式)：lineColor(弧线颜色)，num(数字分子)，totalnum(数字分母),quantifier(单位)
//默认配置参数：lineBgColor:'#efefef',lineColor:'#fc69a5',x:'75',y:'75',r:'50',quantifier:'人',num:'50',totalnum:'100'
;(function(win,$){
    function CircleShow(canv,opts){
        var that=this;
        var options= $.parseJSON(opts);
        this.canvas=canv;
        $.extend(CircleShow.CONFIG,options);
        console.log(CircleShow.CONFIG);
        if(this.canvas.getContext){
            //获取对应的CanvasRenderingContext2D对象
            this.ctx=this.canvas.getContext('2d');
        }
        //旋转画布到12点方向
        //接受1个参数（top,right,bottom,left）
        //也可以接受角度值
//            this.rotateCanvas();
        //画灰色整圆
        this.greyCircleRender();
        //画数据圆
        this.dataCircleRender();
        //绘制数据
        this.textRender();
    }
    //静态方法：初始化页面上所有的.S-canvas
    CircleShow.init=function(){
        var _this_=this;
        $('.S-canvas').each(function(){
            new _this_(this,$(this).attr('data-opt'));
        })
    };
    CircleShow.CONFIG={
        lineBgColor:'#efefef',
        lineColor:'#fc69a5',
        x:'40',
        y:'40',
        r:'30',
        quantifier:'人',
        num:'50',
        totalnum:'100'
    };
    CircleShow.prototype={
        constructor:CircleShow,
        greyCircleRender:function(){
            //开始一个新的绘制路径
            this.ctx.beginPath();
            //设置弧线的颜色为灰色
            this.ctx.strokeStyle=CircleShow.CONFIG.lineBgColor;
            //设置弧线宽度
            this.ctx.lineWidth=4;
            //绘制路径
            this.ctx.arc(CircleShow.CONFIG.x,CircleShow.CONFIG.y,CircleShow.CONFIG.r,0,2*Math.PI,false);
            //绘制
            this.ctx.stroke();
        },
        dataCircleRender:function(){
            var tmp=CircleShow.CONFIG.num/CircleShow.CONFIG.totalnum;
            console.log(tmp);
            //开始一个新的绘制路径
            this.ctx.beginPath();
            //设置弧线的颜色为灰色
            this.ctx.strokeStyle=CircleShow.CONFIG.lineColor;
            //设置弧线宽度
            this.ctx.lineWidth=4;
            this.ctx.lineCap='round';
            //绘制路径
            this.ctx.arc(CircleShow.CONFIG.x, CircleShow.CONFIG.y, CircleShow.CONFIG.r, 0, tmp*2*Math.PI,false);
            //绘制
            this.ctx.stroke();
        },
        textRender:function(){
            //设置字体样式
            this.ctx.font = " bold 12px/30px Microsoft Yahei";
            //设置字体填充颜色
            this.ctx.fillStyle = "#999999";
            //文字水平居中
            this.ctx.textAlign='center';
            //文字垂直居中
            this.ctx.baseline='middle';
            //开始绘制文字
            this.ctx.fillText(CircleShow.CONFIG.num+CircleShow.CONFIG.quantifier, 40, 46);
        }
    };
    win['CircleShow']=CircleShow;
})(window,jQuery,undefined);
CircleShow.init();

/////delete-member.html

$(function(){
        $('#delete-member-list>li').click(function(){
            var $checkedNum;
            var $pretendCheckbox=$(this).find('.pretend-checkbox-none');
            var $ckBox=$(this).find('input[type="checkbox"]');
            var $delBtn=$('.com-header>button');
            if(!$ckBox[0].checked){
                $pretendCheckbox.addClass('pretend-checkbox-checked');
                $ckBox.attr('checked','checked');
            }else{
                $pretendCheckbox.removeClass(('pretend-checkbox-checked'));
                $ckBox.removeAttr('checked');
            }
            $checkedNum=$('.pretend-checkbox-checked').length;
            if($checkedNum>0){
                $delBtn.removeAttr('disabled').css('color','#e64240').text('删除('+$checkedNum+'人)');
            }else{
                $delBtn.text('删除').css('color','#fe8d00');
                console.log('请选择至少一个成员！');
            }
        })
});
