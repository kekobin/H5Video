function GuessPlan(){
    var _mod = null;
    var _vplayer = null;
    var _this = null;
    
    var _isShow = false;
    
    this.initialize = function(mod, vplayer){
        _mod = mod;
        _vplayer = vplayer;
        _this = this;
        initView();
        bindEvent();
    };
    
    this.show = function(target){
        _isShow = true;
        $(".guess-plan").show();
        var plan = $(".guess-plan");
        var ele = $(target);
        var pos = ele.offset();
        var left = pos.left + ele.width() + "px";
        var top = pos.top + (ele.height() - plan.height()) * 0.5 + "px";
        plan[0].style.left = left;
        plan[0].style.top = top;
    };
    
    this.hide = function(){
        _isShow = false;
        $(".guess-plan").hide();
    };
    
    this.isShow = function(){
        return _isShow;
    }
    
    function initView(){
        var layer = $(".guess-main")[0];
        var tmpl = __inline("../../../tpl/guess/guess-plan.tmpl")();
        utils.insertHTML(layer, "beforeEnd", tmpl);
    }
    
    function bindEvent(){
        $(".guess-plan-close").click(_this.hide);
    }
}