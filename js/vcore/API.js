/*
    VCore对外的API
 */

//[函数]初始化播放器
this.initH5Player = initH5Player;
//[函数]播放
this.play = play;
//[函数]暂停播放
this.pause = pause;
//[函数]请求切换视频码率
this.reqBitRate = reqBitRate;
//[函数]增加弹幕
this.playDanmu = function(txt, txtcolor) {
    danmu.playDanmu(txt, txtcolor);
};
//[函数]显示或隐藏弹幕
this.showDanmu = function(visible) {
    danmu.setVisible(visible);
};
//设置弹幕透明度
this.setDanmuAlpha = function(alpha) {
    danmu.setAlpha(alpha);
};
//设置弹幕显示区域
this.setDanmuArea = function(area) {
    danmu.setArea(area)
};

/*===========VCore的属性==============

//[属性]是否静音
this.muted = false;

//[属性]音量控制(0~100)
this.volume = 100;

======================================*/

//[函数]设置支付策略
this.setPayPloy = setPayPloy;

//[函数]消费道具
this.sendCardPackageItem = sendCardPackageItem;

//相关属性
Object.defineProperties(this, {
    //[属性]是否已登录
    isLogin: {
        get: function() {
            return G.isLogin;
        }
    },
    hasVideo: {
        get: function() {
            return G.hasVideo;
        }
    },
    //[属性]用户是否已经领取过首充礼包
    isGetFirstRechargePkg: {
        get: function() {
            return G.isGetFirstRechargePkg;
        }
    }
});

//百宝箱CD结束
this.reqFinishTaskNotice = reqFinishTaskNotice;
//领取百宝箱
this.reqAwardBoxPrize = reqAwardBoxPrize;




//===========TAF===============

//添加Taf协议监听
this.addTafListener = function(type, fn) {
    taf.addListener(type, fn);
}

//移除Taf协议监听
this.removeTafListener = function(type, fn) {
    taf.removeListener(type, fn);
}

//WUP请求接口
this.requestTaf = function(moduleName, funcName, data) {
    taf.sendWup(moduleName, funcName, data);
}

//WUP请求接口
this.sendWup = function(moduleName, funcName, data) {
    taf.sendWup(moduleName, funcName, data);
}
