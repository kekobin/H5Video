/**
 * 打印日志增加频道参数
 * 便于调试时屏蔽或只显示某些频道的日志
 * channel频道为单字母字符，大小写均可
 * 未加频道，则默认为A频道，以下为已占用的频道
 * S,s:WebSocket, T:Taf, P:PushMsg, V:VCore, D:Danmu
 * 
 * author: LaiWeifeng
 * since: 2016/3/22
 */
+ function() {
    var channelMap = {};
    var onlyChannel = null;

    //开启指定频道日志
    function channelOn(channel) {
        var isA = channel == 'A';
        channel = getChannel(channel);
        if (!isA && channel == 'A') {
            error('E', '无效频道！');
            return;
        }
        channelMap[channel] = true;
        info('I', channel + '频道已开启');
    }

    //关闭指定频道日志
    function channelOff(channel) {
        var isA = channel == 'A';
        channel = getChannel(channel);
        if (!isA && channel == 'A') {
            error('E', '无效频道！');
            return;
        }
        channelMap[channel] = false;
        info('I', channel + '频道已关闭');
    }

    //只打印指定频道的日志
    function channelOnly(channel) {
        var isA = channel == 'A';
        channel = getChannel(channel);
        if (!isA && channel == 'A') {
            error('E', '无效频道！');
            return;
        }
        onlyChannel = channel;
        console.info('[I]', '只开启频道:[' + channel + ']');
    }

    //关闭only频道
    function stopOnly() {
        console.info('[I]', '关闭only频道:[' + onlyChannel + ']');
        onlyChannel = null;
    }

    function getChannel(firstArg) {
        if (typeof firstArg != 'string') return 'A';
        if (firstArg.length != 1) return 'A';
        var code = firstArg.charCodeAt(0);
        if (code >= 65 && code <= 90) return firstArg;
        if (code >= 97 && code <= 122) return firstArg;
        return 'A';
    }

    function canprint(channel) {
        if (onlyChannel) {
            return onlyChannel == channel;
        }
        if (channel in channelMap) {
            return channelMap[channel];
        } else {
            return true;
        }
    }

    function getContent(args) {
        var arr = []; //传过来的arguments并非数组
        for (var i = 0, len = args.length; i < len; i++) {
            arr.push(args[i]);
        }
        if (arr.length == 0) return arr;
        var channel = getChannel(arr[0]);
        var isOn = canprint(channel);
        if (!isOn) return false;
        if (channel == arr[0]) arr.shift();
        if (arr.length == 0) {
            arr.push('%c[' + channel + ']');
            arr.push("color:black;font-weight:900");
        } else {
            arr[0] = '%c[' + channel + '] %c' + arr[0];
            arr.splice(1, 0, "color:black;font-weight:900", "font-weight:normal");
        }
        return arr;
    }

    function log(channel) {
        var content = getContent(arguments);
        if (content == false) return;
        console.log.apply(console, content);
    }

    function info(channel) {
        var content = getContent(arguments);
        if (content == false) return;
        console.info.apply(console, content);
    }

    function warn(channel) {
        var content = getContent(arguments);
        if (content == false) return;
        console.warn.apply(console, content);
    }

    function error(channel) {
        var content = getContent(arguments);
        if (content == false) return;
        console.error.apply(console, content);
    }

    //暴露接口
    window.log = log;
    window.info = info;
    window.warn = warn;
    window.error = error;
    window.channelOn = channelOn;
    window.channelOff = channelOff;
    window.channelOnly = channelOnly;
    window.stopOnly = stopOnly;

}();
