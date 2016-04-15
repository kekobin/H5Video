//VPlayer类对外接口
this.addTafListener = addTafListener;
this.removeTafListener = removeTafListener;
this.requestTaf = requestTaf;
this.sendWup = sendWup;
this.container = container;
this.vcore = vcore;
this.ctrl = ctrl;
this.gift = gift;
this.box = box;
this.guess = guess;
this.closeAllPanel = closeAllPanel;
this.popLogin = popLogin;
this.showRecommend = showRecommend;
this.showLoading = showLoading;
this.hideLoading = hideLoading;
this.setBitRateList = setBitRateList;
this.setGiftList = setGiftList;
this.setFirstRechargeVisible = setFirstRechargeVisible;
this.updateBoxList = updateBoxList;
this.finishBoxCd = finishBoxCd;
this.showBoxReward = showBoxReward;
this.getMyInfo = getMyInfo;

Object.defineProperties(this, {
    userId: { //HUYA.UserId
        get: function() {
            return vcore.G.userId;
        }
    }
});

//关闭所有打开的面板
function closeAllPanel() {
    if (box) {
        box.hide();
        gift.closeSetting();
        ctrl.closeFeedback();
    }
}

//弹出登录框
function popLogin() {
    info('J', 'webgamelivelogin');
    this.trigger('webgamelivelogin');
    closeAllPanel();
}

//显示推荐视频列表
function showRecommend(visible) {
    if (visible) {
        if (!recommend) {
            recommend = new Recommend();
        }
        recommend.show();
    } else if (recommend) {
        recommend.hide();
    }
}

function showLoading() {
    $('.player-loading').css('display', 'block');
}

function hideLoading() {
    $('.player-loading').css('display', 'none');
}

//设置多码率
function setBitRateList(obj) {
    ctrl.setBitRateList(obj);
}

//初始化礼物列表
function setGiftList(propsList) {
    gift.setData(propsList);
}

//设置首充礼包按钮是否显示
function setFirstRechargeVisible(visible) {
    visible = !!visible;
    $('#player-punch-btn').css('display', visible ? 'block' : 'none');
}

//更新百宝箱状态
function updateBoxList(data) {
    box.updateBoxList(data);
}

//通知百宝箱CD结束
function finishBoxCd(taskId) {
    box.finishBoxCd(taskId);
}

//百宝箱领取结果
function showBoxReward(obj) {
    box.showBoxReward(obj);
}

//添加Taf协议监听
function addTafListener(type, fn) {
    vcore.addTafListener(type, fn);
}

//移除Taf协议监听
function removeTafListener(type, fn) {
    vcore.removeTafListener(type, fn);
}

//WUP请求接口
function requestTaf(moduleName, funcName, data) {
    vcore.requestTaf(moduleName, funcName, data);
}
//WUP请求接口
function sendWup(moduleName, funcName, data) {
    vcore.sendWup(moduleName, funcName, data);
}

//取用户信息
function getMyInfo() {
    return vcore.G.userInfo;
}
