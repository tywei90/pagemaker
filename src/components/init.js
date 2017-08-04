import $ from 'jquery'
function init (){
	var $main;
	var iframe = document.getElementsByTagName('iframe')[0];
	if(iframe){
		$main = iframe.contentDocument || iframe.contentWindow.document;
	}else{
		$main = $('body');
	}
	// 防止preview部分代码每次更新都添加监听事件
	$('.audio', $main).off('click');
    $('.audio', $main).on('click',function(event) {
    	var $curTarget = $(event.currentTarget);
        var $musicBtn = $(".mscBtn", $curTarget);
        var $musicPlay = $(".music-play", $curTarget);
        var $musicPause = $(".music-pause", $curTarget);
        var music = $(".bgMusic", $curTarget)[0];
        var musicPlay = function(){
            music.play();
            $musicBtn.addClass("mscRoll");
            $musicPause.css({
                opacity: 0
            });
            $musicPlay.css({
                opacity: 1
            });
        }
        var musicPause = function(){
            music.pause();
            $musicBtn.removeClass("mscRoll");
            $musicPause.css({
                opacity: 1
            });
            $musicPlay.css({
                opacity: 0
            });
        }
        if (music.paused) {
            musicPlay();
        } else {
            musicPause();
        }
    });
}
export default init;