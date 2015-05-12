/**
 * Created by fancy on 2015/4/30.
 * dependence jquery.cookie.js
 */
(function($){
    $.fn.slideheader = function(options) {
        var opts = $.extend({}, $.fn.slideheader.defaults, options);
        var header = $(this);
        header.addClass('shder');
        var sildeBtns = $('<div></div>').addClass('slideBtns')
            .append('<span class="glyphicon glyphicon-menu-hamburger slideIn show"></span><span class="glyphicon glyphicon-pushpin unlock"></span><span class="glyphicon glyphicon-paperclip lock"></span>');
        header.append(sildeBtns);

        bindEvent(header,opts);
        if(opts.show||$.cookie('SLIDEHEADER_STATUS')){
            slideIn(header);
        }else {
            slideOut(header);
        }
    };

    function bindEvent($obj,opts){
        $obj.on('mouseenter',function(ev){
            $obj.stop();
            slideIn($obj,ev);
        });
        $obj.on('mouseleave',function(ev){
            $obj.stop();
            slideOut($obj,ev);
        });
        $obj.on('click','ul>li',function(ev){
            $obj.find('ul>li').removeClass('select');
            $(this).addClass('select');
            //TODO
            if(typeof(opts.onTitleClick)==="function"){
                opts.onTitleClick(ev);
            }
        });

        $obj.on('click','.slideBtns>span',function(ev){
            var isopen = 'SLIDEHEADER_STATUS';
            var currentSpan=$obj.find('.slideBtns>span.show');
            if(currentSpan.hasClass('unlock')){
                $obj.find('.slideBtns>span.unlock').removeClass('show').addClass('hide');
                $obj.find('.slideBtns>span.lock').removeClass('hide').addClass('show');
                $.cookie(isopen,true,{expires:1});
            }else if(currentSpan.hasClass('lock')){
                $obj.find('.slideBtns>span.unlock').removeClass('hide').addClass('show');
                $obj.find('.slideBtns>span.lock').removeClass('show').addClass('hide');
                $.cookie(isopen,true,{expires:-1});
            }
        });
        $(window).resize(function(){
            var currentSpan=$obj.find('.slideBtns>span.show');
            if(currentSpan.hasClass('slideIn')) {
                var leftLayout = $(window).outerWidth() - 50;
                $obj.css('left', -leftLayout);
            }
        });
    }

    function slideIn($obj,event){
        var currentSpan=$obj.find('.slideBtns>span.show');
        if($obj.position().left<0||currentSpan.hasClass('slideIn')){
            $obj.removeClass('shderHide');
            $obj.animate({left: '0'}, 300);

            $obj.find('.slideBtns>span.slideIn').removeClass('show').addClass('hide');
            $obj.find('.slideBtns>span.unlock').removeClass('hide').addClass('show');
            $obj.find('.slideBtns>span.lock').removeClass('show').addClass('hide');
            if(!event){//初始状态打开，调整状态
                $obj.find('.slideBtns>span.unlock').removeClass('show').addClass('hide');
                $obj.find('.slideBtns>span.lock').removeClass('hide').addClass('show');
            }
        }
    }
    function slideOut($obj,event){
        var currentSpan=$obj.find('.slideBtns>span.show');
        if(!currentSpan.hasClass('lock')) {
            var leftLayout = $(window).outerWidth() - 50;
            $obj.addClass('shderHide');
            $obj.animate({left: -leftLayout}, 1500);

            $obj.find('.slideBtns>span.slideIn').removeClass('hide').addClass('show');
            $obj.find('.slideBtns>span.unlock').removeClass('show').addClass('hide');
            $obj.find('.slideBtns>span.lock').removeClass('show').addClass('hide');
        }
    }

    $.fn.slideheader.defaults = {
        show:false,//初始状态是否打开
        onTitleClick:function(ev){}
    }
})(jQuery);