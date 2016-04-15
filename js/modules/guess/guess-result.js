function GuessResult(){
    var _mod = null;
    var _vplayer = null;
    var _this = null;
    var _panel = null;
    
    this.initialize = function(mod, vplayer){
        _mod = mod;
        _vplayer = vplayer;
        _this = this;
        initView();
        bindEvent();
    };
    
    this.show = function(){
        _panel.show();
    };
    
    this.hide = function(){
        _panel.hide();
    };
    
    this.isShow = function(){
        return _panel.isShow();
    }
    
    function initView(){
        var tmpl = __inline("../../../tpl/guess/guess-result.tmpl")();
        _panel = new GuessPanel(".guess-result", tmpl);
        _panel.initView();
    }
    
    function bindEvent(){
        $(".guess-result-bottom span").click(_this.hide);
    }
}