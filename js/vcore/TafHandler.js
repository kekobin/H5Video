/**
   WebSocket 协议处理器 
 */
function TafHandler() {
    this.connected = false; //是否已连接
    var reConnectTimes = 0;
    var ips = [];
    var url = '';

    var ws;
    initSocket();

    function initSocket() {
        var ipstr = localStorage.wsips;
        if (ipstr) {
            ipstr = decodeURIComponent(ipstr);
            ips = ipstr.split('|');
        }
        connecting();
        // ws = new WebSocket("ws://183.60.218.225:16258");
        //配置host：183.60.218.225 websocket.huya.com
        // ws = new WebSocket("ws://websocket.huya.com:16258");
    }

    function connecting() {
        url = "ws://ws.api.huya.com:80";
        if (ips.length > 0) {
            url = 'ws://' + ips.shift();
        }
        info('S', '%cconnecting ' + url, logcss("#0000E3"));
        ws = new WebSocket(url);
        ws.onopen = onopen;
        ws.onclose = onclose;
        ws.onerror = onerror;
        ws.onmessage = onmessage;
    }

    function send(buffer) {
        ws.send(buffer);
    }

    function onopen() {
        log('S', "=== WebSocket Connected ===");
        reConnectTimes = 0;
        taf.connected = true;
        if (url != 'ws://ws.api.huya.com:80') {
            VerifyCookie();
        }
        taf.dispatch("WEBSOCKET_CONNECTED");
        setInterval(HeartBeat, 60000); //心跳包
    }

    function onclose(evt) {
        taf.connected = false;
        warn('S', "%c=== WebSocket Closed ===", "font-size:120%", evt);
        reConnectTimes++;
        if (reConnectTimes < 10) {
            warn('S', '%c=== WebSocket 重连' + reConnectTimes + '... ===', "font-size:120%")
            setTimeout(connecting, 1000);
        } else {
            warn('S', '%c=== WebSocket重连次数超标 ===', "font-size:120%");
        }
    }

    function onerror(evt) {
        warn('S', "%c=== WebSocket Error ===", "font-size:120%", evt);
    }

    function onmessage(evt) {
        // Blob -> ArrayBuffer
        var fileReader = new FileReader();
        fileReader.onload = function() {
            var arrayBuffer = this.result;

            // var rspUint8Array = new Uint8Array(arrayBuffer);
            // var rspData = { len: arrayBuffer.byteLength, rspData: rspUint8Array.toString() };
            // log('S', "<<<<<<<" + rspData);

            var is = new Taf.JceInputStream(arrayBuffer);
            var rsp = new HUYA.WebSocketCommand();
            rsp.readFrom(is);
            // log('S', "rsp: ", rsp);

            switch (rsp.iCmdType) {
                case HUYA.EWebSocketCommandType.EWSCmd_RegisterRsp:
                    is = new Taf.JceInputStream(rsp.vData.buffer);
                    var registerRsp = new HUYA.WSRegisterRsp();
                    registerRsp.readFrom(is);
                    log('S', "%c<<<<<<< %crspRegister", logcss("#0000E3"), logcss("#D9006C"), registerRsp);
                    taf.dispatch("WSRegisterRsp", registerRsp);
                    break;
                case HUYA.EWebSocketCommandType.EWSCmd_WupRsp:
                    var wup = new Taf.Wup();
                    wup.decode(rsp.vData.buffer);
                    // log('S', "wup:", wup);

                    var wupStruct = TafMx.WupMapping[wup.sFuncName];
                    if (wupStruct) {
                        wupStruct = new wupStruct();
                        var key = wup.newdata.get("tRsp") ? "tRsp" : "tResp";
                        wup.readStruct(key, wupStruct, TafMx.WupMapping[wup.sFuncName]);
                        log('S', "%c<<<<<<< %crspWup:%c " + wup.sFuncName, logcss("#0000E3"), logcss("black"), logcss("#0000E3"), wupStruct);
                        taf.dispatch(wup.sFuncName, wupStruct);
                    } else {
                        taf.dispatch(wup.sFuncName);
                        info('S', "收到未映射的WupRsp，sFuncName=" + wup.sFuncName);
                    }
                    break;

                case HUYA.EWebSocketCommandType.EWSCmdS2C_MsgPushReq:
                    is = new Taf.JceInputStream(rsp.vData.buffer);
                    var pushMess = new HUYA.WSPushMessage();
                    pushMess.readFrom(is);
                    // log('S', pushMess);

                    is = new Taf.JceInputStream(pushMess.sMsg.buffer);
                    var uriStruct = TafMx.UriMapping[pushMess.iUri];

                    if (uriStruct) {
                        uriStruct = new uriStruct();
                        uriStruct.readFrom(is);
                        if (pushMess.iUri != 1003) {
                            log('s', "%c<<<<<<< %crspMsgPush, %ciUri=" + pushMess.iUri, logcss("#0000E3"), logcss("black"), logcss("#8600FF"), uriStruct);
                        }
                        taf.dispatch(pushMess.iUri, uriStruct);
                    } else {
                        info('s', "收到未映射的WSPushMessage，uri=" + pushMess.iUri);
                    }
                    break;
                case HUYA.EWebSocketCommandType.EWSCmdS2C_HeartBeatAck:
                    log('S', "%c<<<<<<< rspHeartBeat: " + new Date().getTime(), logcss("#0000E3"));
                    //保留
                    break;
                case HUYA.EWebSocketCommandType.EWSCmdS2C_VerifyCookieRsp:
                    is = new Taf.JceInputStream(rsp.vData.buffer);
                    var verifyRsp = new HUYA.WSVerifyCookieRsp();
                    verifyRsp.readFrom(is);
                    var isPass = verifyRsp.iValidate == 0;
                    log('S', '%c<<<<<<< %cVerifyCookie', logcss("#0000E3"), logcss("#D9006C"), '校验' + (isPass ? '通过！' : '失败！'), verifyRsp);
                    break;
                default:
                    warn('S', "%c<<<<<<< Not matched CmdType: " + rsp.iCmdType, logcss("#red"));
            }
        };
        fileReader.readAsArrayBuffer(evt.data);
    }

    function logcss(color) {
        return "color:" + color + ";font-weight:900";
    }
    //心跳包
    function HeartBeat() {
        if (!taf.connected) return;
        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmdC2S_HeartBeat;
        var hearBeat = new HUYA.WSHeartBeat();
        hearBeat.iState = 0;

        var os = new Taf.JceOutputStream();
        hearBeat.writeTo(os);
        req.vData = os.getBinBuffer();

        os = new Taf.JceOutputStream();
        req.writeTo(os);
        send(os.getBuffer());
        // log('S', "%c>>>>>>> reqHeartBeat: " + new Date().toLocaleString(), logcss("#009100"), hearBeat);
    }
    //ip连接需要验证cookie
    function VerifyCookie() {
        var yyuid = getCookie("yyuid");
        if (yyuid == '') return;

        var data = new HUYA.WSVerifyCookieReq();
        data.lUid = yyuid;
        data.sUA = '1.0.1';
        data.sCookie = document.cookie;

        var os = new Taf.JceOutputStream();
        data.writeTo(os);

        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmdC2S_VerifyCookieReq;
        req.vData = os.getBinBuffer();

        os = new Taf.JceOutputStream();
        req.writeTo(os);
        send(os.getBuffer());
        log('S', "%c>>>>>>> %cVerifyCookie:", logcss("#009100"), logcss("#D26900"), data);
    }
    //wup请求
    this.sendWup = function(moduleName, funcName, data) {
        var wup = new Taf.Wup();
        wup.setServant(moduleName);
        wup.setFunc(funcName);
        wup.writeStruct("tReq", data);

        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmd_WupReq;
        req.vData = wup.encode();

        var os = new Taf.JceOutputStream();
        req.writeTo(os);
        send(os.getBuffer());
        log('S', "%c>>>>>>> %creqWup: %c" + funcName, logcss("#009100"), logcss("black"), logcss("#009100"), data);
    };
    //Register请求
    this.sendRegister = function(data) {
        var os = new Taf.JceOutputStream();
        data.writeTo(os);

        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmd_RegisterReq;
        req.vData = os.getBinBuffer();

        os = new Taf.JceOutputStream();
        req.writeTo(os);
        send(os.getBuffer());
        log('S', "%c>>>>>>> %creqRegister:", logcss("#009100"), logcss("#D26900"), data);
    }

    var _listeners = {};
    // 添加
    this.addListener = function(type, fn) {
        if (typeof _listeners[type] === "undefined") {
            _listeners[type] = [];
        }
        if (typeof fn === "function") {
            _listeners[type].push(fn);
        }
        return this;
    };
    // 触发
    this.dispatch = function(type, parmobj) {
        var arrayEvent = _listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                if (typeof arrayEvent[i] == "function") {
                    arrayEvent[i](parmobj);
                }
            }
            if (arrayEvent.length == 0) {
                info('S', "收到未处理数据", type, parmobj);
            }
        } else {
            info('S', "收到未处理数据", type, parmobj);
        }
        return this;
    };
    // 删除
    this.removeListener = function(type, fn) {
        var arrayEvent = _listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                    if (arrayEvent[i].fn === fn) {
                        _listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                delete _listeners[type];
            }
        }
        return this;
    };

}

var taf = new TafHandler();
