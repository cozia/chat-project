////create-circle所有页面js文件
////通过将create-circle.html,choose-circle-classify.html,enter-group.html放在同一个页面
////通过Z-index控制层的显示
'use strict';
$(function(){
    var enterWayStr='';
    var circleLabelStr='';
    var $body=$('body');
    ////设置页面的宽度和高度绑定事件
    initCreateCirclePage();
    function initCreateCirclePage(){
        $('#create-step1,#create-step2,#create-step3').css({'width':$body.width(),'height':$body.height()});
        //点击“入圈验证方式”跳转到验证方式选择页面
        setPageZIndex('#enter-way','#create-step2');
        //点击“选择圈类别”跳转到圈类别选择页面
        setPageZIndex('#choose-classify','#create-step3');
        //点击取消 跳转到创建圈页面
        setPageZIndex('#create-step2-cancel','#create-step1');
        setPageZIndex('#create-step3-cancel','#create-step1');
        //选择完验证方式，跳转到创建圈页面，并填充方式数据
        $('#create-step2-sure').click(function(){
            //设置创建圈页面zindex最高
            recoverZindex();
            $('#enter-way-str').html(enterWayStr)
        });
        //选择完圈标签，跳转到创建圈页面，并填充标签数据
        $('#create-step3-sure').click(function(){
            //设置创建圈页面zindex最高
            recoverZindex();
            $('.create-circle-list-right').html(circleLabelStr)
        });
        //初始化各页面zIndex值（默认值）
        function recoverZindex(){
            $('#create-step1').css('zIndex',3);
            $('#create-step2').css('zIndex',2);
            $('#create-step3').css('zIndex',1);
        }
        //将当前页面zIndex设置为最高
        function setPageZIndex(clickedItem,currentPage){
            recoverZindex();
            $(clickedItem).click(function(){
                recoverZindex();
                $(currentPage).css('zIndex',9);
            });
        }
    }
//标签选择逻辑
    $('#classify-details-ul').on('click','.classify-details-item',function(e){
        var $hasClickedLen=$('.active-classify-label').length;
        var $span=$('<div class="close-btn"></div>');
        //最多只能选择3个标签
        if($hasClickedLen<3&&e.target.nodeName=='SPAN'){
            //给选择到的标签加上关闭选择的按钮
            circleLabelStr+=$(this).html()+'圈/';
            $(this).addClass('active-classify-label').append($span);
            console.log(circleLabelStr)
        }else{
            //如果用户选择超过3个标签给出提示的回调
            //fn();
        }
        $('.close-btn').click(function(event){
            //阻止事件冒泡
            //取消选择
            event.stopPropagation();
            $(this).parent().removeClass('active-classify-label');
            $(this).hide();
        })
    });
    enterGroupWay('.enter-grouper-confirm','44px');
    enterGroupWay('.enter-group-need-password','75px');
    function enterGroupWay(wayContainer,height){
        (height=="44px")? enterWayStr='群主确认':enterWayStr='需要密码';
        $(wayContainer).click(function(){
            $('#enter-group-container').find('img').hide();
            $(this).find('img').show();
            $('.enter-group-form').animate({'height':height},100);
        });
    }
});


//图片上传
;(function(win,$){
    function ImgUploader(options){
        this.imgUpload=$('#img-upload');
        this.imgContainer=$('#img-container');
        ImgUploader.CONFIG= $.extend(ImgUploader.CONFIG,options);
        this.imgContainerSetting();
        this.imgChange();
    }
    ImgUploader.CONFIG={
        width:125,
        height:125,
        radius:5
    };
    ImgUploader.prototype={
        constructor:ImgUploader,
        imgContainerSetting:function(){
            var cfg=ImgUploader.CONFIG;
            this.imgContainer.css({'overflow':'hidden','position':'relative'});
            this.imgUpload.css({"width":cfg.width,
                'height':cfg.height+21,
                "borderRadius":cfg.radius,
                'position':'absolute',
                'top':-22,
                'left':0,
                "background":"transparent",
                "zIndex":"99",
                'outline':'none'
            })
        },
        imgChange:function(){
            var cfg=ImgUploader.CONFIG;
            var _this=this;
            this.imgUpload.change(function(){
                var imgFiles=($(this)[0].files);
                var img=new Image();
                _this.imgContainer.css('padding',0).find('img,span').remove();
                if(win.URL){
                    img.src=win.URL.createObjectURL(imgFiles[0]);
                    img.width=cfg.width;
                    img.onload=function(){
                        win.URL.revokeObjectURL(this.src);
                    }
                }
                $(img).css({"width":cfg.width,'height':cfg.height,"borderRadius":cfg.radius});
                _this.imgContainer.append($(img));
            })
        }
    };
    win['ImgUploader']=ImgUploader;
})(window,jQuery,undefined);

new ImgUploader();





