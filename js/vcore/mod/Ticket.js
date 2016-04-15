/*
 * 一次性Ticket请求
 */

function reqTicket(callback) {
    var t = new Ticket();
    t.get(callback);
}

function Ticket() {
    var _callback = null;

    function get(callback) {
        _callback = callback;
        ajaxTicket();
    }
    this.get = get;

    var ticketTimes = 0;
    //请求Ticket(udbToken)
    function ajaxTicket() {
        var sign = md5("5700Ol2lAiO05O8RwRGsK5xbo55bxtykKAFM");
        var data = {
            context: G.yyuid,
            appid: 5700,
            app_sign: sign.substr(0, 8),
            device_id: 'webhuya',
            user: G.userInfo.sPassport,
            ver_str: '1.0.1',
            client_ip: '0',
            token_type: 1, //固定填1
            user_token: getCookie('udb_l')
        };
        console.log('===ajaxTicket===>>>>>', data);
        var url = '';
        if (ISDEBUG) {
            url = 'http://222.73.61.85:8093/ticket/get';
        }
        $.ajax({
            "type": 'GET',
            "dataType": "jsonp",
            "jsonp": "callback",
            // "jsonpCallback": 'aaa',
            "url": url,
            "data": data,
            "error": function(xhr, status, et) {
                error('x', "请求Ticket出错", status, et);
                _callback && _callback('');
            },
            "success": function(data, status) {
                info('x', '===ajaxTicket===<<<<<', data);
                if (data.errcode == 0) {
                    G.userId.sToken = data.ticket;
                    _callback && _callback(data.ticket);

                } else if (data.errcode == 1309900) { //客户端需重试
                    if (++ticketTimes > 5) {
                        error('x', 'Ticket请求超过重试次数！');
                        return;
                    }
                    setTimeout(ajaxTicket, 1000);
                } else {
                    error('x', 'Ticket请求返回错误码！', data);
                    _callback && _callback('');
                }
            }
        });
        // $.getJSON(url + '?callback=?', data, function(jsonData) {
        //     info('x', '=============', jsonData);
        // });
    }
}
