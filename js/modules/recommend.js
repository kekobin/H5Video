/**
 * 无直播时的推荐视频
 */
function Recommend() {

    var id = '#player-recommend';
    var isShow = false;

    var dataUrl = 'http://14.17.108.66:18080/dispatch?service=liverecommend&appid=9&gid=1&callback=?';

    function reqData() {
        //jsonp请求
        $.getJSON(dataUrl, function(jsonData) {
            var json = JSON.parse(jsonData.result);
            log('<=== RecommendList', json);
            var liveList = [];
            for (var i = 0, len = json.liveList.length; i < len; i++) {
                var data = json.liveList[i];
                if (data.yyid > 0) {
                    liveList.push(data);
                } else if ('privateHost' in data) {
                    data.yyid = data.privateHost;
                    liveList.push(data);
                }
            }

            removeEvents();
            $(id).remove();
            var tmpl = __inline('../../tpl/recommend.tmpl')({
                liveList: liveList
            });
            utils.insertHTML($('#player-wrap')[0], 'beforeEnd', tmpl);
            addEvents();
        });
    }

    function show() {
        if(isShow) return;
        isShow = true;
        reqData();
    }

    function hide() {
        isShow = false;
        $(id).remove();
    }

    function addEvents() {
        $('.player-recommend-name').click(showVideo);
        $('.player-recommend-head').click(showVideo);
        $('.player-recommend-vbox').click(showVideo);
        $('.player-recommend-all').click(showAllVideo);

        onResize();
        $(window).resize(onResize);
    }

    function removeEvents() {
        $('.player-recommend-name').unbind('click');
        $('.player-recommend-head').unbind('click');
        $('.player-recommend-vbox').unbind('click');
        $('.player-recommend-all').unbind('click');
        $(window).unbind('resize', onResize);
    }

    function onResize() {
        var w = $('#player-recommend').width();
        var h = $('#player-recommend').height();
        var row = (h - 150) / 216 >> 0;
        var col = (w - 20) / 258 >> 0;
        row = Math.min(2, Math.max(0, row)); //最多2行
        col = Math.min(4, Math.max(0, col)); //最多4列
        var container = $('.player-recommend-container');
        container.width(col * 258);
        container.height(row * 216 + 48);
        container.css({
            left: w - container.width() >> 1,
            top: h - 100 - container.height() >> 1
        });
    }

    function showVideo(evt) {
        var curTarget = evt.currentTarget;
        var li = curTarget.parentNode;
        var yyid = $(li).attr('yyid');
        var url = 'http://www.huya.com/' + yyid;
        location.href = url;
    }

    function showAllVideo() {
        var url = 'http://www.huya.com/l';
        location.href = url;
        // window.open(url);
    }


    Object.defineProperties(this, {
        isShow: { //当前是否显示
            get: function() {
                return isShow;
            }
        }
    });
    this.show = show;
    this.hide = hide;
}
