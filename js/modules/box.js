/**
 * 宝箱类
 */
function Box(vplayer) {

    var drag, box, list;
    var isShow = false;

    + function() {
        var tmpl = __inline('../../tpl/box.tmpl')();
        utils.insertHTML(document.body, 'beforeEnd', tmpl);

        box = $('#player-box')[0];
        list = $('.player-box-list li');
        drag = new Drag(box, {
            limit: true,
            handle: $('.player-box-title')[0],
            container: $(vIdDom)[0]
        });

        addEvents();
    }();

    function addEvents() {
        toFront();
        $(box).click(toFront);
        $('.player-box-title span').click(hide);
        $('.player-box-stat3').click(onGetAward);
        $('.player-chest-bg').hover(onMouseOverBtn, onMouseOutBtn);
        $('.player-chest-login i').click(hideLoginTip);
        $('.player-chest-login span').click(popLogin);

        Event.addEvent(Event.WEBSOCKET_INITED, initLoginTip);
        Event.addEvent(Event.JS_DEFINITION_INITED, initLoginTip);
    };

    function popLogin() {
        vplayer.popLogin();
    }

    var _initEvent = 0;

    function initLoginTip() {
        _initEvent++;
        if (_initEvent < 2) return;
        var isLogin = vplayer.vcore.isLogin;
        $('.player-chest-login').css('display', isLogin ? 'none' : 'block');
    }

    function hideLoginTip() {
        $('.player-chest-login').hide();
    }

    function toFront() {
        document.body.appendChild(box);
    }

    function show() {
        isShow = true;
        toFront();
        $(box).show();

        var o = $(vIdDom).offset();
        var w = $(vIdDom).width();
        var h = $(vIdDom).height();
        var bw = $(box).width();
        var bh = $(box).height();
        var top = (h - 100 - bh >> 1) + o.top - 30;
        top = Math.max(top, 50);

        TweenLite.killTweensOf(box);
        TweenLite.fromTo(box, 0.5, {
            left: o.left - bw / 2,
            top: o.top + h - bh / 2,
            scale: 0.1,
            opacity: 0,
            ease: Back.easeOut
        }, {
            left: (w - bw >> 1) + o.left,
            top: top,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut
        });
    }

    function hide(evt) {
        utils.stopPropagation(evt);
        isShow = false;

        var o = $(vIdDom).offset();
        var w = $(vIdDom).width();
        var h = $(vIdDom).height();
        var bw = $(box).width();
        var bh = $(box).height();

        TweenLite.killTweensOf(box);
        TweenLite.to(box, 0.5, {
            left: o.left - bw / 2,
            top: o.top + h - bh / 2,
            scale: 0.1,
            opacity: 0,
            ease: Back.easeIn,
            onComplete: function() {
                $(box).hide();
                TweenLite.set(box, { scale: 1, opacity: 1 });
            }
        });
    }

    function onGetAward(evt) {
        var p = evt.currentTarget;
        var index = $(p).attr('index');
        vplayer.vcore.reqAwardBoxPrize(index);
    }

    function onMouseOverBtn() {
        var isLogin = vplayer.vcore.isLogin;
        if (!isLogin) return;
        if (awardCount == 0 && (cdIndex < 1 || cdIndex > 6)) {
            return; //所有奖励已领完
        }
        if ($(box).css('display') == 'none') {
            $('.player-chest-tip').css('display', 'block');
        }
    }

    function onMouseOutBtn() {
        $('.player-chest-tip').css('display', 'none');
    }

    //=========================================
    var boxData = null; //GetUserBoxInfoRsp
    var cdIndex = 0; //正在CD中的任务索引
    var cdTime = 3 * 60; //第1次：3min，第2~6次：10min
    var cdEle = null; //弹出面板CD中的标签
    var cdEle2 = null; //左下角宝箱按钮上的CD标签
    var tickHandler;
    var awardCount = 0; //可领取的数量
    var countEle = null; //可领取数量标签

    function onTick() {
        if (cdTime < 0) {
            clearInterval(tickHandler);
            setTimeout(function() {
                vplayer.vcore.reqFinishTaskNotice(cdIndex);
            }, 1000);
            return;
        }
        var stime = formatTime();
        cdEle.text(stime);
        cdEle2.text(stime);
        if (awardCount == 0) {
            $('.player-chest-tip span').text(stime);
        }
        cdTime--;
    }

    function formatTime() {
        var m = (cdTime / 60 >> 0) % 60;
        var s = cdTime % 60;
        m = (m < 10) ? '0' + m : '' + m;
        s = (s < 10) ? '0' + s : '' + s;
        return m + ":" + s;
    }

    function initCdEle() {
        if (cdIndex < 1 || cdIndex > 6) {
            cdEle2.css('display', 'none');
            return;
        }
        var li = list[cdIndex - 1];
        $(li).find('p').css('visibility', 'hidden');
        $(li).find('.player-box-stat2').css('visibility', 'visible');
        cdEle = $(li).find('.player-box-stat4');
        cdEle.css({
            visibility: 'visible',
            color: '#fff'
        });
        cdTime = (cdIndex == 1) ? 3 * 60 : 10 * 60;
        onTick();
        clearInterval(tickHandler);
        tickHandler = setInterval(onTick, 1000);
    }

    function endCdEle() {
        var li = list[cdIndex - 1];
        $(li).find('p').css('visibility', 'hidden');
        $(li).find('.player-box-stat3').css('visibility', 'visible');
    }

    function updateAwardCount() {
        var hasAward = awardCount > 0;
        $('.chest-award-count').css('display', hasAward ? 'block' : 'none');
        $('.chest-award-count').text(hasAward ? awardCount + '' : '');
        $('.player-chest-tip i').css('display', 'none');
        if (hasAward) {
            $('.chest-stat-3').css('display', 'block');
            $('.player-chest-tip span').text(awardCount);
            $('.player-chest-tip span').attr('class', 'chest-tip-words-3');
        } else {
            $('.chest-stat-2').css('display', 'block');
            $('.player-chest-tip span').attr('class', 'chest-tip-words-2');
        }
    }

    //=========================================

    //更新百宝箱状态
    function updateBoxList(data) {
        boxData = data;
        cdIndex = 0;
        awardCount = 0;
        for (var i = 1; i <= 6; i++) {
            var info = boxData['tTask' + i];
            var li = list[i - 1];
            var lii = li.getElementsByTagName('i')[0];
            $(li).find('p').css('visibility', 'hidden');

            if (info.iStat == 0) { //0:未完成
                if (cdIndex == 0) cdIndex = i;
                $(lii).attr('class', 'player-box-icon-close');
                $(li).find('.player-box-stat1').css('visibility', 'visible');
            } else if (info.iStat == 1) { //1:已完成，未领取
                awardCount++;
                $(lii).attr('class', 'player-box-icon-open');
                $(li).find('.player-box-stat3').css('visibility', 'visible');
            } else if (info.iStat == 2) {
                //2:已领取, itemType: 银豆:8, 霸气:2, 萌:4, 浪:20035
                $(lii).attr('class', 'player-box-icon-' + info.iItemType);
                $(li).find('.player-box-stat4').css({
                    visibility: 'visible',
                    color: '#FA6A11'
                });
                $(li).find('.player-box-stat4').text("x" + info.iItemCount);
            }
        }
        cdEle2 = $('.player-chest-cd');
        if (cdIndex > 0 || cdIndex <= 6) {
            cdEle2.css('display', 'block');
        }
        updateAwardCount();
        initCdEle();
    }

    //通知百宝箱CD结束
    function finishBoxCd(taskId) {
        endCdEle();
        cdIndex++;
        awardCount++;
        updateAwardCount();
        initCdEle();
    }

    //百宝箱领取结果
    function showBoxReward(obj) {
        awardCount--;
        updateAwardCount();

        var info = boxData['tTask' + obj.iTaskId];
        info.iStat = 2;
        info.iItemType = obj.iItemType;
        info.iItemCount = obj.iCount;

        var li = list[obj.iTaskId - 1];
        var lii = li.getElementsByTagName('i')[0];

        $(lii).attr('class', 'player-box-icon-' + info.iItemType);
        $(li).find('p').css('visibility', 'hidden');
        $(li).find('.player-box-stat4').css('visibility', 'visible');
        $(li).find('.player-box-stat4').text("x" + info.iItemCount);
    }

    //=========================================

    //对外接口
    Object.defineProperties(this, {
        isShow: { //当前是否显示
            get: function() {
                return isShow;
            }
        }
    });
    this.show = show;
    this.hide = hide;
    this.updateBoxList = updateBoxList;
    this.finishBoxCd = finishBoxCd;
    this.showBoxReward = showBoxReward;
}
