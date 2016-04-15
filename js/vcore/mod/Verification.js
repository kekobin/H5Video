//二次验证相关

G.isVerify = false;

//请求验证信息，获取风控信息，跟是否记住密码
function isRemClientCAMark() {
    vplayer.trigger('isRemClientCAMark');
}

function isRemClientCAMarkCallback(obj) {
    G.isVerify = true;
    //r_st=false的时候，按以前的验证. r_st=true，如果r_au=false要验证，true就不需要
    JSSCENEDataManager.getInstance().rst = obj.r_st;
    JSSCENEDataManager.getInstance().rau = obj.r_au;
    JSSCENEDataManager.getInstance().isSavePassWord = obj.isLogined && obj.h_cp == "1";
    
}



//获取当天二次验证状态
function getVerificationStatus() {
    if (!G.isLogin) return;
    var req = new HUYA.GetVerificationStatusReq();
    req.tId = G.userId;
    taf.sendWup("liveui", "getVerificationStatus", req);
}
taf.addListener("getVerificationStatus", function(data) {
    // data:GetVerificationStatusResp
    G.verifyStatus = data;
});
