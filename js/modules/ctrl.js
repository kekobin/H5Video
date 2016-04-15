function Ctrl(vplayer) {
    __inline('fullscreen.js');

    var playerFullInput, playerCtrlWrap,
        playerWrap, btnRotate;

    //初始化
    + function() {
        var tmpl = __inline('../../tpl/ctrl.tmpl')();
        $('#player-ctrl-wrap').html(tmpl);
        $('.player-ctrl-wrap img').each(utils.NoDrag);

        playerFullInput = document.querySelector('#player-full-input');
        playerCtrlWrap = document.querySelector('#player-ctrl-wrap');
        playerWrap = document.querySelector('#player-wrap');
        btnRotate = document.querySelector('#player-rotate');

        initFullsceneFn()
        danmuFn();
        danmuSetting();
        playerFn();
        rotateFn();
        volumeFn();
        boxFn();
        guessFn();
        feedbackFn();
        firstRechargeFn();
        rechargeFn();
        packageFn();

        onResize();
        $(window).resize(onResize);
        Event.addEvent(Event.VIDEO_PLAY, onVideoPlay);
        Event.addEvent(Event.VIDEO_STOP, onVideoStop);
        Event.addEvent(Event.VIDEO_INFO_INITED, onVideoInited);
    }();

    function onResize() {
        var w = $(playerCtrlWrap).width();
        var iw = $(playerFullInput).width();
        var left = (w - iw) / 2;
        left = Math.min(left, w - iw - 400);
        $(playerFullInput).css('left', left + 'px');
        updateRotate();
    }

    function onVideoPlay() {

    }

    function onVideoStop() {

    }

    function onVideoInited() {
        var rotateDisplay = isOutdoor && vplayer.vcore.hasVideo;
        $(btnRotate).css('display', rotateDisplay ? 'block' : 'none');
    }

    /**
     * 弹幕控制
     */
    function danmuFn() {
        var playerDanmuBtn = document.querySelector('#player-danmu-btn');
        var flag = true;

        utils.addHandler(playerDanmuBtn, 'click', function() {
            if (!flag) {
                utils.removeClass(this, 'danmu-hide-btn');
                this.setAttribute('title', '开启弹幕');
            } else {
                utils.addClass(this, 'danmu-hide-btn');
                this.setAttribute('title', '关闭弹幕');
            }
            flag = !flag;
            vplayer.vcore.showDanmu(flag);
        });
    }

    /**
     * 弹幕设置
     */
    function danmuSetting() {
        var aList = $('.danmu-setting-alpha li');
        var bList = $('.danmu-setting-area li');
        var alphaList = [1.0, 0.7, 0.4];
        var areaList = [0.98, 0.55, 0.3];

        function changeAlpha(evt) {
            var curTarget = evt.currentTarget;
            for (var i = 0, len = aList.length; i < len; i++) {
                var li = aList[i];
                if (li == curTarget) {
                    $(li).find('i').show();
                    var alpha = alphaList[i];
                    vplayer.vcore.setDanmuAlpha(alpha);
                } else {
                    $(li).find('i').hide();
                }
            }
        }

        function changeArea(evt) {
            var curTarget = evt.currentTarget;
            for (var i = 0, len = bList.length; i < len; i++) {
                var li = bList[i];
                if (li == curTarget) {
                    $(li).find('i').show();
                    var area = areaList[i];
                    vplayer.vcore.setDanmuArea(area);
                } else {
                    $(li).find('i').hide();
                }
            }
        }
        //初始化选中项
        var storeAlpha = localStorage.danmuAlpha;
        var storeArea = localStorage.danmuArea;
        storeAlpha = storeAlpha || alphaList[0];
        storeArea = storeArea || areaList[0];
        storeAlpha = parseFloat(storeAlpha);
        storeArea = parseFloat(storeArea);

        for (var i = 0, len = alphaList.length; i < len; i++) {
            var iAlpha = parseFloat(alphaList[i]);
            if (storeAlpha == iAlpha) {
                vplayer.vcore.setDanmuAlpha(storeAlpha);
                var key = 'i:eq(x)'.replace('x', i);
                $('.danmu-setting-alpha ' + key).show();
            }
        }
        for (var i = 0, len = areaList.length; i < len; i++) {
            var iArea = parseFloat(areaList[i]);
            if (storeArea == iArea) {
                vplayer.vcore.setDanmuArea(storeArea);
                var key = 'i:eq(x)'.replace('x', i);
                $('.danmu-setting-area ' + key).show();
            }
        }

        //添加按钮事件
        aList.click(changeAlpha);
        bList.click(changeArea);
        $('.player-danmu-pane p').each(utils.NoSelect);
        $('#player-danmu-setting-btn').click(toggleDanmuSettingPane);
        $('.danmu-setting-close').click(toggleDanmuSettingPane);

        //点击其它地方，自动关闭面板
        $('body').click(function() {
            if ($('.player-danmu-pane').is(':visible')) {
                toggleDanmuSettingPane();
            }
        });
        $('.player-danmu-setting').click(utils.stopPropagation);
    }

    function toggleDanmuSettingPane() {
        var btnSetting = $('#player-danmu-setting-btn');
        var pane = $('.player-danmu-pane');
        pane.toggle();
        var isShow = pane.is(':visible');
        if (isShow) {
            btnSetting.removeClass('player-danmu-setting-btn');
            btnSetting.addClass('player-danmu-setting-light');
        } else {
            btnSetting.removeClass('player-danmu-setting-light');
            btnSetting.addClass('player-danmu-setting-btn');
        }
    }

    /**
     * 播放控制
     */
    function playerFn() {
        var playerBtn = document.querySelector('#player-btn');
        var isPlaying = true;

        $(playerBtn).click(function() {
            if (isPlaying) {
                $(playerBtn).removeClass('player-pause-btn');
                $(playerBtn).addClass('player-play-btn');
                $(playerBtn).attr('title', '开始观看');
                vplayer.vcore.pause();
            } else {
                vplayer.vcore.play();
                $(playerBtn).removeClass('player-play-btn');
                $(playerBtn).addClass('player-pause-btn');
                $(playerBtn).attr('title', '暂停观看');
            }
            isPlaying = !isPlaying;
        });
    }

    /**
     * 户外直播，视频旋转功能
     */
    function rotateFn() {
        if (!isOutdoor) return;
        $(btnRotate).css('display', 'block');

        $(btnRotate).click(function() {
            if (!vplayer.vcore.hasVideo) return;
            var r = rotate + 90;
            rotate = (r > 180) ? 0 : r;
            updateRotate();
        });
    }

    var rotate = 0; //户外直播视频旋转角度
    function updateRotate() {
        if (!isOutdoor) return;
        r = (rotate == 0) ? 'none' : "rotate(" + rotate + "deg)";
        var w = $(playerWrap).width();
        var h = $(playerWrap).height();
        var width = (rotate == 90) ? h + 'px' : '100%';
        var left = (rotate == 90) ? (w - h >> 1) : 0;
        $('#hy-video').css({
            transform: r,
            width: width,
            left: left
        });
        $(btnRotate).css('top', (100 - h) + 'px');
    }

    /**
     * 控制条的音量事件
     */
    function volumeFn() {
        var soundSetting = document.querySelectorAll('.sound-setting')[0];
        var playerVolumeBtn = document.querySelectorAll('.player-volume-btn')[0];
        var soundSettingBtn = soundSetting.querySelector('#sound-setting-btn');
        var soundSettingBar = soundSetting.querySelector('#sound-setting-bar');

        var bDrag = false;
        var disY = 0;
        var maxT = utils.css(soundSetting, 'height');

        //音量的样式更新
        function volumeChange(iT) {
            var volume = ((maxT - iT) / maxT * 100).toFixed(0);
            utils.css(soundSettingBtn, {
                'top': iT + 'px'
            })

            utils.css(soundSettingBar, {
                'height': (maxT - iT) + 'px'
            })

            vplayer.vcore.volume = volume;

            if (volume == 0) {
                $(playerVolumeBtn).removeClass('player-volume-btn');
                $(playerVolumeBtn).addClass('player-volume-stop-btn');
            } else {
                $(playerVolumeBtn).removeClass('player-volume-stop-btn');
                $(playerVolumeBtn).addClass('player-volume-btn');
            }
        }

        //拖拽音量   鼠标按下, 激活拖拽
        utils.addHandler(soundSettingBtn, 'mousedown', function(event) {
            var bDrag = true,
                soundSettingTop = utils.getPos(soundSetting).top;
            disY = event.pageY - utils.getPos(this).top;

            //拖拽开始
            utils.addHandler(document, 'mousemove', function(event) {
                if (!bDrag) return;

                var iT = event.pageY - disY - soundSettingTop;

                iT = iT < 0 ? 0 : iT;
                iT = iT > maxT ? maxT : iT;

                volumeChange(iT);
                return false;
            })

            //鼠标释放, 结束拖拽
            utils.addHandler(document, 'mouseup', function(event) {
                bDrag = false;
                utils.removeHandler(document, 'mousemove');
                utils.removeHandler(document, 'mouseup');
                return false;
            })

        })

        //点击音量按钮
        utils.addHandler(playerVolumeBtn, 'click', function() {
            if (!utils.hasClass(this, 'player-volume-stop-btn')) {
                volumeChange(maxT);
            } else {
                volumeChange(maxT / 2);
            }
        })
    }

    //设置多码率
    function setBitRateList(obj) {
        var list = obj.list;
        var ul = $('.player-videotype-list')[0];
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.firstChild);
        }
        var defaultName = '';
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var item = list[i];
            var li = $('<li></li>').text(item.sDisplayName);
            ul.appendChild(li[0]);
            if (item.iBitRate == obj.default) {
                li.attr('class', 'on');
                defaultName = item.sDisplayName;
            }
            li.attr('bit', item.iBitRate);
        }
        $('.player-videotype-cur').text(defaultName);

        $('.player-videotype').hover(function() {
            if (len == 1) return;
            $('.player-videotype-list').show();
        }, function() {
            $('.player-videotype-list').hide();
        });

        //点击切换码率
        $('.player-videotype-list li').click(function(evt) {
            var curTarget = evt.currentTarget;
            if (curTarget.className == 'on') return;
            $('.player-videotype-list li').each(function(idx, element) {
                $(element).attr('class', element == curTarget ? 'on' : '');
            });
            $('.player-videotype-cur').text(curTarget.innerText);
            vplayer.vcore.reqBitRate($(curTarget).attr('bit'));
            $('.player-videotype-list').css('display', 'none');
        });
    }


    //宝箱按钮
    function boxFn() {
        $('.player-chest-btn').click(function() {
            if (!vplayer.vcore.isLogin) {
                vplayer.popLogin();
                return;
            }
            if (vplayer.vcore.hasVideo) {
                var box = vplayer.box;
                box.isShow ? box.hide() : box.show();
            }
        });
    }

    //竞猜
    function guessFn() {
        $(".guess-icon").click(function() {
            vplayer.guess.getUI("MAIN").show();
        });
    }


    var feedbackPanel = null;
    //反馈
    function feedbackFn() {
        $('.player-report-btn').click(function() {
            if (!feedbackPanel) feedbackPanel = new Feedback(vplayer);
            feedbackPanel.isShow ? feedbackPanel.hide() : feedbackPanel.show();
        });
    }

    function closeFeedback() {
        if (feedbackPanel) {
            feedbackPanel.hide();
        }
    }

    //首充礼包
    function firstRechargeFn() {
        $('#player-punch-btn').click(function() {
            vplayer.closeAllPanel();
            if (!vplayer.vcore.isLogin) {
                vplayer.popLogin();
            } else {
                info('J', 'getFirstRecharge');
                var nickName = vplayer.vcore.G.userInfo.sNick;
                vplayer.trigger('getFirstRecharge', { param: { nickName: nickName } });
            }
        });
    }

    //充值
    function rechargeFn() {
        $('#player-recharge-btn').click(function() {
            vplayer.closeAllPanel();
            if (!vplayer.vcore.isLogin) {
                vplayer.popLogin();
            } else {
                var option = { nick: vplayer.vcore.G.userInfo.sNick };
                if (ISDEBUG) {
                    option.url = "http://test.q.huya.com/yy/index.php?m=YbNew&do=buyGreenBeanRequest";
                } else {
                    option.url = "http://q.huya.com/yy/index.php?m=YbNew&do=buyGreenBeanRequest";
                }
                info('J', 'webgamepaylayer');
                vplayer.trigger('webgamepaylayer', { param: option });
            }
        });
    }

    //包裹
    function packageFn() {
        $('#player-package-btn').click(function() {
            var url = 'http://i.huya.com/index.php?m=MyAccount&do=myAccount';
            window.open(url);
        });
    }

    //无直播时，不显示宝箱、竞猜等按钮
    function setBtnsVisible(visible) {
        if (visible) {
            $('#player-btn').show();
            // $('.player-chest').show();
            // $('.guess-icon').show();
        } else {
            $('#player-btn').hide();
            // $('.player-chest').hide();
            // $('.guess-icon').hide();
        }
    }

    //对外接口
    this.setBitRateList = setBitRateList;
    this.setBtnsVisible = setBtnsVisible;
    this.closeFeedback = closeFeedback;
}
