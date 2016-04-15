/**
 * 全屏相关逻辑，此文件包含于Ctrl类内
 */

var ctrlFullArea, playerGiftWrap, giftShowBtn,
    playerFullpageBtn, playerFullscreenBtn,
    txtInput, btnInput;

function initFullsceneFn() {
    ctrlFullArea = document.querySelector('#player-ctrl-full-area');
    playerGiftWrap = document.querySelector('#player-gift-wrap');
    giftShowBtn = document.querySelector('#gift-show-btn');
    playerFullpageBtn = document.querySelector('#player-fullpage-btn');
    playerFullscreenBtn = document.querySelector('#player-fullscreen-btn');
    txtInput = document.querySelector('.player-full-input-txt');
    btnInput = document.querySelector('.player-full-input-btn');

    liveIconFn();
    fullscreenFn();
    speakFn();
    giftShowEvent();
}


//右上角直播图标
function liveIconFn() {
    if (!isOutdoor) return;
    var liveIcon = $('#player-liveicon');
    liveIcon.show();
    $(playerWrap).mousemove(function() {
        liveIcon.removeClass('delayhide');
        liveIcon.css('visibility', 'visible');
    });
    $(playerWrap).mousestop(function() {
        liveIcon.addClass('delayhide');
    });
    $(playerWrap).mouseleave(function() {
        liveIcon.css('visibility', 'hidden');
    });
}

/**
 * 全屏样式
 */
function toggleFullStyle(isFull) {
    //视频窗口大小
    $(playerWrap).css('height', (isFull ? '100%' : 'calc(100% - 100px)'));
    //显示输入框
    $(playerFullInput).css('display', (isFull ? 'block' : 'none'));
    //显示礼物竞猜按钮
    $(giftShowBtn).css('display', (isFull ? 'block' : 'none'));
    //隐藏礼物栏
    $(playerGiftWrap).css('display', (isFull ? 'none' : 'block'));
    //视频旋转按钮
    $(btnRotate).css('display', isOutdoor && !isFull ? 'block' : 'none');
    //全屏感应区域
    $(ctrlFullArea).css('display', isFull ? 'block' : 'none');
    //隐藏控制栏
    $(playerCtrlWrap).css('visibility', isFull ? 'hidden' : 'visible');

    if (isFull) {
        clearEvents();
        addEvents();
        $(playerCtrlWrap).addClass('player-ctrl-full');
        $(vplayer.container).addClass('player-container-full');
        if ($('.player-danmu-pane').is(':visible')) {
            toggleDanmuSettingPane(); //关闭弹幕设置面板
        }

    } else {
        clearEvents();
        onMouseMoveFullArea();
        $(playerCtrlWrap).removeClass('player-ctrl-full');
        $(vplayer.container).removeClass('player-container-full');
    }
    $(window).resize();
}

function addEvents() {
    // $(playerCtrlWrap).mouseenter(onMouseEnterCtrl);
    $(playerCtrlWrap).mousemove(onMouseMoveFullArea);
    $(playerCtrlWrap).mousestop(onMouseStopFullArea);
    $(playerCtrlWrap).mouseleave(onMouseLeaveFullArea);
    $(ctrlFullArea).mousemove(onMouseMoveFullArea);
    $(ctrlFullArea).mousestop(onMouseStopFullArea);
    $(ctrlFullArea).mouseleave(onMouseLeaveFullArea);
}

function clearEvents() {
    // $(playerCtrlWrap).unbind('mouseenter', onMouseEnterCtrl);
    $(playerCtrlWrap).unbind('mousemove', onMouseMoveFullArea);
    $(playerCtrlWrap).unbind('mousestop', onMouseStopFullArea);
    $(playerCtrlWrap).unbind('mouseleave', onMouseLeaveFullArea);
    $(ctrlFullArea).unbind('mousemove', onMouseMoveFullArea);
    $(ctrlFullArea).unbind('mousestop', onMouseStopFullArea);
    $(ctrlFullArea).unbind('mouseleave', onMouseLeaveFullArea);
}

function onMouseEnterCtrl() {
    $(playerCtrlWrap).css('visibility', 'visible');
}

function onMouseMoveFullArea() {
    $(playerCtrlWrap).removeClass('delayhide');
    $(playerCtrlWrap).css('visibility', 'visible');
}

function onMouseStopFullArea() {
    if (isInputFocus) return;
    if (!isFullscreen && !isFullpage) return;
    $(playerCtrlWrap).addClass('delayhide');
}

function onMouseLeaveFullArea() {
    $(playerCtrlWrap).css('visibility', 'hidden');
}


/**
 * 全屏功能
 */
var isFullscreen = false;
var isFullpage = false;

function fullscreenFn() {
    var videoContainer = $(vIdDom)[0];
    var vparent = videoContainer.parentNode;
    var video = $('#hy-video')[0];

    // 打开全屏
    function launchFullscreen() {
        var element = vplayer.container;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        toggleFullStyle(true);
        $(playerFullscreenBtn).attr('title', '退出全屏');
        $(playerFullscreenBtn).removeClass('player-fullscreen-btn');
        $(playerFullscreenBtn).addClass('player-narrowscreen');
    }

    //退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        toggleFullStyle(false);
        $(playerFullscreenBtn).attr('title', '全屏');
        $(playerFullscreenBtn).removeClass('player-narrowscreen');
        $(playerFullscreenBtn).addClass('player-fullscreen-btn');
    }

    //打开网页全屏
    function launchFullpage() {
        document.body.appendChild(videoContainer);
        $(videoContainer).addClass('player-page-full');
        video.play(); //appendChild后视频会停播
        toggleFullStyle(true);
        $(playerFullpageBtn).attr('title', '退出网页全屏');
        $(playerFullpageBtn).removeClass('player-fullpage-btn');
        $(playerFullpageBtn).addClass('player-narrowpage');
    }

    //退出网页全屏
    function exitFullpage() {
        vparent.appendChild(videoContainer);
        $(videoContainer).removeClass('player-page-full');
        video.play(); //appendChild后视频会停播
        toggleFullStyle(false);
        $(playerFullpageBtn).attr('title', '网页全屏');
        $(playerFullpageBtn).removeClass('player-narrowpage');
        $(playerFullpageBtn).addClass('player-fullpage-btn');
    }

    function toggleFullscreen() {
        isShowGift = false;
        if (isFullpage) {
            exitFullpage();
            isFullpage = false;
        }
        isFullscreen = !isFullscreen;
        if (isFullscreen) {
            launchFullscreen();
        } else {
            exitFullscreen();
        }
    }

    function toggleFullpage() {
        isShowGift = false;
        if (isFullscreen) {
            exitFullscreen();
            isFullscreen = false;
        }
        isFullpage = !isFullpage;
        if (isFullpage) {
            launchFullpage();
        } else {
            exitFullpage();
        }
        $(window).resize();
    }

    function verifyCtrlBar() {
        toggleFullscreen();
        if (!isFullscreen) onMouseMoveFullArea();
        $(playerCtrlWrap).css('visibility', isFullscreen ? 'hidden' : 'visible');
    }

    var clickTime = 0;
    //双击切换全屏,dblclick与主站event.js有冲突
    function onClickVideo() {
        var curTime = new Date().getTime();
        var gapTime = curTime - clickTime;
        clickTime = curTime;
        if (gapTime < 300) {
            clickTime = 0;
            verifyCtrlBar();
        }
    }

    //进入或退出全屏事件，按Esc或点击浏览器的退出提示不会触发exitFullscreen
    function fullscreenchange() {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        if (!fullscreenElement && isFullscreen) {
            verifyCtrlBar();
        }
    }

    playerWrap.onclick = onClickVideo;
    ctrlFullArea.onclick = onClickVideo;
    utils.addHandler(playerFullscreenBtn, 'click', toggleFullscreen);
    utils.addHandler(playerFullpageBtn, 'click', toggleFullpage);
    //全屏事件
    $(document).bind('fullscreenchange', fullscreenchange);
    $(document).bind('mozfullscreenchange', fullscreenchange);
    $(document).bind('webkitfullscreenchange', fullscreenchange);
}

//鼠标移入显示，移出隐藏
var isInputFocus = false;

//全屏发言
function speakFn() {
    function onFullInputFocusIn() {
        isInputFocus = true;
    }

    function onFullInputFocusOut() {
        isInputFocus = false;
    }

    function onFullInputKeydown(evt) {
        if (evt.keyCode == 13) { //Enter
            sendSpeak();
        }
    }
    //发送发言内容
    function sendSpeak() {
        var msg = $(txtInput).val();
        $(txtInput).val('');
        vplayer.trigger('sendDanmuText', { param: { danmutext: msg } });
    }
    $(btnInput).click(sendSpeak);
    $(txtInput).focusin(onFullInputFocusIn);
    $(txtInput).focusout(onFullInputFocusOut);
    $(txtInput).keydown(onFullInputKeydown);
}

/**
 * 礼物竞猜事件
 */
var isShowGift = false;

function giftShowEvent() {
    utils.addHandler(giftShowBtn, 'click', function() {
        isShowGift = !isShowGift;
        toggleFullStyle(!isShowGift);
        utils.css(playerFullInput, {
            'display': 'block'
        });
        utils.css(giftShowBtn, {
            'display': 'block'
        });
    })
}
