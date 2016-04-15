/**
    弹幕类
 */
function Danmu() {
    var canvas = null;
    var canvasWidth = 0;
    var canvasHeight = 0;
    var ItemHeight = 30;
    var lastTime = 0;
    var tickHandler = 0;
    var FRAME = 30;
    var alpha = 1;
    var area = 1; //全屏1.0，半屏0.55，上屏0.3

    var waitingList = []; //等待显示的弹幕列表
    var showingList = []; //正在显示的弹幕列表
    var lineList = []; //弹幕行列表
    var danmuLine = 0; //弹幕行数
    var visible = true; //是否显示弹幕

    this.initDanmu = function() {
        canvas = document.getElementById("hy-danmu").getContext("2d");
        canvas.textAlign = 'left';
        canvas.textBaseline = 'top';

        resizeDanmu();
        $(window).resize(resizeDanmu);
        lastTime = new Date().getTime();
        tickHandler = setInterval(loop, FRAME);
    };

    function resizeDanmu() {
        canvasWidth = $("#player-video").width();
        canvasHeight = $("#player-video").height();
        $('#hy-danmu').attr({ "width": canvasWidth, "height": canvasHeight });

        danmuLine = canvasHeight * area / ItemHeight >> 0;
        var tmp = lineList;
        lineList = new Array(danmuLine);
        for (var i = 0, len = tmp.length; i < len; i++) {
            if (i < danmuLine) {
                lineList[i] = tmp[i];
            }
        }
    }

    this.setAlpha = function(v) {
        alpha = parseFloat(v);
        localStorage.danmuAlpha = alpha;
    };

    this.setArea = function(v) {
        area = parseFloat(v);
        resizeDanmu();
        localStorage.danmuArea = area;
    };

    this.setVisible = function(v) {
        v = !!v;
        if (v == visible) return;
        visible = v;

        if (visible) {
            lastTime = new Date().getTime();
            tickHandler = setInterval(loop, FRAME);

        } else {
            waitingList = [];
            showingList = [];
            this.clear();
            lineList = new Array(danmuLine);
            clearInterval(tickHandler);
            tickHandler = 0;
        }
    };

    this.clear = function() {
        canvas.clearRect(0, 0, canvasWidth, canvasHeight);
    };

    this.playDanmu = function(txt, txtcolor) {
        if (!visible) return;
        if (!txtcolor) txtcolor = "#FFFFFF";
        var w = canvas.measureText(txt).width;
        var speed = 4;
        if (w > 300) {
            speed += 1;
        } else if (w > 200) {
            speed += 0.6;
        } else if (w > 100) {
            speed += 0.3;
        }
        waitingList.push({
            txt: txt,
            color: txtcolor,
            dw: w,
            dx: 0,
            speed: speed,
            line: 0
        });
    };

    //浏览器最小化会降帧，要自己补帧
    function loop() {
        var curTime = new Date().getTime();
        var gapTime = curTime - lastTime;
        lastTime = curTime;
        var n = gapTime / FRAME >> 0;
        for (var i = 0; i < n; i++) {
            loopDanmu();
        }
    }

    function loopDanmu() {
        var len = lineList.length;
        for (var i = 0; i < len; i++) {
            if (waitingList.length == 0) {
                break;
            }
            var obj = lineList[i];
            if (!obj || (obj.dx > obj.dw + 100)) {
                var wo = waitingList.shift();
                wo.line = i;
                lineList[i] = wo;
                showingList.push(wo);
            }
        }
        if (visible) {
            canvas.clearRect(0, 0, canvasWidth, canvasHeight);
            canvas.font = '24px Microsoft YaHei';
            canvas.shadowColor = "black";
            canvas.shadowOffsetX = 1;
            canvas.shadowOffsetY = 1;
            canvas.globalAlpha = alpha;
        }
        var p = waitingList.length / 50 >> 0;
        p = Math.min(p, 3);
        len = showingList.length;
        for (var i = len - 1; i >= 0; i--) {
            var so = showingList[i];
            if (so.dx > so.dw + canvasWidth) {
                showingList.splice(i, 1);
            } else {
                so.dx += so.speed + p;
                printText(so);
            }
        }
    }

    function printText(data) {
        if (!visible || !isplaying) return;

        var left = canvasWidth - data.dx;
        var top = data.line * ItemHeight + 30;
        if (data.color == -1) { //自己的弹幕
            canvas.fillStyle = 'white';
            canvas.strokeStyle = 'white';
            canvas.strokeRect(left - 4, top - 22, data.dw + 8, 30);

        } else {
            canvas.fillStyle = data.color;
        }
        canvas.fillText(data.txt, left, top);
    }

}

var danmu = new Danmu();
