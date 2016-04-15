function GiftSetting(vplayer) {

    var panel = null;
    var id = "#player-panel-gift-setting";

    //初始化
    + function() {
        var tmpl = __inline('../../tpl/gift-setting.tmpl')();
        var defaultArgs = {
            id: 'gift-setting',
            title: '设置',
            mask: false,
            htmlText: tmpl
        };
        panel = new Panel(defaultArgs);
        panel.onShow = onShow;
        // panel.onHide = onHide;

        $(id + ' button').click(onSave);
        $(id + ' li').click(onCheck);
        $(id + ' li').each(utils.NoSelect);

        resumSetting();
        updateTip();
    }();

    function resumSetting() {
        var giftsetting = localStorage.giftsetting;
        if (!giftsetting) {
            localStorage.giftsetting = '1111';
        } else {
            var arr = giftsetting.split('');
            var list = $(id + ' li i');
            for (var i = 0, len = list.length; i < len; i++) {
                var checkBtn = list[i];
                checkBtn.style.display = (arr[i] == '0') ? "none" : "block";
            }
        }
    }

    function saveSetting() {
        var giftsetting = '';
        var list = $(id + ' li');
        for (var i = 0, len = list.length; i < len; i++) {
            var liItem = list[i];
            giftsetting += isCheck(liItem) ? '1' : '0';
        }
        localStorage.giftsetting = giftsetting;
    }

    function savePayPloy() {
        var list = $(id + ' li');

        //调换后两位顺序
        var tmp = list[2];
        list[2] = list[3];
        list[3] = tmp;

        var len = list.length;
        var result = '';
        for (var i = len - 1; i >= 0; i--) {
            var item = list[i];
            result += isCheck(item) ? '1' : '0';
        }
        result = parseInt(result, 2);
        vplayer.vcore.setPayPloy(result);
    }

    function onShow() {
        resumSetting();
    }

    function onSave() {
        panel.hide();
        savePayPloy();
        saveSetting();
    }

    function isCheck(liItem) {
        var i = liItem.getElementsByTagName('i')[0];
        var checked = i.style.display != 'none';
        return checked;
    }

    function updateTip() {
        var itemNames = ['免费道具', '银豆', '金豆券', '金豆', 'Y币'];
        var tip = '※ 当前设置的货币使用优先顺序为：<br> &nbsp; ';
        var arr = [];
        var list = $(id + ' li');
        for (var i = 0, len = list.length; i < len; i++) {
            var li = list[i];
            if (isCheck(li) && i < itemNames.length) {
                arr.push(itemNames[i]);
            }
        }
        tip += arr.join(' > ');
        $(id + ' p').html(tip);
    }

    function onCheck(evt) {
        var curTarget = evt.currentTarget;
        var i = curTarget.getElementsByTagName('i')[0];
        i.style.display = isCheck(curTarget) ? "none" : "block";
        updateTip();
    }

    this.show = panel.show;
    this.hide = panel.hide;
}
