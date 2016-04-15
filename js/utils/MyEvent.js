/**
 * Created by Administrator on 2015/12/24.
 */
var Event = {
    _listeners: {},
    // 添加
    addEvent: function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }
        return this;
    },
    // 触发
    fireEvent: function(type, parmobj) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                if (typeof arrayEvent[i] == "function") {
                    arrayEvent[i](parmobj);
                }
            }
        }
        return this;
    },
    // 删除
    removeEvent: function(type, fn) {
        var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                // 清除当前type类型事件下对应fn方法
                for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                    if (arrayEvent[i].fn === fn) {
                        this._listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
                delete this._listeners[type];
            }
        }
        return this;
    },
    //WebSocket初始化完毕
    WEBSOCKET_INITED: "WEBSOCKET_INITED",
    //用户信息提取完毕
    USER_INFO_INITED: "USER_INFO_INITED",
    //获取视频信息完毕
    VIDEO_INFO_INITED: "VIDEO_INFO_INITED",
    //开播通知
    VIDEO_PLAY: "VIDEO_PLAY",
    //停播通知
    VIDEO_STOP: "VIDEO_STOP",
    //JS定义初始化完毕
    JS_DEFINITION_INITED: "JS_DEFINITION_INITED",
};
