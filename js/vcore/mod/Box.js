/*
 * 百宝箱模块
 */

//请求百宝箱状态
function getUserBoxInfo() {
    if (!G.isLogin || !G.hasVideo) return;
    var req = new HUYA.GetUserBoxInfoReq();
    req.tId = G.userId;
    taf.sendWup("huyauserui", "getUserBoxInfo", req);
}
taf.addListener("getUserBoxInfo", function(data) {
    //data:GetUserBoxInfoRsp
    vplayer.updateBoxList(data);
});


//先拿到一次性ticket再finishTaskNotice
function reqFinishTaskNotice(taskId) {
    reqTicket(function(ticket) {
        finishTaskNotice(taskId, ticket);
    });
}
//通知后端百宝箱CD结束, taskId:1~6
function finishTaskNotice(taskId, ticket) {
    G.userId.sToken = ticket;
    var req = new HUYA.FinishTaskNoticeReq();
    req.tId = G.userId;
    req.lSid = G.topsid;
    req.lSubSid = G.subsid;
    req.iTaskId = taskId;
    req.sPassport = G.userInfo.sPassport;
    req.iFromType = 5;
    req.fVersion = 1.1;
    req.sTime = new Date().getTime();
    req.sMd5 = md5(req.tId.lUid + req.lSid + req.lSubSid + req.iTaskId + req.sPassport + req.iFromType + req.fVersion + req.sTime);
    taf.sendWup("huyauserui", "finishTaskNotice", req);
}
taf.addListener("finishTaskNotice", function(data) {
    //data:FinishTaskNoticeRsp
    if (data.iRspCode == 0) { //成功
        vplayer.finishBoxCd(data.iTaskId);
    } else {
        // alert.show(G.BoxErrorCode[data.iRspCode]);
        getUserBoxInfo();
    }
});


//先拿到一次性ticket再awardBoxPrize
function reqAwardBoxPrize(taskId) {
    reqTicket(function(ticket) {
        awardBoxPrize(taskId, ticket);
    });
}
//领取百宝箱
function awardBoxPrize(taskId, ticket) {
    G.userId.sToken = ticket;
    var req = new HUYA.AwardBoxPrizeReq();
    req.tId = G.userId;
    req.lSid = G.topsid;
    req.lSubSid = G.subsid;
    req.iTaskId = taskId;
    req.sPassport = G.userInfo.sPassport;
    req.iFromType = 5;
    req.fVersion = 1.1;
    req.sTime = new Date().getTime();
    req.sMd5 = md5(req.tId.lUid + req.lSid + req.lSubSid + req.iTaskId + req.sPassport + req.iFromType + req.fVersion + req.sTime);
    taf.sendWup("huyauserui", "awardBoxPrize", req);
}
taf.addListener("awardBoxPrize", function(data) {
    //data:AwardBoxPrizeRsp
    if (data.iRspCode == 0) { //成功
        vplayer.showBoxReward(data);
    } else {
        // alert.show(G.BoxErrorCode[data.iRspCode]);
        getUserBoxInfo();
    }
});
