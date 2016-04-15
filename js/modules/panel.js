function Panel(obj) {
    //============对外接口===========
    this.show = show;
    this.hide = hide;
    this.toFront = toFront;

    Object.defineProperties(this, {
        isShow: { //当前是否显示
            get: function() {
                return isShow;
            }
        },
        onShow: {
            set: function(fn) {
                onShow = fn;
            }
        },
        onHide: { //关闭面板回调
            set: function(fn) {
                onHide = fn;
            }
        }
    });

    //===============================

    var mask, panel, close, drag, isShow, onShow, onHide;
    //默认参数
    var defaultArgs = {
        id: '',
        title: '',
        mask: true,
        htmlText: ''
    };

    //初始化
    + function() {
        for (var o in obj) defaultArgs[o] = obj[o];

        var tmpl = __inline('../../tpl/panel.tmpl');
        var container = $(vIdDom)[0];
        utils.insertHTML(container, 'beforeEnd', tmpl({
            data: defaultArgs
        }));

        addEvents();
        toFront();
    }();

    function addEvents() {
        var id = '#player-panel-' + defaultArgs.id;
        mask = document.querySelector('#player-mask-' + defaultArgs.id);
        panel = document.querySelector(id);
        close = document.querySelector(id + ' .player-panel-close');

        $(close).click(hide);
        $(panel).click(toFront);
        if (mask) $(mask).click(utils.stopPropagation);

        //添加拖拽
        var oH2 = panel.getElementsByTagName("h2")[0];
        $(oH2).bind('mousedown', toFront);
        drag = new Drag(panel, {
            handle: oH2,
            container: $(vIdDom)[0]
        });
    }

    function show() {
        isShow = true;
        if (mask) {
            mask.style.display = 'block';
        }
        panel.style.display = 'block';
        drag.toCenter();
        toFront();
        if(onShow) onShow();
    };

    function hide(evt) {
        isShow = false;
        utils.stopPropagation(evt);
        if (mask) {
            mask.style.display = 'none';
        }
        panel.style.display = 'none';
        if (onHide) onHide();
    };

    //切换到最顶层
    function toFront(evt) {
        utils.stopPropagation(evt);
        if (mask) {
            drag.container.appendChild(mask);
        }
        drag.container.appendChild(panel);
    }

}
