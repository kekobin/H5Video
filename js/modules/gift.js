function Gift(vplayer) {
    var curPropsItem = null;

    this.closeSetting = closeSetting;
    this.setData = function(propsList) {
        var tmpl = __inline('../../tpl/gift.tmpl');
        tmpl = tmpl({ propsList: propsList });
        $('#player-face').html(tmpl);

        var propsDict = {};
        var len = propsList.length;
        for (var i = 0; i < len; i++) {
            var item = propsList[i];
            propsDict[item.iPropsId] = item;
        }
        storePropsData("propsDict", propsDict);
        addEventListener();

        $('.player-face img').each(utils.NoDrag);
    };

    //把道具数据存储到session
    function storePropsData(key, obj) {
        var data = JSON.stringify(obj);
        window.sessionStorage[key] = data;
    }

    //根据道具ID返回PropsItem
    function getPropsData(propsId) {
        var propsDict = window.sessionStorage['propsDict'];
        propsDict = JSON.parse(propsDict)
        var propsItem = propsDict[propsId];
        return propsItem;
    }

    function getIconUrl(propsItem) {
        var icon = propsItem.vPropsIdentity.val[0].sPropsPic24;
        return icon.split('&')[0];
    }

    function addEventListener() {
        $(".player-face-gift").hover(onMouseOver, onMouseOut);
        $(".player-face-gift").click(onShowPanel);
        $('.player-face-sel li').click(onClickNum);
        $('.player-face-give-input').bind('input', onInput);
        $(".player-face-close").click(onClose);
        $('.player-face-give-btn').click(onSendGift);
        $('.player-face-pre').click(onPre);
        $('.player-face-next').click(onNext);
        $('.player-face-set').click(onShowSetting);

        onResize();
        $(window).resize(onResize);
        //点击其它地方，自动关闭面板
        $('body').click(onClose);
        $('.player-face-layer').click(utils.stopPropagation);
    }

    function onResize() {
        var w = $('.player-gift-wrap').width() - 390;
        w = (w / 50 >> 0) * 50;
        var lw = $('.player-face-list li').length * 50;
        $('.player-face-list').width(Math.min(w, lw));

        $('.player-face-pre').css('visibility', lw < w ? 'hidden' : 'visible');
        $('.player-face-next').css('display', lw < w ? 'none' : 'block');

        minX = Math.min(w, lw) - lw;
        curX = Math.max(curX, minX);
        $('.player-face-list ul').css('left', curX);
    }

    var curX = 0; //ul当前偏移量
    var minX = 0; //ul最小偏移量

    function onPre() {
        curX = Math.min(curX + 50, 0);
        $('.player-face-list ul').css('left', curX);
    }

    function onNext() {
        curX = Math.max(curX - 50, minX);
        $('.player-face-list ul').css('left', curX);
    }

    var lightWord = { 1: "绿色流光", 2: "蓝色流光", 3: "红色流光", 4: "金色流光" };
    var onceTips = "一次赠送<span>{0}个</span>触发{1}";
    var moreTips = "一次赠送<span>{0}个</span>/连送<span>{1}组</span>触发{2}";

    function onMouseOver(evt) {
        //$(xx).position() 相对于父容器的偏移
        //$(xx).offset() 相对于页面的偏移
        var curTarget = evt.currentTarget;
        var targetLeft = $(curTarget).offset().left;
        var tipWidth = $('.player-face-tip').width();
        var tipRight = targetLeft + tipWidth;
        var videoRight = $(vIdDom).offset().left + $(vIdDom).width();
        var left = tipRight > videoRight ? curTarget.offsetLeft - tipWidth + $(curTarget).width() : curTarget.offsetLeft;
        left += 20 + curX; //加上左侧箭头宽度和滚动偏移
        $('.player-face-tip').css({ display: "block", left: left + "px" });

        var propsId = $(curTarget).attr('propsId');
        var propsItem = getPropsData(propsId);

        var icon = getIconUrl(propsItem);
        $('.player-face-tip img').attr('src', icon);

        var content = propsItem.sPropsName + "<span>(";
        content += propsItem.iPropsYb * 0.01 + "Y币/";
        content += propsItem.iPropsGreenBean + "金豆";
        if (propsItem.iPropsWhiteBean > 0) {
            content += "/" + propsItem.iPropsWhiteBean + "银豆";
        }
        content += ")</span>";
        $('.player-face-tip-txt h3').html(content);

        var pList = $('.player-face-tip-txt p');
        pList[0].innerHTML = propsItem.sPropsToolTip;

        if (isOutdoor) { //户外
            pList[1].innerHTML = '';
            return;
        }

        var tmp = onceTips.replace('{0}', propsItem.iPropsGroupNum);
        tmp = tmp.replace('{1}', lightWord[propsItem.iPropsGrade]);

        var spInfo = propsItem.tSpecialInfo;
        var seInfo = getSecondInfo(spInfo);
        tmp += "<br>" + moreTips.replace("{0}", seInfo.single).replace("{1}", seInfo.group).replace("{2}", seInfo.tip);
        tmp += "<br>" + moreTips.replace("{0}", spInfo.iWorldSingle).replace("{1}", spInfo.iWorldGroup).replace("{2}", "世界横幅");
        pList[1].innerHTML = tmp;
    }

    //copy from flash project
    function getSecondInfo(info) {
        if (info.iFirstSingle != 0) {
            return { single: info.iFirstSingle, group: info.iFirstGroup, tip: info.sFirstTips };
        } else if (info.iSecondSingle != 0) {
            return { single: info.iSecondSingle, group: info.iSecondGroup, tip: info.sSecondTips };
        } else {
            return { single: info.iThirdSingle, group: info.iThirdGroup, tip: info.sThirdTips };
        }
    }

    function onMouseOut(evt) {
        $('.player-face-tip').css("display", "none");
    }

    function onShowPanel(evt) {
        utils.stopPropagation(evt);
        var curTarget = evt.currentTarget;
        $('.player-face-tip').css("display", "none");
        var left = curTarget.offsetLeft + ($(curTarget).width() - $('.player-face-layer').width()) / 2 - 8;
        left += 20 + curX; //加上左侧箭头宽度和滚动偏移
        $('.player-face-layer').css({ display: "block", left: left + "px" });

        var propsId = $(curTarget).attr('propsId');
        var propsItem = curPropsItem = getPropsData(propsId);

        var icon = getIconUrl(propsItem);
        $('.player-face-give img').attr('src', icon);

        var numList = propsItem.vPropsNum.val;
        var list = $('.player-face-sel strong');
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].innerText = numList[i];
        }
        $('.player-face-give-input').val(1);
        updatePrice(1);
    }

    //更新底部总价格
    function updatePrice(count) {
        count = Math.max(1, parseInt(count));
        var tmpl = "消耗：<i></i><span>{0}</span>";
        if (curPropsItem.iPropsWhiteBean == -1) { //只有金豆
            tmpl = tmpl.replace('{0}', curPropsItem.iPropsGreenBean * count);
            $('.player-face-foot').html(tmpl);
            $('.player-face-foot i').attr('class', 'player-face-bean-gold');

        } else { //金豆、银豆
            tmpl = "消耗：<i class='player-face-bean-silver'></i><span>{0}/</span><i class='player-face-bean-gold'></i><span>{1}</span>";
            tmpl = tmpl.replace("{0}", curPropsItem.iPropsWhiteBean * count);
            tmpl = tmpl.replace("{1}", curPropsItem.iPropsGreenBean * count);
            $('.player-face-foot').html(tmpl);
        }
    }

    //点击数量
    function onClickNum(evt) {
        var count = $(evt.currentTarget).find('strong').text();
        $('.player-face-give-input').val(count);
        updatePrice(count);
    }

    //输入框事件
    function onInput() {
        var count = $('.player-face-give-input').val();
        var num = "";
        for (var i = 0, len = count.length; i < len; i++) {
            var code = count.charCodeAt(i);
            if (code >= 48 && code <= 57) {
                num += count.charAt(i);
            }
        }
        count = Math.max(1, parseInt(num));
        $('.player-face-give-input').val(count);
        updatePrice(count);
    }


    var giftSetting = null;
    //弹出设置面板
    function onShowSetting() {
        if (!giftSetting) {
            giftSetting = new GiftSetting(vplayer);
        }
        giftSetting.show();
    }

    function closeSetting() {
        if (giftSetting) {
            giftSetting.hide();
        }
    }

    function onClose() {
        $('.player-face-layer').css("display", "none");
    }

    function onSendGift() {
        var itemId = curPropsItem.iPropsId;
        var itemCount = $('.player-face-give-input').val();
        itemCount = Math.max(1, parseInt(itemCount));
        vplayer.vcore.sendCardPackageItem(itemId, itemCount);
        onClose();
    }

}
