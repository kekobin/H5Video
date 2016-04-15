//我要开猜
function GuessOpen(){
    var _mod = null;
    var _vplayer = null;
    var _this = null;
    var _panel = null;
    var _rateInput, _moneyInput, _fastInput;
    
    var _dataObj = null;
    var _inputType = -1;
    var _lastRate = "";
    
    this.initialize = function(mod, vplayer){
        _mod = mod;
        _vplayer = vplayer;
        _this = this;
        initView();
        bindEvent();
    };
    
    this.setData = function(value){
        _dataObj = value;
        initData();
    };
    
    this.show = function(){
        this.setData({content:"我人头单双",beanType:1,money:100000});
        _panel.show();
    };
    
    this.hide = function(){
        _panel.hide();
    };
    
    this.isShow = function(){
        return _panel.isShow();
    }
    
    function initView(){
        var tmpl = __inline("../../../tpl/guess/guess-open.tmpl")();
        _panel = new GuessPanel(".guess-open", tmpl);
        _panel.initView();
        
        _fastInput = new GuessOpenFastInput();
        _fastInput.onInput = onInput;
        
        _rateInput = $(".guess-open-input")[0];
        _moneyInput = $(".guess-open-input")[1];
    }
    
    function bindEvent(){
        $(".guess-open-input").focus(onInputFocus);
        $(".guess-open-input").keydown(onKeydown);
        $(".guess-open-input").keyup(onKeyup);
        $(".guess-open-input").bind("drop cut paste", onForbid);
        $(".guess-open-charge").click(onCharge);
        $(".guess-open-confirm").click(onConfirm);
    }
    
    function onCharge(){
        console.log("oncharge");
    }
    
    function onConfirm(){
        var rate = parseFloat(_rateInput.text());
        var money = parseInt(_moneyInput.text());
        
        if(_inputType == 1 && money < 10000){
            console.log("银豆坐庄底金不少于10000，请重新输入！");
            return ;
        }
        else if(_inputType == 2 && money < 2000){
            console.log("金豆坐庄底金不少于2000，请重新输入！");
            return ;
        }
        if(money > _dataObj.money){
            console.log("输入的底金高于你的账户余额值，请重新输入！");
            return ;
        }
        if(rate < 0.1 || rate > 9.9){
            console.log("比率不在0.1到9.9范围内，请重新输入！");
            return ;
        }
    }
    
    function initData(){
        _lastRate = "";
        $($("input[name=resultRadio]")[0]).attr("checked", true);
        $(".guess-open-input").attr("value", "");
        $("#guess-open-content").text(_dataObj.content);
        
        if(_dataObj.beanType == 0){
            $($("input[name=beanRadio]")[0]).attr("disabled", false);
            $($("input[name=beanRadio]")[1]).attr("disabled", true);
            $("#guess-open-bean-own").attr("class", "guess-com-bean-silver1");
        }
        else{
            $($("input[name=beanRadio]")[0]).attr("disabled", true);
            $($("input[name=beanRadio]")[1]).attr("disabled", false);
            $("#guess-open-bean-own").attr("class", "guess-com-bean-gold1");
        }
        $(".guess-open-bean").text(_dataObj.money);
        $($("input[name=beanRadio]")[_dataObj.beanType]).attr("checked", true);
    }
    
    function onForbid(){
        return false;
    }
    
    function onKeydown(e){
        //判断是否为合法输入
        if(e.keyCode != 46 && e.keyCode != 8 && e.keyCode !=37 && e.keyCode != 39){
            return isCanInput(e.keyCode);
        }
    }
    
    function onKeyup(e){
        if(isCanInput(e.keyCode)){
            var text = _input.value;
            if(_inputType == 0){
                if(text.indexOf(".") != -1){
                    if(text.indexOf(".") == 1 && text.lastIndexOf(".") == 1){
                    }
                    else{
                        text = _lastRate;
                    }
                }
                _input.value = text;
                _lastRate = text;
            }
            else{
                text = getInputNum(parseInt(text)) + "";
                _input.value = text;
            }
        }
    }
    
    function isCanInput(keyCode){
        if(_inputType == 0){
            return isRateInput(keyCode);
        }
        else{
            return isNumInput(keyCode);
        }
    }
    
    function isRateInput(keyCode){
        return isNumInput(keyCode) || (keyCode == 110);
    }
    
    function isNumInput(keyCode){
        return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105); 
    }
    
    function onInputFocus(e){
        _input = e.currentTarget;
        _inputType = ($(".guess-open-input")[0] == _input ? 0 : 1);
        _fastInput.setInputType(_inputType);
        _fastInput.show(e.currentTarget);
    }
    
    var _input = null;
    
    function onInput(obj){
        var type = obj.type;
        var text = obj.text;
        var inputType = obj.inputType;
        var oldText = _input.value;
        var newText = "";
        if(type == 0){
            if(inputType == 0){
                newText = text;
            }
            else{
                newText = text.replace("万","0000");
            }
        }
        else{
            if(text == "退格"){
                if(oldText.length > 0){
                    newText = oldText.substring(0,oldText.length - 1);
                }
            }
            else{
                if(inputType == 0){
                    if(text == "·"){
                        if(oldText.length != 0){
                            if(oldText.indexOf(".") == -1){
                                newText = oldText + ".";
                            }
                            else{
                                newText = oldText;
                            }
                        }
                    }
                    else{
                        newText = oldText + text;
                    }
                }
                else{
                    if(text == "万"){
                        if(oldText.length > 0){
                            newText = oldText + "0000";
                        }
                    }
                    else{
                        newText = oldText + text;
                    }
                }
            }
        }
        if(newText.length > _input.maxLength){
            newText = newText.substring(0,_input.maxLength);
        }
        if(inputType == 1){
            newText = getInputNum(parseInt(newText)) + "";
        }
        _input.value = newText;
    }
    
    function getInputNum(input){
        var ownNum = parseInt($(".guess-open-bean").text());
        return Math.min(input, ownNum);
    }
    
}


function GuessOpenFastInput(){
    var _this = null;
    var _panel = $(".guess-open-fast-input");
    var _rateArr = ["0.1","0.5","0.9","1","2","5","9.9"];
    var _moneyArr = ["1万","5万","10万","20万","40万","80万","100万"];
    var _inputType;
    
    (function(){
        changeState("收起小键盘");
    }());
    
    this.setInputType = function(value){
        _inputType = value;
    }
    
    this.show = function(target){
        var $target = $(target);
        var pos = $target.position();
        var parentPos = $target.parent().position();
        var left = pos.left + parentPos.left + $target.width() + 10;
        var top = pos.top + parentPos.top + ($target.height() - _panel.height()) * 0.5;
        _panel.css({left:left, top:top});
        _panel.show();
        
        resetLeft();
        resetRight();
        
        removeEvent();
        bindEvent();
        _this = this;
    };
    
    function resetLeft(){
        var arr = (_inputType == 0 ? _rateArr : _moneyArr);
        var len = arr.length;
        var $num = $(".guess-open-fast-l").find(".guess-open-fast-btn");
        for(var i = 0;i < len;i ++){
            $($num[i]).text(arr[i]);
        }
    }
    
    function resetRight(){
        var numBtn = $(".guess-open-fast-r").find(".guess-open-fast-btn")[9];
        $(numBtn).text(_inputType == 0 ? "·" : "万");
    }
    
    this.hide = function(){
        changeState("收起小键盘");
        removeEvent();
        _panel.hide();
    };
    
    this.onInput = null;
    
    function bindEvent(){
        $(".guess-open-fast-close").click(onClose);
        $(".guess-open-fast-l").find(".guess-open-fast-btn").click(onNumClickL);
        $(".guess-open-fast-r").find(".guess-open-fast-btn").click(onNumClickR);
        $(".guess-open-fast-ctrl").click(onCtrl);
        $(document).click(onDomClick);
    }
    
    function removeEvent(){
        $(".guess-open-fast-close").unbind("click", onClose);
        $(".guess-open-fast-btn").unbind("click", onNumClick);
        $(".guess-open-fast-l").find(".guess-open-fast-btn").unbind("click",onNumClickL);
        $(".guess-open-fast-r").find(".guess-open-fast-btn").unbind("click",onNumClickR);
        $(".guess-open-fast-ctrl").unbind("click", onCtrl);
        $(document).unbind("click", onDomClick);
    }
    
    function onCtrl(e){
        var $ctrl = $(e.currentTarget);
        changeState($ctrl.text());
    }
    
    function changeState(value){
        var $ctrl = $(".guess-open-fast-ctrl");
        var $r = $(".guess-open-fast-r");
        var $top = $(".guess-open-fast-input");
        if(value == "展开小键盘"){
            $r.show();
            $top.width(291);
            $ctrl.text("收起小键盘");
        }
        else{
            $r.hide();
            $top.width(145);
            $ctrl.text("展开小键盘");
        }
    }
    
    function onClose(){
        _this.hide();
    }
    
    function onNumClickL(e){
        onNumClick(0,e.currentTarget);
    }
    
    function onNumClickR(e){
        onNumClick(1,e.currentTarget);
    }
    
    function onNumClick(type,target){
        var obj = {};
        obj.type = type;
        obj.text = $(target).text();
        obj.inputType = _inputType;
        _this.onInput(obj);
    }
    
    function onDomClick(e){
        var obj = $(e.target);
        var cName = obj.attr("class");
        if(cName == "guess-open-input" || cName.indexOf("guess-open-fast") != -1){
            
        }
        else{
            onClose();
        }
    }
}