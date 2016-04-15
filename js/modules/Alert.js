function Alert() {

    var panel = null;
    var icon = null;
    var txtMsg = null;

    //初始化
    + function() {
        var defaultArgs = {
            id: 'alert',
            title: '提示',
            mask: true,
            htmlText: ''
        };
        panel = new Panel(defaultArgs);
        icon = $('<i></i>');
        icon.appendTo('#player-panel-alert');
        txtMsg = $('#player-panel-alert .player-panel-content');
    }();

    /**
     * 显示提示框
     * msg 提示内容
     * title 标题，可选，默认为“提示”
     * type 图标类型，1:错误提示，2:成功提示，3:信息提示，默认为0,不显示图标
     */
    function show(msg, title /*标题，可选*/ , type /*类型，可选*/ ) {
        if (!title) title = '提示';
        $('#player-panel-alert h2').text(title);

        var hasIcon = !!type;
        txtMsg.css({
            left: hasIcon ? '95px' : '75px',
            width: hasIcon ? '180px' : '200px'
        });

        if (type == 1) {
            icon.attr('class', 'alert-icon-err');
        } else if (type == 2) {
            icon.attr('class', 'alert-icon-tip');
        } else if (type == 3) {
            icon.attr('class', 'alert-icon-info');
        }

        txtMsg.html(msg);
        panel.show();
    }

    this.show = show;
    this.hide = panel.hide;
}
