function Feedback(vplayer) {

    var panel, ul, tip, tickHandler;
    var id = "#player-panel-feedback";
    var tick = 3; //提交反馈后的倒计时

    //初始化
    + function() {
        var tmpl = __inline("../../tpl/feedback.tmpl")();
        var defaultArgs = {
            id: 'feedback',
            title: '问题反馈',
            mask: false,
            htmlText: tmpl
        };
        panel = new Panel(defaultArgs);
        panel.onHide = onHide;
        ul = $(id + ' ul');
        tip = $('#feedback-tip');

        $(id).each(utils.NoSelect);

        addEvents();
    }();

    function addEvents() {
        $(id).click(ul.hide);
        $('.feedback-dropList').click(onDropList);
        $(id + ' li').click(onItemClick);
        $('#feedback-submit').click(onSubmit);
        $('#feedback-cancel').click(panel.hide);
        $('#feedback-footer span').click(onQQClick);
    }

    function onDropList(evt) {
        utils.stopPropagation(evt);
        var isShow = ul.css('display') == 'block';
        isShow ? ul.hide() : ul.show();
    }

    function onItemClick(evt) {
        var li = evt.currentTarget;
        var index = $(li).attr('index');
        ul.hide();
        var dropList = $('.feedback-dropList');
        dropList.text(li.innerText);
        dropList.attr('index', index);
    }

    //http://dev.yypm.com/web/?post=posts/standard/interfaces/damo/damo_reportplf.yy.com.md
    function onSubmit() {
        var title = $('.feedback-dropList').text();
        var content = $(id + ' textarea').val();

        if (title == "其它" && content.replace(' ', '') == '') {
            panel.hide();
            return; //没有提交任何实质内容
        }
        /*
        var data = {
            "appId": "huya-web-flash",
            "sign": "",
            "data": {
                "reportType": "UFB",
                "productVer": "1.0.1",
                "uid": vplayer.vcore.G.yyuid,
                "phoneType": new Date().toLocaleString(),
                "osVer": navigator.platform,
                "guid": "",
                "networkState": "",
                "marketChannel": "主站播放器",
                "serviceProvider": navigator.appVersion,
                "feedback": title + '+' + content
            }
        };
        info('x', '反馈数据', data);

        //ajax提交数据
        $.ajax({
            type: 'post',
            contentType: 'multipart/form-data',
            url: 'http://reportplf.yy.com/userFeedback',
            data: data,
            error: function(xhr, status, et) {
                error('x', "提交反馈出错", status, et);
            },
            success: function(data, status) {
                info('x', status, data);
            }
        });
        */
        var index = $('.feedback-dropList').attr('index');
        var obj = {
            site: 1,
            type: index,
            error_text: title + '+' + content
        }
        var strdata = JSON.stringify(obj);
        var data = {
            data: strdata,
            log: 'VIDEO_FLOW save=0% stream=0+0=0 signal=0+0=0',
            sign: md5("flash_feedback_20141105_" + strdata)
        }
        info('x', '反馈数据', data);

        var url = 'http://www.huya.com/api/flashFeedBack.php';
        if (ISDEBUG) {
            url = 'http://test.www.huya.com/api/flashFeedBack.php';
        }
        $.ajax({
            "type": 'GET',
            "dataType": "jsonp",
            "url": url,
            "data": data,
            "error": function(xhr, status, et) {
                error('x', "FeedBack请求出错", status, et);
            },
            "success": function(data, status) {
                if (status == 'success') {
                    info('x', '反馈数据提交成功');
                } else {
                    info('x', '反馈数据提交失败', status, data);
                }
            }
        });

        tick = 3;
        tip.text("正在提交...");
        tickHandler = setInterval(onTick, 1000);
    }

    function onTick() {
        if (tick == 0) {
            panel.hide();
            return;
        }
        tip.text("提交成功，" + tick + "秒后关闭窗口...");
        tick--;
    }

    function onQQClick() {
        var url = "http://shang.qq.com/wpa/qunwpa?idkey=e9d5c7c88c2ea111215a3a1155f07eac34907ebe8dd58d8d2c9d7600d4c7d9fd";
        window.open(url);
    }

    function show() {
        panel.show();
        tip.text('');
    }

    function onHide() {
        $('.feedback-dropList').text('其它');
        $(id + ' textarea').val('');
        ul.hide();
        tip.text('');
        clearInterval(tickHandler);
    }

    function isShow() {
        return panel.isShow;
    }


    //对外接口
    this.show = show;
    this.hide = panel.hide;

    Object.defineProperties(this, {
        isShow: { //当前是否显示
            get: function() {
                return panel.isShow;
            }
        }
    });
}
