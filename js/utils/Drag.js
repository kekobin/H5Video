/**
 * 拖拽类
 * author LaiWeifeng
 * since 2016/3/22
 */
function Drag(target, options) {
    var _x = 0,
        _y = 0,
        _moveDrag, _stopDrag;

    + function() {
        this.target = target; //被拖拽的对象
        var defaultOptions = {
            handle: target, //拖拽区域对象
            limit: true, //锁定范围(使不出浏览器范围)
            lock: false, //锁定位置(禁止拖拽)
            lockX: false, //锁定水平位置
            lockY: false, //锁定垂直位置
            container: document.body, //指定限制容器
            onStart: function() {}, //开始时回调函数
            onMove: function() {}, //拖拽时回调函数
            onStop: function() {} //停止时回调函数
        };
        for (var p in options) defaultOptions[p] = options[p];
        for (var p in defaultOptions) this[p] = defaultOptions[p];
        this.container = document.body; //强制放到整个页面

        _moveDrag = bind(this, moveDrag);
        _stopDrag = bind(this, stopDrag);

        this.handle.style.cursor = "move";
        target.style.top = target.offsetTop + "px";
        target.style.left = target.offsetLeft + "px";
        target.style.position = "fixed"; //这个很重要
        target.style.margin = "0";
        this.container.appendChild(target);
        addHandler(this.handle, "mousedown", bind(this, startDrag));

    }.apply(this, arguments);

    this.toCenter = function() {
        var o = $(vIdDom).offset();
        var w = $(vIdDom).width();
        var h = $(vIdDom).height();
        var tw = $(this.target).width();
        var th = $(this.target).height();
        var top = o.top + (h - 100 - tw) / 2;
        top = Math.max(top, 50);
        $(this.target).css({
            left: o.left + (w - tw) / 2,
            top: top
        });
    };

    function startDrag(event) {
        var event = event || window.event;
        _x = event.clientX - target.offsetLeft;
        _y = event.clientY - target.offsetTop;
        addHandler(document, "mousemove", _moveDrag);
        addHandler(document, "mouseup", _stopDrag);
        event.preventDefault && event.preventDefault();
        this.handle.setCapture && this.handle.setCapture();
        this.onStart && this.onStart();
    }

    function moveDrag(event) {
        var event = event || window.event;
        if (this.lock) return;
        var iTop = event.clientY - _y;
        var iLeft = event.clientX - _x;
        var maxTop = this.container.clientHeight - target.offsetHeight;
        var maxLeft = this.container.clientWidth - target.offsetWidth;
        if (this.limit) {
            iTop = iTop < 0 ? 0 : iTop;
            iTop = iTop > maxTop ? maxTop : iTop;
            iLeft = iLeft < 0 ? 0 : iLeft;
            iLeft = iLeft > maxLeft ? maxLeft : iLeft;
        }
        this.lockY || (target.style.top = iTop + "px");
        this.lockX || (target.style.left = iLeft + "px");
        event.preventDefault && event.preventDefault();
        this.onMove && this.onMove();
    }

    function stopDrag() {
        removeHandler(document, "mousemove", _moveDrag);
        removeHandler(document, "mouseup", _stopDrag);
        this.handle.releaseCapture && this.handle.releaseCapture();
        this.onStop && this.onStop();
    }

    //添加绑定事件
    function addHandler(oElement, sEventType, fnHandler) {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler);
    }
    //删除绑定事件
    function removeHandler(oElement, sEventType, fnHandler) {
        return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler);
    }
    //绑定事件到对象
    function bind(object, fnHandler) {
        return function() {
            return fnHandler.apply(object, arguments);
        }
    }
}
