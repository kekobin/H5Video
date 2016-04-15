function Alert() {

    var panel = null;
    var icon = null;
    var txtMsg = null;

    //��ʼ��
    + function() {
        var defaultArgs = {
            id: 'alert',
            title: '��ʾ',
            mask: true,
            htmlText: ''
        };
        panel = new Panel(defaultArgs);
        icon = $('<i></i>');
        icon.appendTo('#player-panel-alert');
        txtMsg = $('#player-panel-alert .player-panel-content');
    }();

    /**
     * ��ʾ��ʾ��
     * msg ��ʾ����
     * title ���⣬��ѡ��Ĭ��Ϊ����ʾ��
     * type ͼ�����ͣ�1:������ʾ��2:�ɹ���ʾ��3:��Ϣ��ʾ��Ĭ��Ϊ0,����ʾͼ��
     */
    function show(msg, title /*���⣬��ѡ*/ , type /*���ͣ���ѡ*/ ) {
        if (!title) title = '��ʾ';
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
