//竞猜面板
function GuessMain(){
    var _mod = null;
    var _vplayer = null;
    var _this = null;
    var _isShow = false;
    
    var _itemArr = [];
    var _result = null;
    
    var _lastBtn, _nextBtn, _closeBtn, _mineBtn, _helpBtn;
    
    this.initialize = function(mod, vplayer){
        _mod = mod;
        _vplayer = vplayer;
        _this = this;
        initView();
        bindEvent();
    };
    
    this.show = function(){
        if(!_isShow){
            $(".guess-main").show();
        }
        else{
            $(".guess-main").hide();
        }
        _isShow = !_isShow;
    };
    
    this.hide = function(){
        _isShow = false;
        $(".guess-main").hide();
    };
    
    this.isShow = function(){
        return _isShow;
    };
    
    function initView(){
        var tmpl = __inline("../../../tpl/guess/guess-main.tmpl")();
        var parent = $("#player-gift-wrap")[0];
        utils.insertHTML(parent, "beforeEnd", tmpl);
        
        var itemArr = $(".guess-main-frame");
        for(var i = 0;i < itemArr.length;i ++){
            _itemArr.push(new GuessMainItem(_mod, itemArr[i]));
        }
        
        _result = new GuessMainResult();
        _lastBtn = $(".guess-main-arrow-l");
        _nextBtn = $(".guess-main-arrow-r");
        _closeBtn = $(".guess-main-close");
        _mineBtn = $(".guess-main-mine");
        _helpBtn = $(".guess-main-help");
    }
    
    function bindEvent(){
        _closeBtn.click(_this.hide);
        _lastBtn.click(onLast);
        _nextBtn.click(onNext);
        _mineBtn.click(onMine);
        _helpBtn.click(onHelp);
        
        $(window).resize(onResize);
    }
    
    function onLast(){
        _index --;
        if(_index < 0){
            _index = _gameList.length - 1;
        }
        refreshView();
    }
    
    function onNext(){
        _index ++;
        if(_index >= _gameList.length){
            _index = 0;
        }
        refreshView();
    }
    
    function onMine(){
        console.log("onmine");
    }
    
    function onHelp(){
        console.log("onhelp");
    }
    
    function onResize(){
        if(_isShow){
            var w = $(".guess-main").width();
        }
    }
    
    ////数据处理
    var _gameList = null;
    var _index = 0;
    
    function refreshView(){
        $(".game-main-title-pre").text("猜(" + (_index + 1) + "/" + _gameList.length + ")");
        
        var gameVO = _gameList[_index];
        var item, beanVO;
        for(var i = 0;i < gameVO.beanList.length;i ++){
            item = _itemArr[i];
            beanVO = gameVO.beanList[i];
            item.setData(beanVO);
            if(i == 0){
                $(".game-main-title-name").text(beanVO.sGameName);
                setUintName(beanVO.vGameUnitInfo);
            }
        }
    }
    
    function setUintName(list){
        var len = list.length;
        for(var i = 0;i < len;i ++){
            $($(".guess-main-type p")[i]).text(list[i].sGameUnitName);
        }
    }
    
    ////协议返回
    this.backNotice = function(list){
        _gameList = list;
        if(_index >= list.length){
            _index = 0;
        }
        refreshView();
    };
    
    this.backHistory = function(list){
        _result.setData(list);
    }
}
//种豆
function GuessMainItem(mod,item){
    var _mod = mod;
    var _item = item;
    var _openBtn, _beanIcon, _beanTxt;
    var _uintArr = [];
    
    (function(){
        _openBtn = $(_item).find(".guess-main-start");
        _openBtn.click(onOpen);
        _beanIcon = $(_item).find("#guess-main-bean-icon");
        _beanTxt = $(_item).find("#guess-main-bean-txt");
        
        var uintArr = $(_item).find(".guess-main-li");
        var len = uintArr.length;
        for(var i = 0;i < len;i ++){
            _uintArr.push(new GuessMainItemUint(mod,uintArr[i]));
        }
    }());
    
    function onOpen(){
        var panel = _mod.getUI("OPEN");
        panel.show();
    }
    
    this.setData = function(value){
        var itemUint, uintVO;
        var max = getPlanMax(value.vGameUnitInfo);
        for(var i = 0;i < _uintArr.length;i ++){
            uintVO = value.vGameUnitInfo[i];
            itemUint = _uintArr[i];
            itemUint.setData({cur:uintVO.iBetExchangeAmount,max:max,rate:uintVO.iBetOdds},value.iGameStats);
        }
        
        if(value.iGameStats == 1){
            _openBtn.show();
        }
        else{
            _openBtn.hide();
        }
        
        if(value.iBetType == 1){
            _beanIcon.attr("class","silver-icon");
            _beanTxt.text("银豆竞猜");
        }
        else{
            _beanIcon.attr("class","gold-icon");
            _beanTxt.text("金豆竞猜");
        }
    };
    
    function getPlanMax(list){
        var num = 0;
        for(var i = 0;i < list.length;i ++){
            num += list[i].iBetExchangeAmount;
        }
        return num;
    }
}
//种豆单行
function GuessMainItemUint(mod,line){
    var _mod = mod;
    var _process, _rate, _planBtn;
    
    (function(){
        _process = new GuessMainProcess($(line).find(".guess-main-process")[0]);
        _rate = $(line).find(".guess-main-rate");
        _planBtn = $(line).find(".guess-main-plan");
        _planBtn.click(onPlan);
    }());
    
    function onPlan(event){
        _mod.getUI("PLAN").show(event.currentTarget);
    }
    
    this.setData = function(value,status){
        _process.setProcess(value.cur,value.max);
        var rate;
        if(value.rate == 0){
            rate = "无";
        }
        else{
            rate = ("1:" + (value.rate / 10));
        }
        _rate.text(rate);
        
        if(status == 1){
        }
    };
}
//进度条
function GuessMainProcess(ui){
    var _bar, _tf;
    
    (function(){
        _bar = $(ui).find("i")[0];
        _tf = $(ui).find("span")[0];
    }());
    
    this.setProcess = function(cur,max){
        var percent;
        if(cur == 0){
            percent = 0;
        }
        else{
            percent = parseInt(cur / max * 100);
        }
        $(_bar).css("width", percent + "%");
        $(_tf).text(cur + "");
    };
}
//竞猜结果
function GuessMainResult(){
    var _panel = null;
    var _result = null;
    var _list = null;
    
    (function(){
        _panel = $(".guess-main-result");
        _result = _panel.find("li");
    }());
    
    this.setData = function(list){
        _list = list;
        var len = list.length;
        var data, item, text;
        for(var i = 0;i < 3;i ++){
            data = list[i];
            item = _result[i];
            if(data)
            {
                text = "主播开猜" + "“" + data.sTopicName + "” ";
                if(data.iBreakFlag == 1){
                    text += "竞猜中断，豆子全部返还";
                }
                else{
                    text += ("竞猜结果" + "“" + data.sWinnerName + "”获胜");
                }
                item.$history_text = text;
                $(item).text(text);
                $(item).attr("title",text);
                $(item).show();
            }
            else{
                $(item).hide();
            }
        }
    }
}