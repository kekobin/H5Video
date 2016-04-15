var container = null; //video标签的容器
var video = null; //video标签元素
var vplayer = null; //播放器UI界面
var hhplayer = null; //HHPlayer播放器
var isplaying = false; //视频是否正在播放
var playingUrl = null; //正在播放的视频url
var muted = false; //是否静音
var volume = 100; //音量，0~100
var reConnectTimes = 0; //重连次数
var timeoutHandler = 0;

function initH5Player(obj) {
    vplayer = obj.context;
    container = obj.target;
    vplayer || warn('V', '%cvplayer undefined.', 'font-size:xx-large');
    container || warn('V', '%cvideo container undefined.', 'font-size:xx-large');

    G.topsid = obj.tid == 0 ? 23892497 : obj.tid;
    G.subsid = obj.sid == 0 ? 23892497 : obj.sid;
    G.appid = G.curBitRate = obj.appid;
    info('V', "频道信息:", obj.tid, obj.sid, obj.appid);

    drawHtmlInner();
    initHHPlayer();
    danmu.initDanmu();
}

function drawHtmlInner() {
    video = createElement('video', container, {
        id: 'hy-video',
        class: 'hy-video',
        autoplay: 'autoplay'
    });
    createElement('canvas', container, {
        id: 'hy-danmu',
        class: 'hy-danmu',
    });
    $('#hy-video').bind('contextmenu', function() {
        return false;
    });
}

function createElement(tagName, parent, attrs, data) {
    var element = document.createElement(tagName);
    parent.appendChild(element);
    if (attrs) {
        for (var attribute in attrs) {
            element.setAttribute(attribute, attrs[attribute]);
        }
    }
    if (data) {
        element.innerHTML = data;
    }
    return element;
}

function initHHPlayer() {
    addVideoEvent(video);
    var config = {
        debug: false,
    };
    hhplayer = new HHPlayer(video, config);
}

//内部接口,由getLivingInfo或batchGetCdnTokenInfo拿到视频地址后调用
function _play(url) {
    playingUrl = url;
    if (!HHPlayer.isSupported()) {
        warn('V', "%cHHPlayer.isSupported = false", "font-size:xx-large");
        return;
    }
    isplaying = false;
    hhplayer.loadUrl(url);
    reConnectTimes = 0;
    runTimeoutCheck();
}

//重新请求视频地址,返回后自动调用_play
function play() {
    batchGetCdnTokenInfo();
}

function pause() {
    video.pause();
    danmu.clear();
    isplaying = false;
    clearTimeout(timeoutHandler);
    log('V', '### pause');
}

//音量控制
Object.defineProperties(this, {
    muted: { //是否静音
        get: function() {
            return muted;
        },
        set: function(v) {
            muted = !!v;
            video.muted = muted;
            log('V', "### muted=" + muted);
        }
    },
    volume: { //音量值
        get: function() {
            return volume;
        },
        set: function(v) {
            v = Math.min(v, 100);
            v = Math.max(v, 0);
            volume = v;
            video.volume = v * 0.01;
            log('V', "### volume=" + volume);
        }
    }
});


function runTimeoutCheck() {
    clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(onTimeoutHandler, 10000);
}

function onTimeoutHandler() {
    if (isplaying) {
        clearTimeout(timeoutHandler);
        return;
    }
    reConnectTimes++;
    if (reConnectTimes > 3) {
        info('V', '%c视频重连次数超标', "font-size:120%");
        //TODO: 其它提示
    } else {
        info('V', "### reloading");
        hhplayer.loadUrl(playingUrl);
        runTimeoutCheck();
    }
}

function addVideoEvent(video) {
    video.onloadstart = onLoadStart;
    video.onerror = onLoadError;
    video.onwaiting = onVideoWaiting;
    video.oncanplay = onStartPlaying;
    video.onplaying = onVideoPlaying;
}

//当开始查找媒体数据时产生该事件
function onLoadStart() {
    log('V', "### onLoadStart");
    vplayer.showLoading();
}

//当加载媒体发生错误时产生该事件
function onLoadError(evt) {
    warn('V', '### onLoadError', evt);
}

//当视频因缓冲下一帧而停止时产生该事件
function onVideoWaiting() {
    log('V', "### onVideoWaiting");
}

//当浏览器可以开始播放该音视频时产生该事件
function onStartPlaying() {
    log('V', "### onStartPlaying");
    isplaying = true;
    vplayer.hideLoading();

    if (!onStartPlaying.isFirst) {
        onStartPlaying.isFirst = true;
        Test.printTime('video', '开始播放视频');
    }
}

//当媒体从因缓冲而引起的暂停和停止恢复到播放时产生该事件
function onVideoPlaying() {
    log('V', "### onVideoPlaying");
}

//======================================================
