/**
   本模块仅处理登录初始化信息与视频相关信息
 */

function getCookie(cookieName) {
    var name = cookieName + '=';
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var item = arrCookie[i];
        if (item.indexOf(name) == 0) {
            return item.substr(name.length)
        }
    }
    return "";
}

//WebSocket 连接成功
taf.addListener("WEBSOCKET_CONNECTED", function() {
    G.yyuid = getCookie("yyuid");
    G.isLogin = !(G.yyuid == 0 || G.yyuid == "");
    if (!G.isLogin) {
        warn('T', "===未登录!===");
    }

    G.userId = new HUYA.UserId();
    G.userId.lUid = G.yyuid;
    G.userId.sGuid = "";
    G.userId.sToken = "";
    G.userId.sHuYaUA = "web&ver&websocket";
    G.userId.sCookie = document.cookie;

    Test.printTime('video', 'WebSocket连接成功');
    getLivingInfo(); //播放视频优先级最高，然后再获取其它信息

    Event.fireEvent(Event.WEBSOCKET_INITED, G);
});


//登录获取token, sGuid
function doLaunch() {
    var req = new HUYA.LiveLaunchReq();
    req.tId = G.userId;
    req.tLiveUB.eSource = HUYA.ELiveSource.WEB_HUYA;
    taf.sendWup("liveui", "doLaunch", req);
}
//收到token信息, sGuid
taf.addListener("doLaunch", function(data) {
    G.userId.sGuid = data.sGuid;
    log('T', 'sGuid = ' + G.userId.sGuid);
    // data.iTime 当前服务器时间
    // data.vProxyList 服务器ip地址:端口
    var list = data.vProxyList.val;
    for (var i = 0, len = list.length; i < len; i++) {
        var proxy = list[i];
        if (proxy.eProxyType == 5) {
            var ips = proxy.sProxy.val;
            var ipstr = ips.join('|');
            ipstr = encodeURIComponent(ipstr);
            localStorage.wsips = ipstr;
            break;
        }
    }
    vplayer.trigger('setGuid', { param: { guid: data.sGuid } });

    login(); //登录注册
    userIn(); //订阅频道
    getWebdbUserInfo();
    getPropsList();
    getVerificationStatus();
    getFirstRechargePkgStatus();
});

//有直播时才需要的请求
function reqAfterPlaying() {
    getUserBoxInfo(); //百宝箱
}


//登录注册
function login() {
    if (!G.isLogin) return;
    var info = new HUYA.WSUserInfo();
    info.lUid = G.yyuid;
    info.bAnonymous = (G.yyuid == 0);
    info.sGuid = G.userId.sGuid;
    info.sToken = "";
    info.lTid = G.topsid;
    info.lSid = G.subsid;
    info.lGroupId = 0;
    info.lGroupType = 0;
    taf.sendRegister(info);
}
taf.addListener("WSRegisterRsp", function(data) {
    //登录注册返回，Do nothing.
});


//订阅频道
function userIn() {
    var req = new HUYA.UserChannelReq();
    req.tId = G.userId;
    req.lTopcid = G.topsid;
    req.lSubcid = G.subsid;
    req.sSendContent = "";
    log('T', "订阅频道：", G.topsid, G.subsid);
    taf.sendWup("liveui", "userIn", req);
}
taf.addListener("userIn", function(data) {
    log('T', "<<< 成功进入频道 ", data);
});

//取用户信息
function getWebdbUserInfo() {
    if (!G.isLogin) return;
    var req = new HUYA.GetWebdbUserInfoReq();
    req.lUid = G.yyuid;
    req.lImid = 0;
    req.sPassport = getCookie("username");
    req.sAccount = 0;
    req.bCacheFirst = true;
    taf.sendWup("liveui", "getWebdbUserInfo", req);
}
taf.addListener("getWebdbUserInfo", function(data) {
    G.userInfo = data.tUserInfo;
    reqTicket();
    Event.fireEvent(Event.USER_INFO_INITED, G);
    vplayer.trigger('gamelivePubTextInitComplete');
    vplayer.trigger('GameLiveSeriveInitComplete');
});

//获取直播间信息
function getLivingInfo() {
    var livingInfo = new HUYA.GetLivingInfoReq();
    livingInfo.tId = G.userId;
    livingInfo.lTopSid = G.topsid;
    livingInfo.lSubSid = G.subsid;
    taf.sendWup("liveui", "getLivingInfo", livingInfo);
}
taf.addListener("getLivingInfo", function(data) {
    G.livingInfo = data;
    var notice = data.tNotice; //HUYA.BeginLiveNotice
    var cdnList = notice.vCdnList.val;
    var streamInfoList = notice.vStreamInfo.val; //HUYA.StreamInfo
    G.hasVideo = streamInfoList.length > 0;
    if (!G.hasVideo) vplayer.showRecommend(true);

    G.streamInfo = null;
    for (var i = 0; i < streamInfoList.length; i++) {
        var info = streamInfoList[i];
        if (info.iLineIndex == 0) { //默认选线路0
            G.streamInfo = info; //全局变量
            break;
        }
    }
    //[事件]获取视频信息完毕
    Event.fireEvent(Event.VIDEO_INFO_INITED, G);

    var info = info || streamInfoList[0];
    if (!info && streamInfoList.length == 0) {
        warn('T', "[getLivingInfo]此频道当前无直播！");
        doLaunch(); //播不了视频，其它逻辑还要继续
        return;
    }
    //原画码率
    G.SrcBitRate = data.tStreamSettingNotice.iBitRate;

    //码率，清晰度列表
    var bitrateList = notice.vMultiStreamInfo.val;
    for (var i = 0, len = bitrateList.length; i < len; i++) {
        var item = bitrateList[i];
        if (item.iBitRate == 0) {
            item.iBitRate = data.tStreamSettingNotice.iBitRate;
        }
        item.iBitRate = getTrueBitRate(item.iBitRate);
    }
    //取默认码率的近似值
    var defaultBit = bitrateList[0].iBitRate;
    for (var i = 1, len = bitrateList.length; i < len; i++) {
        var item = bitrateList[i];
        if (notice.iWebDefaultBitRate >= item.iBitRate) {
            defaultBit = item.iBitRate;
        } else {
            break;
        }
    }
    vplayer.setBitRateList({ list: bitrateList, default: defaultBit });

    // var url = info.sHlsUrl + "/" + info.sStreamName + "." + info.sHlsUrlSuffix + '?' + info.sHlsAntiCode;
    Test.printTime('video', '取得视频地址，加载');
    var url = info.sHlsAntiCode;
    _play(url);

    doLaunch(); //播放视频优先级最高，然后再获取其它信息
    reqAfterPlaying();
});

//把后端返回的码率转换为近似码率
function getTrueBitRate(bit) {
    bit = parseInt(bit);
    if (bit == G.SrcBitRate) {
        return bit; //原画码率不变
    }
    var sbit = bit + '';
    if (sbit in G.BitRate1 || sbit in G.BitRate2) {
        return bit;
    } else {
        var rbit = G.BitRate[0];
        for (var j = 1, len = G.BitRate.length; j < len; j++) {
            if (bit >= G.BitRate[j]) {
                rbit = G.BitRate[j];
            } else {
                break;
            }
        }
        return rbit;
    }
}

//替代 getCdnTokenInfo
function batchGetCdnTokenInfo(appid) {
    if (!G.streamInfo) return; //TODO===
    if (!appid) appid = G.curBitRate;

    var req = new HUYA.BatchGetCdnTokenReq();
    req.sStreamName = G.streamInfo.sStreamName;

    var cdnInfo = new HUYA.TokenCdnInfo();
    cdnInfo.sCdnName = G.streamInfo.sCdnType;
    cdnInfo.sUrl = "http://hls.yy.com/" + G.topsid + "_" + G.subsid + "_" + appid + ".m3u8";

    req.vCdnInfos.val.push(cdnInfo);
    taf.sendWup("liveui", "batchGetCdnTokenInfo", req);
}
taf.addListener("batchGetCdnTokenInfo", function(data) {
    var infoList = data.vCdnAntiCodes.val; //[CdnAntiCodeInfo]
    if (infoList.length == 0) {
        info('T', '==batchGetCdnTokenInfo==');
        return;
    }
    var url = infoList[0].sHlsAntiCode;
    _play(url);
});

//请求切换视频清晰度
function reqBitRate(bit) {
    var appid = G.appid.toString();
    if (bit != G.SrcBitRate) {
        var stype = bit.toString();
        if (stype in G.BitRate1) {
            appid += G.BitRate1[stype];
        } else if (stype in G.BitRate2) {
            appid = G.BitRate2[stype];
        }
    }
    G.curBitRate = appid;
    batchGetCdnTokenInfo(appid);
}

//======================================================

//获取活动道具配置
function getPropsList() {
    var req = new HUYA.GetPropsListReq();
    req.tUserId = G.userId;
    req.sMd5 = "";
    req.iTemplateType = HUYA.EClientTemplateType.TPL_PC;
    req.sVersion = "";
    taf.sendWup("PropsUIServer", "getPropsList", req);
}
taf.addListener("getPropsList", function(data) {
    //data: GetPropsListRsp
    var propsList = data.vPropsItemList.val; //[PropsItem]
    vplayer.setGiftList(propsList);
    vplayer.trigger('getGifObj', { param: data });
});


//道具消费接口
function sendCardPackageItem(itemId, itemCount) {
    if (!G.isLogin) {
        vplayer.popLogin();
        return;
    }
    if (!G.hasVideo) {
        info('T', '当前没有直播，不能送礼物！');
        return;
    }
    var req = new HUYA.SendCardPackageItemReq();
    req.tId = G.userId;
    req.lSid = G.topsid;
    req.lSubSid = G.subsid;
    req.iShowFreeitemInfo = 0;
    req.iItemType = itemId;
    req.iItemCount = itemCount;
    req.lPresenterUid = G.livingInfo.tNotice.lPresenterUid;
    req.sPayId = getPayId();
    req.sSendContent = "";
    req.sSenderNick = G.userInfo.sNick;
    req.sPresenterNick = G.livingInfo.tNotice.sNick;
    req.iPayPloy = G.payploy;
    req.iItemCountByGroup = itemCount;
    req.iItemGroup = 1;
    req.iSuperPupleLevel = 0;
    req.iFromType = 5;
    req.sExpand = "";
    req.sToken = getCookie("udb_n");
    req.iTemplateType = 5;
    req.sTokencaKey = "";
    req.sPassport = G.userInfo.sPassport;
    req.iSenderShortSid = 0;
    req.iPayByFreeItem = 0;
    taf.sendWup("liveui", "sendCardPackageItem", req);
}
taf.addListener("sendCardPackageItem", function(data) {
    /*
        0   optional   int      iPayRespCode;           // 支付返回码 see PayRespCode
        1   optional   int      iItemType;              // 道具类型
        2   optional   int      iItemCount;             // 消费数量
        3   optional   string   strPayId ;              // 付费ID
        4   optional   string   strPayConfirmUrl;       // 支付确认URL
        5   optional   string   strSendContent;         // 发送内容
        6   optional   int      iItemCountByGroup;      // 每组数量
        7   optional   int      iItemGroup;             // 组数
        8   optional   long     lPresenterUid;          // 主播uid
        9   optional   string   sExpand;                // 扩展字段
        10  optional   string   strPayItemInfo;         // 扣道具信息 

      enum PayRespCode
      {
        ER_PAYRESPCODE_OK               = 0,     // 扣费成功
        ER_PAYRESPCODE_CONFIRM          = 1,     // 扣费确认
        ER_PAYRESPCODE_FAIL             = 2,     // 扣费失败
        ER_PAYRESPCODE_NOTENOUGHMONEY   = 3,     // Y币不足
        ER_PAYRESPCODE_NOTINLEVEL       = 4,     // 等级不够
        ER_PAYRESPCODE_NOTALLOW         = 5,     // 没到时限
        ER_PAYRESPCODE_CLOSE            = 6,     // 付费道具关闭
        ER_PAYRESPCODE_PAYINFORETURN    = 7,     // 扣道具信息返回
        ER_PAYRESPCODE_INVAILDTYPE      = 8,     // 无效类型信息
        ER_PAYRESPCODE_OVERLIMIT        = 9,     // 数量超出限制
        ER_PAYRESPCODE_UDB              = 10,    // UDB验证失败
        ER_PAYRESPCODE_ANTIBRUSH        = 11,    // 防刷验证失败
        ER_PAYRESPCODE_PARAM            = 12,    // 参数错误
        ER_PAYRESPCODE_NORESOURCE       = 13,    // 没有足够资源(针对免费道具)
        ER_PAYRESPCODE_YBDJ             = 14,    // Y币冻结
        ER_PAYRESPCODE_OVERFREQUENCY    = 15,    // 超出频率限制
      };
  */
    var tokencakey = "";
    switch (data.iPayRespCode) {
        case 0:
            if (tokencakey != "") {
                vplayer.trigger('setUsedClientCAMark', { param: G.yyuid });
            }
            break;
        case 1:
            vplayer.trigger('webgamelivepay', { param: { url: data.strPayConfirmUrl } });
            break;
        case 3: //Y币不足
            var propsItem = getPropsData(data.iItemType);
            var obj = {};
            obj.goldbean = parseInt(propsItem.iPropsGoldenBean) * data.iItemCountByGroup;
            obj.prod_id = data.iItemType;
            obj.count_by_group = data.iItemCountByGroup;
            obj.group = data.iItemGroup;
            obj.imgURL = propsItem.sPropsName;
            obj.nick = G.userInfo.sNick;
            info('J', 'topUpPayment');
            vplayer.trigger('topUpPayment', {
                param: obj,
                jsKey: 'topUpPayment'
            });
            vplayer.closeAllPanel();
            break;
        case 7: //扣道具信息返回

            break;
        default:
            if (data.iPayRespCode != 0) {
                var err = G.PayRspCode[data.iPayRespCode];
                alert.show(err, '提示', 1);
            }
            break;
    }
});

//根据道具ID返回PropsItem
function getPropsData(propsId) {
    var propsDict = window.sessionStorage['propsDict'];
    propsDict = JSON.parse(propsDict)
    var propsItem = propsDict[propsId];
    return propsItem;
}


//设置支付策略
function setPayPloy(value) {
    G.payploy = value;
    log('T', 'setPayPloy', value);
}


//获取用户是否已经领取过首充礼包
function getFirstRechargePkgStatus() {
    if (!G.isLogin) return;
    var req = new HUYA.GetFirstRechargePkgStatusReq();
    req.tId = G.userId;
    taf.sendWup("liveui", "getFirstRechargePkgStatus", req);
}
taf.addListener("getFirstRechargePkgStatus", function(data) {
    // data.iStatus; //0未领取，1已领取
    G.isGetFirstRechargePkg = data.iStatus != 0;
    vplayer.setFirstRechargeVisible(!G.isGetFirstRechargePkg);
});


//====================广播稍息========================

//发言广播
taf.addListener("1003", function(data) {
    //data:NobleSpeakBrst
    var msg = data.sMsg;
    try {
        msg = decodeURIComponent(data.sMsg);
    } catch (e) {
        msg = data.sMsg;
    }
    var isSelf = G.yyuid == data.tSender.lSenderUid;
    if (isSelf) {
        danmu.playDanmu(msg, -1);
    } else {
        danmu.playDanmu(msg);
    }
});

//开播通知
taf.addListener("8000", function(data) {
    //BeginLiveNotice 重新开播
    setTimeout(function() {
        getLivingInfo();
        vplayer.showRecommend(false);
        Event.fireEvent(Event.VIDEO_PLAY);
    }, 5000);
});

//停播通知
taf.addListener("8001", function(data) {
    //EndLiveNotice 主播停播
    setTimeout(function() {
        G.hasVideo = false;
        pause();
        vplayer.showRecommend(true);
        Event.fireEvent(Event.VIDEO_STOP);
    }, 5000);
});

//=====================================================
