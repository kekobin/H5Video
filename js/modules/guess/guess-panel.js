function GuessPanel(panelName,tmpl){
    var _this = null;
    var _drag = null;
    var _isShow = false;
    
    this.isShow = function(){
        return _isShow;
    }
    
    this.show = function(){
        if(_isShow){
            $(panelName).hide();
        }
        else{
            $(panelName).show();
        }
        _drag.toCenter();
        _isShow = !_isShow;
    };
    
    this.hide = function(){
        _isShow = false;
        $(panelName).hide();
    };
    
    this.initView = function(){
        _this = this;
        var layer = $("#player-wrap")[0];
        utils.insertHTML(layer, "beforeEnd", tmpl);
        
        _drag = new Drag($(panelName)[0], {
            limit: true,
            handle: $(panelName + "-title")[0],
            container: layer
        });
        
        bindEvent();
    }
    
    function bindEvent(){
        $(panelName + "-close").click(_this.hide);
    }
}