$(function(){
    bindEvent();
});

function bindEvent(){
    //music
    $('.music').on('click',function(ev) {
        if ($(ev.target).hasClass('play')) {
            $('#music')[0].pause();
            $(ev.target).removeClass('play');
        }else{
            $('#music')[0].play();
            $(ev.target).addClass('play');
        }
    });
    //header
    $('header').slideheader({
        show: false,
        onTitleClick:function(ev){
            var chor=$(ev.target).attr('chor')||$(ev.target).parent().attr('chor');
            fullpage.moveTo(chor,chor);
        }
    });
    //fullpage
    fullpage.initialize('.content',{
        anchors: ['index', 'about', 'note', 'photos'],
        menu: 'ul',
        css3:true,
        onLeave:function(index,nextIndex){
            $('header>ul>li').removeClass('select');
            $('header>ul>li:eq('+(nextIndex-1)+')').addClass('select');
        }
    });
    //slideDown
    $('.goDown').on('click',function(ev){
        fullpage.moveSectionDown();
    });
}