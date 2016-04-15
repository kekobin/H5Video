/**
 * html5播放器
 * @param  {object} win window对象
 * @param  {object} $   jQuery对象
 */
(function(win, $) {
    var ISDEBUG = true; //是否debug状态，上线前改为false
    var isOutdoor = false; //是否户外直播，有视频旋转功能(此参数VPlayer构造函数传入，后续补充)
    var vIdDom = '#videoContainer';

    __inline('include.js');

    var alert = null; //Alert不能在此处初始化，DOM会被覆盖

    /**
     * 播放器方法
     */
    function VPlayer(obj) {
        vIdDom = obj.idDom;
        obj.register(this); //注册通道信息接口,register由外部传入

        $(vIdDom).resize(function() {
            $(window).resize();
        });

        var _this = this;
        var container, vcore, ctrl, gift, box, recommend, guess;

        /**
         * 初始化
         */
        + function() {
            addEvents();
            container = document.querySelector(obj.idDom);
            var htmlInnerTmpl = __inline('../tpl/index.tmpl')();
            container.innerHTML = htmlInnerTmpl;

            //播放器核心
            vcore = new VCore();
            vcore.initH5Player({
                target: document.querySelector('#player-video'),
                tid: obj.chTopId,
                sid: obj.subChId,
                appid: obj.vappid,
                context: _this
            });
            _this.vcore = vcore;

            //通用提示框
            alert = new Alert();
            _this.alert = alert;

            //控制条的操作
            ctrl = new Ctrl(_this);
            _this.ctrl = ctrl;

            //礼物栏
            gift = new Gift(_this);
            _this.gift = gift;

            //宝箱 
            box = new Box(_this);
            _this.box = box;

            //竞猜
            guess = new GuessMod(_this);
            _this.guess = guess;
            // $('.guess-icon').remove(); //============TEST===========
        }();

        function addEvents() {
            //拿到视频信息后的处理
            Event.addEvent(Event.VIDEO_INFO_INITED, function(G) {
                ctrl && ctrl.setBtnsVisible(G.hasVideo);
            });
        }

        __inline('vplayerAPI.js');
        Event.fireEvent(Event.JS_DEFINITION_INITED);
    }

    //注入事件机制
    var Events = __inline('utils/Events.js')();
    Events.mixTo(VPlayer);

    win.VPlayer = VPlayer;

})(window, jQuery);
