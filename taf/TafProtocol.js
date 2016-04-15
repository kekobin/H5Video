//This file depends on Taf.min.js

var HUYA = HUYA || {};
HUYA.EWebSocketCommandType = 
{
    EWSCmd_NULL : 0,
    EWSCmd_RegisterReq : 1,
    EWSCmd_RegisterRsp : 2,
    EWSCmd_WupReq : 3,
    EWSCmd_WupRsp : 4,
    EWSCmdC2S_HeartBeat : 5,
    EWSCmdS2C_HeartBeatAck : 6,
    EWSCmdS2C_MsgPushReq : 7,
    EWSCmdC2S_DeregisterReq : 8,
    EWSCmdS2C_DeRegisterRsp : 9,
    EWSCmdC2S_VerifyCookieReq : 10,
    EWSCmdS2C_VerifyCookieRsp : 11
};
HUYA.ELiveSource = 
{
    PC_YY : 0,
    PC_HUYA : 1,
    MOBILE_HUYA : 2,
    WEB_HUYA : 3
};
HUYA.EGender = 
{
    MALE : 0,
    FEMALE : 1
};
HUYA.EClientTemplateType = {
    TPL_PC: 64,
    TPL_WEB: 32,
    TPL_JIEDAI: 16,
    TPL_TEXAS: 8,
    TPL_MATCH: 4,
    TPL_HUYAAPP: 2,
    TPL_MIRROR: 1
};
HUYA.WebSocketCommand = function()
{
    this.iCmdType = 0;
    this.vData = new Taf.BinBuffer();
};
HUYA.WebSocketCommand.prototype._clone = function () { return new HUYA.WebSocketCommand(); }
HUYA.WebSocketCommand.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WebSocketCommand.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WebSocketCommand.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iCmdType);
    os.writeBytes(1, this.vData);
};

HUYA.WebSocketCommand.prototype.readFrom = function (is)
{
    this.iCmdType= is.readInt32(0, false, this.iCmdType);
    this.vData= is.readBytes(1, false, this.vData);
};
HUYA.WSRegisterRsp = function()
{
    this.iResCode = 0;
    this.lRequestId = 0;
    this.sMessage = "";
};
HUYA.WSRegisterRsp.prototype._clone = function () { return new HUYA.WSRegisterRsp(); }
HUYA.WSRegisterRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSRegisterRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSRegisterRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iResCode);
    os.writeInt64(1, this.lRequestId);
    os.writeString(2, this.sMessage);
};

HUYA.WSRegisterRsp.prototype.readFrom = function (is)
{
    this.iResCode= is.readInt32(0, false, this.iResCode);
    this.lRequestId= is.readInt64(1, false, this.lRequestId);
    this.sMessage= is.readString(2, false, this.sMessage);
};
HUYA.WSPushMessage = function()
{
    this.ePushType = 0;
    this.iUri = 0;
    this.sMsg = new Taf.BinBuffer();
    this.iProtocolType = 0;
};
HUYA.WSPushMessage.prototype._clone = function () { return new HUYA.WSPushMessage(); }
HUYA.WSPushMessage.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSPushMessage.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSPushMessage.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.ePushType);
    os.writeInt64(1, this.iUri);
    os.writeBytes(2, this.sMsg);
    os.writeInt32(3, this.iProtocolType);
};

HUYA.WSPushMessage.prototype.readFrom = function (is)
{
    this.ePushType= is.readInt32(0, false, this.ePushType);
    this.iUri= is.readInt64(1, false, this.iUri);
    this.sMsg= is.readBytes(2, false, this.sMsg);
    this.iProtocolType= is.readInt32(3, false, this.iProtocolType);
};
HUYA.WSHeartBeat = function()
{
    this.iState = 0;
};
HUYA.WSHeartBeat.prototype._clone = function () { return new HUYA.WSHeartBeat(); }
HUYA.WSHeartBeat.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSHeartBeat.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSHeartBeat.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iState);
};

HUYA.WSHeartBeat.prototype.readFrom = function (is)
{
    this.iState= is.readInt32(0, false, this.iState);
};
HUYA.WSUserInfo = function()
{
    this.lUid = 0;
    this.bAnonymous = true;
    this.sGuid = "";
    this.sToken = "";
    this.lTid = 0;
    this.lSid = 0;
    this.lGroupId = 0;
    this.lGroupType = 0;
};
HUYA.WSUserInfo.prototype._clone = function () { return new HUYA.WSUserInfo(); }
HUYA.WSUserInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSUserInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSUserInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeBoolean(1, this.bAnonymous);
    os.writeString(2, this.sGuid);
    os.writeString(3, this.sToken);
    os.writeInt64(4, this.lTid);
    os.writeInt64(5, this.lSid);
    os.writeInt64(6, this.lGroupId);
    os.writeInt64(7, this.lGroupType);
};

HUYA.WSUserInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.bAnonymous= is.readBoolean(1, false, this.bAnonymous);
    this.sGuid= is.readString(2, false, this.sGuid);
    this.sToken= is.readString(3, false, this.sToken);
    this.lTid= is.readInt64(4, false, this.lTid);
    this.lSid= is.readInt64(5, false, this.lSid);
    this.lGroupId= is.readInt64(6, false, this.lGroupId);
    this.lGroupType= is.readInt64(7, false, this.lGroupType);
};
HUYA.WSVerifyCookieReq = function()
{
    this.lUid = 0;
    this.sUA = "";
    this.sCookie = "";
};
HUYA.WSVerifyCookieReq.prototype._clone = function () { return new HUYA.WSVerifyCookieReq(); }
HUYA.WSVerifyCookieReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSVerifyCookieReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSVerifyCookieReq.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sUA);
    os.writeString(2, this.sCookie);
};

HUYA.WSVerifyCookieReq.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sUA= is.readString(1, false, this.sUA);
    this.sCookie= is.readString(2, false, this.sCookie);
};
HUYA.WSVerifyCookieRsp = function()
{
    this.iValidate = 0;
};
HUYA.WSVerifyCookieRsp.prototype._clone = function () { return new HUYA.WSVerifyCookieRsp(); }
HUYA.WSVerifyCookieRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSVerifyCookieRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSVerifyCookieRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iValidate);
};

HUYA.WSVerifyCookieRsp.prototype.readFrom = function (is)
{
    this.iValidate= is.readInt32(0, false, this.iValidate);
};
HUYA.UserId = function()
{
    this.lUid = 0;
    this.sGuid = "";
    this.sToken = "";
    this.sHuYaUA = "";
    this.sCookie = "";
};
HUYA.UserId.prototype._clone = function () { return new HUYA.UserId(); }
HUYA.UserId.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.UserId.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.UserId.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sGuid);
    os.writeString(2, this.sToken);
    os.writeString(3, this.sHuYaUA);
    os.writeString(4, this.sCookie);
};

HUYA.UserId.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sGuid= is.readString(1, false, this.sGuid);
    this.sToken= is.readString(2, false, this.sToken);
    this.sHuYaUA= is.readString(3, false, this.sHuYaUA);
    this.sCookie= is.readString(4, false, this.sCookie);
};
HUYA.VipListReq = function()
{
    this.tUserId = new HUYA.UserId();
    this.lTid = 0;
    this.lSid = 0;
    this.iStart = 0;
    this.iCount = 0;
};
HUYA.VipListReq.prototype._clone = function () { return new HUYA.VipListReq(); }
HUYA.VipListReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.VipListReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.VipListReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
    os.writeInt64(1, this.lTid);
    os.writeInt64(2, this.lSid);
    os.writeInt32(3, this.iStart);
    os.writeInt32(4, this.iCount);
};

HUYA.VipListReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
    this.lTid= is.readInt64(1, false, this.lTid);
    this.lSid= is.readInt64(2, false, this.lSid);
    this.iStart= is.readInt32(3, false, this.iStart);
    this.iCount= is.readInt32(4, false, this.iCount);
};
HUYA.VipBarListRsp = function()
{
    this.iStart = 0;
    this.iCount = 0;
    this.iTotal = 0;
    this.vVipBarItem = new Taf.Vector(new HUYA.VipBarItem());
    this.sBadgeName = "";
    this.iChangedHighestRank = 0;
};
HUYA.VipBarListRsp.prototype._clone = function () { return new HUYA.VipBarListRsp(); }
HUYA.VipBarListRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.VipBarListRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.VipBarListRsp.prototype.writeTo = function (os)
{
    os.writeInt32(1, this.iStart);
    os.writeInt32(2, this.iCount);
    os.writeInt32(3, this.iTotal);
    os.writeVector(4, this.vVipBarItem);
    os.writeString(5, this.sBadgeName);
    os.writeInt32(6, this.iChangedHighestRank);
};

HUYA.VipBarListRsp.prototype.readFrom = function (is)
{
    this.iStart= is.readInt32(1, false, this.iStart);
    this.iCount= is.readInt32(2, false, this.iCount);
    this.iTotal= is.readInt32(3, false, this.iTotal);
    this.vVipBarItem= is.readVector(4, false, this.vVipBarItem);
    this.sBadgeName= is.readString(5, false, this.sBadgeName);
    this.iChangedHighestRank= is.readInt32(6, false, this.iChangedHighestRank);
};
HUYA.VipBarItem = function()
{
    this.lUid = 0;
    this.iTypes = 0;
    this.tNobleInfo = new HUYA.NobleInfo();
    this.tGuardInfo = new HUYA.GuardInfo();
    this.tFansInfo = new HUYA.FansInfo();
    this.sNickName = "";
    this.iSuperPupleLevel = 0;
    this.iPotentialTypes = 0;
};
HUYA.VipBarItem.prototype._clone = function () { return new HUYA.VipBarItem(); }
HUYA.VipBarItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.VipBarItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.VipBarItem.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeInt32(1, this.iTypes);
    os.writeStruct(2, this.tNobleInfo);
    os.writeStruct(3, this.tGuardInfo);
    os.writeStruct(4, this.tFansInfo);
    os.writeString(5, this.sNickName);
    os.writeInt32(6, this.iSuperPupleLevel);
    os.writeInt32(7, this.iPotentialTypes);
};

HUYA.VipBarItem.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.iTypes= is.readInt32(1, false, this.iTypes);
    this.tNobleInfo= is.readStruct(2, false, this.tNobleInfo);
    this.tGuardInfo= is.readStruct(3, false, this.tGuardInfo);
    this.tFansInfo= is.readStruct(4, false, this.tFansInfo);
    this.sNickName= is.readString(5, false, this.sNickName);
    this.iSuperPupleLevel= is.readInt32(6, false, this.iSuperPupleLevel);
    this.iPotentialTypes= is.readInt32(7, false, this.iPotentialTypes);
};
HUYA.WeekRankItem = function()
{
    this.lUid = 0;
    this.sNickName = "";
    this.iScore = 0;
    this.iGuardLevel = 0;
    this.iNobleLevel = 0;
};
HUYA.WeekRankItem.prototype._clone = function () { return new HUYA.WeekRankItem(); }
HUYA.WeekRankItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WeekRankItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WeekRankItem.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sNickName);
    os.writeInt32(2, this.iScore);
    os.writeInt32(3, this.iGuardLevel);
    os.writeInt32(4, this.iNobleLevel);
};

HUYA.WeekRankItem.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sNickName= is.readString(1, false, this.sNickName);
    this.iScore= is.readInt32(2, false, this.iScore);
    this.iGuardLevel= is.readInt32(3, false, this.iGuardLevel);
    this.iNobleLevel= is.readInt32(4, false, this.iNobleLevel);
};
HUYA.WeekRankListReq = function()
{
    this.tUserId = new HUYA.UserId();
    this.lTid = 0;
    this.lSid = 0;
};
HUYA.WeekRankListReq.prototype._clone = function () { return new HUYA.WeekRankListReq(); }
HUYA.WeekRankListReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WeekRankListReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WeekRankListReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
    os.writeInt64(1, this.lTid);
    os.writeInt64(2, this.lSid);
};

HUYA.WeekRankListReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
    this.lTid= is.readInt64(1, false, this.lTid);
    this.lSid= is.readInt64(2, false, this.lSid);
};
HUYA.WeekRankListRsp = function()
{
    this.vWeekRankItem = new Taf.Vector(new HUYA.WeekRankItem());
    this.iStart = 0;
    this.iCount = 0;
    this.iTotal = 0;
};
HUYA.WeekRankListRsp.prototype._clone = function () { return new HUYA.WeekRankListRsp(); }
HUYA.WeekRankListRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WeekRankListRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WeekRankListRsp.prototype.writeTo = function (os)
{
    os.writeVector(0, this.vWeekRankItem);
    os.writeInt32(1, this.iStart);
    os.writeInt32(2, this.iCount);
    os.writeInt32(3, this.iTotal);
};

HUYA.WeekRankListRsp.prototype.readFrom = function (is)
{
    this.vWeekRankItem= is.readVector(0, false, this.vWeekRankItem);
    this.iStart= is.readInt32(1, false, this.iStart);
    this.iCount= is.readInt32(2, false, this.iCount);
    this.iTotal= is.readInt32(3, false, this.iTotal);
};
HUYA.WeekRankEnterBanner = function()
{
    this.lUid = 0;
    this.sNickName = "";
    this.iRank = 0;
    this.lPid = 0;
};
HUYA.WeekRankEnterBanner.prototype._clone = function () { return new HUYA.WeekRankEnterBanner(); }
HUYA.WeekRankEnterBanner.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WeekRankEnterBanner.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WeekRankEnterBanner.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sNickName);
    os.writeInt32(2, this.iRank);
    os.writeInt64(3, this.lPid);
};

HUYA.WeekRankEnterBanner.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sNickName= is.readString(1, false, this.sNickName);
    this.iRank= is.readInt32(2, false, this.iRank);
    this.lPid= is.readInt64(3, false, this.lPid);
};
HUYA.LiveListRsp = function()
{
    this.vGameLiveInfos = new Taf.Vector(new HUYA.GameLiveInfo());
    this.lNextBeginId = 0;
};
HUYA.LiveListRsp.prototype._clone = function () { return new HUYA.LiveListRsp(); }
HUYA.LiveListRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveListRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveListRsp.prototype.writeTo = function (os)
{
    os.writeVector(0, this.vGameLiveInfos);
    os.writeInt64(1, this.lNextBeginId);
};

HUYA.LiveListRsp.prototype.readFrom = function (is)
{
    this.vGameLiveInfos= is.readVector(0, false, this.vGameLiveInfos);
    this.lNextBeginId= is.readInt64(1, false, this.lNextBeginId);
};
HUYA.UserChannelReq = function()
{
    this.tId = new HUYA.UserId();
    this.lTopcid = 0;
    this.lSubcid = 0;
    this.sSendContent = "";
};
HUYA.UserChannelReq.prototype._clone = function () { return new HUYA.UserChannelReq(); }
HUYA.UserChannelReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.UserChannelReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.UserChannelReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeInt64(1, this.lTopcid);
    os.writeInt64(2, this.lSubcid);
    os.writeString(3, this.sSendContent);
};

HUYA.UserChannelReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.lTopcid= is.readInt64(1, false, this.lTopcid);
    this.lSubcid= is.readInt64(2, false, this.lSubcid);
    this.sSendContent= is.readString(3, false, this.sSendContent);
};
HUYA.BadgeReq = function()
{
    this.tUserId = new HUYA.UserId();
    this.lBadgeId = 0;
};
HUYA.BadgeReq.prototype._clone = function () { return new HUYA.BadgeReq(); }
HUYA.BadgeReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BadgeReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BadgeReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
    os.writeInt64(1, this.lBadgeId);
};

HUYA.BadgeReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
    this.lBadgeId= is.readInt64(1, false, this.lBadgeId);
};
HUYA.BadgeInfo = function()
{
    this.lUid = 0;
    this.lBadgeId = 0;
    this.sPresenterNickName = "";
    this.sBadgeName = "";
    this.iBadgeLevel = 0;
    this.iRank = 0;
    this.iScore = 0;
    this.iNextScore = 0;
    this.iQuotaUsed = 0;
    this.iQuota = 0;
    this.lQuotaTS = 0;
};
HUYA.BadgeInfo.prototype._clone = function () { return new HUYA.BadgeInfo(); }
HUYA.BadgeInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BadgeInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BadgeInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeInt64(1, this.lBadgeId);
    os.writeString(2, this.sPresenterNickName);
    os.writeString(3, this.sBadgeName);
    os.writeInt32(4, this.iBadgeLevel);
    os.writeInt32(5, this.iRank);
    os.writeInt32(6, this.iScore);
    os.writeInt32(7, this.iNextScore);
    os.writeInt32(8, this.iQuotaUsed);
    os.writeInt32(9, this.iQuota);
    os.writeInt64(10, this.lQuotaTS);
};

HUYA.BadgeInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.lBadgeId= is.readInt64(1, false, this.lBadgeId);
    this.sPresenterNickName= is.readString(2, false, this.sPresenterNickName);
    this.sBadgeName= is.readString(3, false, this.sBadgeName);
    this.iBadgeLevel= is.readInt32(4, false, this.iBadgeLevel);
    this.iRank= is.readInt32(5, false, this.iRank);
    this.iScore= is.readInt32(6, false, this.iScore);
    this.iNextScore= is.readInt32(7, false, this.iNextScore);
    this.iQuotaUsed= is.readInt32(8, false, this.iQuotaUsed);
    this.iQuota= is.readInt32(9, false, this.iQuota);
    this.lQuotaTS= is.readInt64(10, false, this.lQuotaTS);
};
HUYA.BadgeScoreChanged = function()
{
    this.iScoreChanged = 0;
    this.iBadgeLevelChanged = 0;
    this.iOverBadgeCountLimit = 0;
    this.tBadgeInfo = new HUYA.BadgeInfo();
};
HUYA.BadgeScoreChanged.prototype._clone = function () { return new HUYA.BadgeScoreChanged(); }
HUYA.BadgeScoreChanged.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BadgeScoreChanged.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BadgeScoreChanged.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iScoreChanged);
    os.writeInt32(1, this.iBadgeLevelChanged);
    os.writeInt32(2, this.iOverBadgeCountLimit);
    os.writeStruct(3, this.tBadgeInfo);
};

HUYA.BadgeScoreChanged.prototype.readFrom = function (is)
{
    this.iScoreChanged= is.readInt32(0, false, this.iScoreChanged);
    this.iBadgeLevelChanged= is.readInt32(1, false, this.iBadgeLevelChanged);
    this.iOverBadgeCountLimit= is.readInt32(2, false, this.iOverBadgeCountLimit);
    this.tBadgeInfo= is.readStruct(3, false, this.tBadgeInfo);
};
HUYA.FansTips = function()
{
    this.iType = 0;
    this.tBadgeInfo = new HUYA.BadgeInfo();
};
HUYA.FansTips.prototype._clone = function () { return new HUYA.FansTips(); }
HUYA.FansTips.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FansTips.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FansTips.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iType);
    os.writeStruct(1, this.tBadgeInfo);
};

HUYA.FansTips.prototype.readFrom = function (is)
{
    this.iType= is.readInt32(0, false, this.iType);
    this.tBadgeInfo= is.readStruct(1, false, this.tBadgeInfo);
};
HUYA.FansInfoNotice = function()
{
    this.iFansLevel = 0;
    this.iGreenPopUpCount = 0;
    this.tTips = new HUYA.FansTips();
};
HUYA.FansInfoNotice.prototype._clone = function () { return new HUYA.FansInfoNotice(); }
HUYA.FansInfoNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FansInfoNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FansInfoNotice.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iFansLevel);
    os.writeInt32(1, this.iGreenPopUpCount);
    os.writeStruct(2, this.tTips);
};

HUYA.FansInfoNotice.prototype.readFrom = function (is)
{
    this.iFansLevel= is.readInt32(0, false, this.iFansLevel);
    this.iGreenPopUpCount= is.readInt32(1, false, this.iGreenPopUpCount);
    this.tTips= is.readStruct(2, false, this.tTips);
};
HUYA.BadgeInfoListReq = function()
{
    this.tUserId = new HUYA.UserId();
};
HUYA.BadgeInfoListReq.prototype._clone = function () { return new HUYA.BadgeInfoListReq(); }
HUYA.BadgeInfoListReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BadgeInfoListReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BadgeInfoListReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
};

HUYA.BadgeInfoListReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
};
HUYA.BadgeInfoListRsp = function()
{
    this.vBadgeInfo = new Taf.Vector(new HUYA.BadgeInfo());
    this.lUsingBadgeId = 0;
};
HUYA.BadgeInfoListRsp.prototype._clone = function () { return new HUYA.BadgeInfoListRsp(); }
HUYA.BadgeInfoListRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BadgeInfoListRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BadgeInfoListRsp.prototype.writeTo = function (os)
{
    os.writeVector(0, this.vBadgeInfo);
    os.writeInt64(1, this.lUsingBadgeId);
};

HUYA.BadgeInfoListRsp.prototype.readFrom = function (is)
{
    this.vBadgeInfo= is.readVector(0, false, this.vBadgeInfo);
    this.lUsingBadgeId= is.readInt64(1, false, this.lUsingBadgeId);
};
HUYA.EnterPushInfo = function()
{
    this.tNobleInfo = new HUYA.NobleInfo();
};
HUYA.EnterPushInfo.prototype._clone = function () { return new HUYA.EnterPushInfo(); }
HUYA.EnterPushInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.EnterPushInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.EnterPushInfo.prototype.writeTo = function (os)
{
    os.writeStruct(1, this.tNobleInfo);
};

HUYA.EnterPushInfo.prototype.readFrom = function (is)
{
    this.tNobleInfo= is.readStruct(1, false, this.tNobleInfo);
};
HUYA.GameAdvertisement = function()
{
    this.sGameUrl = "";
    this.sPCLogoUrl = "";
    this.iPCLogoHeight = 0;
    this.sGameAdName = "";
    this.iStatus = 0;
    this.sWebLogoUrl = "";
};
HUYA.GameAdvertisement.prototype._clone = function () { return new HUYA.GameAdvertisement(); }
HUYA.GameAdvertisement.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GameAdvertisement.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GameAdvertisement.prototype.writeTo = function (os)
{
    os.writeString(0, this.sGameUrl);
    os.writeString(1, this.sPCLogoUrl);
    os.writeInt32(2, this.iPCLogoHeight);
    os.writeString(3, this.sGameAdName);
    os.writeInt32(4, this.iStatus);
    os.writeString(5, this.sWebLogoUrl);
};

HUYA.GameAdvertisement.prototype.readFrom = function (is)
{
    this.sGameUrl= is.readString(0, false, this.sGameUrl);
    this.sPCLogoUrl= is.readString(1, false, this.sPCLogoUrl);
    this.iPCLogoHeight= is.readInt32(2, false, this.iPCLogoHeight);
    this.sGameAdName= is.readString(3, false, this.sGameAdName);
    this.iStatus= is.readInt32(4, false, this.iStatus);
    this.sWebLogoUrl= is.readString(5, false, this.sWebLogoUrl);
};
HUYA.AdvanceUserEnterNotice = function()
{
    this.lUid = 0;
    this.sNickName = "";
    this.iWeekRank = 0;
    this.iGuardLevel = 0;
};
HUYA.AdvanceUserEnterNotice.prototype._clone = function () { return new HUYA.AdvanceUserEnterNotice(); }
HUYA.AdvanceUserEnterNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.AdvanceUserEnterNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.AdvanceUserEnterNotice.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sNickName);
    os.writeInt32(2, this.iWeekRank);
    os.writeInt32(3, this.iGuardLevel);
};

HUYA.AdvanceUserEnterNotice.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sNickName= is.readString(1, false, this.sNickName);
    this.iWeekRank= is.readInt32(2, false, this.iWeekRank);
    this.iGuardLevel= is.readInt32(3, false, this.iGuardLevel);
};
HUYA.FansRankListRsp = function()
{
    this.lBadgeId = 0;
    this.sBadgeName = "";
    this.vFansRankItem = new Taf.Vector(new HUYA.FansRankItem());
};
HUYA.FansRankListRsp.prototype._clone = function () { return new HUYA.FansRankListRsp(); }
HUYA.FansRankListRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FansRankListRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FansRankListRsp.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lBadgeId);
    os.writeString(1, this.sBadgeName);
    os.writeVector(2, this.vFansRankItem);
};

HUYA.FansRankListRsp.prototype.readFrom = function (is)
{
    this.lBadgeId= is.readInt64(0, false, this.lBadgeId);
    this.sBadgeName= is.readString(1, false, this.sBadgeName);
    this.vFansRankItem= is.readVector(2, false, this.vFansRankItem);
};
HUYA.UserGiftNotice = function()
{
    this.tFansGiftInfo = new HUYA.GiftInfo();
    this.tSuperPupleGiftInfo = new HUYA.GiftInfo();
};
HUYA.UserGiftNotice.prototype._clone = function () { return new HUYA.UserGiftNotice(); }
HUYA.UserGiftNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.UserGiftNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.UserGiftNotice.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tFansGiftInfo);
    os.writeStruct(1, this.tSuperPupleGiftInfo);
};

HUYA.UserGiftNotice.prototype.readFrom = function (is)
{
    this.tFansGiftInfo= is.readStruct(0, false, this.tFansGiftInfo);
    this.tSuperPupleGiftInfo= is.readStruct(1, false, this.tSuperPupleGiftInfo);
};
HUYA.GrandCeremonyChampionPresenter = function()
{
    this.lUid = 0;
    this.sNick = "";
};
HUYA.GrandCeremonyChampionPresenter.prototype._clone = function () { return new HUYA.GrandCeremonyChampionPresenter(); }
HUYA.GrandCeremonyChampionPresenter.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GrandCeremonyChampionPresenter.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GrandCeremonyChampionPresenter.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sNick);
};

HUYA.GrandCeremonyChampionPresenter.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sNick= is.readString(1, false, this.sNick);
};
HUYA.FansRankItem = function()
{
    this.lUid = 0;
    this.sNickName = "";
    this.iScore = 0;
    this.iLevel = 0;
};
HUYA.FansRankItem.prototype._clone = function () { return new HUYA.FansRankItem(); }
HUYA.FansRankItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FansRankItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FansRankItem.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sNickName);
    os.writeInt32(2, this.iScore);
    os.writeInt32(3, this.iLevel);
};

HUYA.FansRankItem.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sNickName= is.readString(1, false, this.sNickName);
    this.iScore= is.readInt32(2, false, this.iScore);
    this.iLevel= is.readInt32(3, false, this.iLevel);
};
HUYA.GuardInfo = function()
{
    this.lUid = 0;
    this.lPid = 0;
    this.iGuardLevel = 0;
    this.lEndTime = 0;
};
HUYA.GuardInfo.prototype._clone = function () { return new HUYA.GuardInfo(); }
HUYA.GuardInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GuardInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GuardInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeInt64(1, this.lPid);
    os.writeInt32(2, this.iGuardLevel);
    os.writeInt64(3, this.lEndTime);
};

HUYA.GuardInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.lPid= is.readInt64(1, false, this.lPid);
    this.iGuardLevel= is.readInt32(2, false, this.iGuardLevel);
    this.lEndTime= is.readInt64(3, false, this.lEndTime);
};
HUYA.GetLivingInfoReq = function()
{
    this.tId = new HUYA.UserId();
    this.lTopSid = 0;
    this.lSubSid = 0;
};
HUYA.GetLivingInfoReq.prototype._clone = function () { return new HUYA.GetLivingInfoReq(); }
HUYA.GetLivingInfoReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetLivingInfoReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetLivingInfoReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeInt64(1, this.lTopSid);
    os.writeInt64(2, this.lSubSid);
};

HUYA.GetLivingInfoReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.lTopSid= is.readInt64(1, false, this.lTopSid);
    this.lSubSid= is.readInt64(2, false, this.lSubSid);
};
HUYA.GetLivingInfoRsp = function()
{
    this.bIsLiving = 0;
    this.tNotice = new HUYA.BeginLiveNotice();
    this.tStreamSettingNotice = new HUYA.StreamSettingNotice();
};
HUYA.GetLivingInfoRsp.prototype._clone = function () { return new HUYA.GetLivingInfoRsp(); }
HUYA.GetLivingInfoRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetLivingInfoRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetLivingInfoRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.bIsLiving);
    os.writeStruct(1, this.tNotice);
    os.writeStruct(2, this.tStreamSettingNotice);
};

HUYA.GetLivingInfoRsp.prototype.readFrom = function (is)
{
    this.bIsLiving= is.readInt32(0, false, this.bIsLiving);
    this.tNotice= is.readStruct(1, false, this.tNotice);
    this.tStreamSettingNotice= is.readStruct(2, false, this.tStreamSettingNotice);
};
HUYA.StreamInfo = function()
{
    this.sCdnType = "";
    this.iIsMaster = 0;
    this.lChannelId = 0;
    this.lSubChannelId = 0;
    this.lPresenterUid = 0;
    this.sStreamName = "";
    this.sFlvUrl = "";
    this.sFlvUrlSuffix = "";
    this.sFlvAntiCode = "";
    this.sHlsUrl = "";
    this.sHlsUrlSuffix = "";
    this.sHlsAntiCode = "";
    this.iLineIndex = 0;
    this.iIsMultiStream = 0;
    this.iPCPriorityRate = 0;
    this.iWebPriorityRate = 0;
    this.iMobilePriorityRate = 0;
};
HUYA.StreamInfo.prototype._clone = function () { return new HUYA.StreamInfo(); }
HUYA.StreamInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.StreamInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.StreamInfo.prototype.writeTo = function (os)
{
    os.writeString(0, this.sCdnType);
    os.writeInt32(1, this.iIsMaster);
    os.writeInt64(2, this.lChannelId);
    os.writeInt64(3, this.lSubChannelId);
    os.writeInt64(4, this.lPresenterUid);
    os.writeString(5, this.sStreamName);
    os.writeString(6, this.sFlvUrl);
    os.writeString(7, this.sFlvUrlSuffix);
    os.writeString(8, this.sFlvAntiCode);
    os.writeString(9, this.sHlsUrl);
    os.writeString(10, this.sHlsUrlSuffix);
    os.writeString(11, this.sHlsAntiCode);
    os.writeInt32(12, this.iLineIndex);
    os.writeInt32(13, this.iIsMultiStream);
    os.writeInt32(14, this.iPCPriorityRate);
    os.writeInt32(15, this.iWebPriorityRate);
    os.writeInt32(16, this.iMobilePriorityRate);
};

HUYA.StreamInfo.prototype.readFrom = function (is)
{
    this.sCdnType= is.readString(0, false, this.sCdnType);
    this.iIsMaster= is.readInt32(1, false, this.iIsMaster);
    this.lChannelId= is.readInt64(2, false, this.lChannelId);
    this.lSubChannelId= is.readInt64(3, false, this.lSubChannelId);
    this.lPresenterUid= is.readInt64(4, false, this.lPresenterUid);
    this.sStreamName= is.readString(5, false, this.sStreamName);
    this.sFlvUrl= is.readString(6, false, this.sFlvUrl);
    this.sFlvUrlSuffix= is.readString(7, false, this.sFlvUrlSuffix);
    this.sFlvAntiCode= is.readString(8, false, this.sFlvAntiCode);
    this.sHlsUrl= is.readString(9, false, this.sHlsUrl);
    this.sHlsUrlSuffix= is.readString(10, false, this.sHlsUrlSuffix);
    this.sHlsAntiCode= is.readString(11, false, this.sHlsAntiCode);
    this.iLineIndex= is.readInt32(12, false, this.iLineIndex);
    this.iIsMultiStream= is.readInt32(13, false, this.iIsMultiStream);
    this.iPCPriorityRate= is.readInt32(14, false, this.iPCPriorityRate);
    this.iWebPriorityRate= is.readInt32(15, false, this.iWebPriorityRate);
    this.iMobilePriorityRate= is.readInt32(16, false, this.iMobilePriorityRate);
};
HUYA.MultiStreamInfo = function()
{
    this.sDisplayName = "";
    this.iBitRate = 0;
    this.iCodecType = 0;
    this.iCompatibleFlag = 0;
};
HUYA.MultiStreamInfo.prototype._clone = function () { return new HUYA.MultiStreamInfo(); }
HUYA.MultiStreamInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.MultiStreamInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.MultiStreamInfo.prototype.writeTo = function (os)
{
    os.writeString(0, this.sDisplayName);
    os.writeInt32(1, this.iBitRate);
    os.writeInt32(2, this.iCodecType);
    os.writeInt32(3, this.iCompatibleFlag);
};

HUYA.MultiStreamInfo.prototype.readFrom = function (is)
{
    this.sDisplayName= is.readString(0, false, this.sDisplayName);
    this.iBitRate= is.readInt32(1, false, this.iBitRate);
    this.iCodecType= is.readInt32(2, false, this.iCodecType);
    this.iCompatibleFlag= is.readInt32(3, false, this.iCompatibleFlag);
};
HUYA.StreamSettingNotice = function()
{
    this.lPresenterUid = 0;
    this.iBitRate = 0;
    this.iResolution = 0;
    this.iFrameRate = 0;
    this.lLiveId = 0;
};
HUYA.StreamSettingNotice.prototype._clone = function () { return new HUYA.StreamSettingNotice(); }
HUYA.StreamSettingNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.StreamSettingNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.StreamSettingNotice.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lPresenterUid);
    os.writeInt32(1, this.iBitRate);
    os.writeInt32(2, this.iResolution);
    os.writeInt32(3, this.iFrameRate);
    os.writeInt64(4, this.lLiveId);
};

HUYA.StreamSettingNotice.prototype.readFrom = function (is)
{
    this.lPresenterUid= is.readInt64(0, false, this.lPresenterUid);
    this.iBitRate= is.readInt32(1, false, this.iBitRate);
    this.iResolution= is.readInt32(2, false, this.iResolution);
    this.iFrameRate= is.readInt32(3, false, this.iFrameRate);
    this.lLiveId= is.readInt64(4, false, this.lLiveId);
};
HUYA.FansInfo = function()
{
    this.lUid = 0;
    this.lBadgeId = 0;
    this.iBadgeLevel = 0;
    this.iScore = 0;
};
HUYA.FansInfo.prototype._clone = function () { return new HUYA.FansInfo(); }
HUYA.FansInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FansInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FansInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeInt64(1, this.lBadgeId);
    os.writeInt32(2, this.iBadgeLevel);
    os.writeInt32(3, this.iScore);
};

HUYA.FansInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.lBadgeId= is.readInt64(1, false, this.lBadgeId);
    this.iBadgeLevel= is.readInt32(2, false, this.iBadgeLevel);
    this.iScore= is.readInt32(3, false, this.iScore);
};
HUYA.GetCdnTokenReq = function()
{
    this.url = "";
    this.cdn_type = "";
    this.stream_name = "";
    this.presenter_uid = 0;
};
HUYA.GetCdnTokenReq.prototype._clone = function () { return new HUYA.GetCdnTokenReq(); }
HUYA.GetCdnTokenReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetCdnTokenReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetCdnTokenReq.prototype.writeTo = function (os)
{
    os.writeString(0, this.url);
    os.writeString(1, this.cdn_type);
    os.writeString(2, this.stream_name);
    os.writeInt64(3, this.presenter_uid);
};

HUYA.GetCdnTokenReq.prototype.readFrom = function (is)
{
    this.url= is.readString(0, false, this.url);
    this.cdn_type= is.readString(1, false, this.cdn_type);
    this.stream_name= is.readString(2, false, this.stream_name);
    this.presenter_uid= is.readInt64(3, false, this.presenter_uid);
};
HUYA.GetCdnTokenRsp = function()
{
    this.url = "";
    this.cdn_type = "";
    this.stream_name = "";
    this.presenter_uid = 0;
    this.anti_code = "";
    this.sTime = "";
    this.flv_anti_code = "";
    this.hls_anti_code = "";
};
HUYA.GetCdnTokenRsp.prototype._clone = function () { return new HUYA.GetCdnTokenRsp(); }
HUYA.GetCdnTokenRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetCdnTokenRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetCdnTokenRsp.prototype.writeTo = function (os)
{
    os.writeString(0, this.url);
    os.writeString(1, this.cdn_type);
    os.writeString(2, this.stream_name);
    os.writeInt64(3, this.presenter_uid);
    os.writeString(4, this.anti_code);
    os.writeString(5, this.sTime);
    os.writeString(6, this.flv_anti_code);
    os.writeString(7, this.hls_anti_code);
};

HUYA.GetCdnTokenRsp.prototype.readFrom = function (is)
{
    this.url= is.readString(0, false, this.url);
    this.cdn_type= is.readString(1, false, this.cdn_type);
    this.stream_name= is.readString(2, false, this.stream_name);
    this.presenter_uid= is.readInt64(3, false, this.presenter_uid);
    this.anti_code= is.readString(4, false, this.anti_code);
    this.sTime= is.readString(5, false, this.sTime);
    this.flv_anti_code= is.readString(6, false, this.flv_anti_code);
    this.hls_anti_code= is.readString(7, false, this.hls_anti_code);
};
HUYA.LiveLaunchReq = function()
{
    this.tId = new HUYA.UserId();
    this.tLiveUB = new HUYA.LiveUserbase();
};
HUYA.LiveLaunchReq.prototype._clone = function () { return new HUYA.LiveLaunchReq(); }
HUYA.LiveLaunchReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveLaunchReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveLaunchReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeStruct(1, this.tLiveUB);
};

HUYA.LiveLaunchReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.tLiveUB= is.readStruct(1, false, this.tLiveUB);
};
HUYA.LiveLaunchRsp = function()
{
    this.sGuid = "";
    this.iTime = 0;
    this.vProxyList = new Taf.Vector(new HUYA.LiveProxyValue());
};
HUYA.LiveLaunchRsp.prototype._clone = function () { return new HUYA.LiveLaunchRsp(); }
HUYA.LiveLaunchRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveLaunchRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveLaunchRsp.prototype.writeTo = function (os)
{
    os.writeString(0, this.sGuid);
    os.writeInt32(1, this.iTime);
    os.writeVector(2, this.vProxyList);
};

HUYA.LiveLaunchRsp.prototype.readFrom = function (is)
{
    this.sGuid= is.readString(0, false, this.sGuid);
    this.iTime= is.readInt32(1, false, this.iTime);
    this.vProxyList= is.readVector(2, false, this.vProxyList);
};
HUYA.LiveAppUAEx = function()
{
    this.sIMEI = "";
    this.sAPN = "";
    this.sNetType = "";
};
HUYA.LiveAppUAEx.prototype._clone = function () { return new HUYA.LiveAppUAEx(); }
HUYA.LiveAppUAEx.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveAppUAEx.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveAppUAEx.prototype.writeTo = function (os)
{
    os.writeString(1, this.sIMEI);
    os.writeString(2, this.sAPN);
    os.writeString(3, this.sNetType);
};

HUYA.LiveAppUAEx.prototype.readFrom = function (is)
{
    this.sIMEI= is.readString(1, false, this.sIMEI);
    this.sAPN= is.readString(2, false, this.sAPN);
    this.sNetType= is.readString(3, false, this.sNetType);
};
HUYA.LiveUserbase = function()
{
    this.eSource = 0;
    this.eType = 0;
    this.tUAEx = new HUYA.LiveAppUAEx();
};
HUYA.LiveUserbase.prototype._clone = function () { return new HUYA.LiveUserbase(); }
HUYA.LiveUserbase.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveUserbase.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveUserbase.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.eSource);
    os.writeInt32(1, this.eType);
    os.writeStruct(2, this.tUAEx);
};

HUYA.LiveUserbase.prototype.readFrom = function (is)
{
    this.eSource= is.readInt32(0, false, this.eSource);
    this.eType= is.readInt32(1, false, this.eType);
    this.tUAEx= is.readStruct(2, false, this.tUAEx);
};
HUYA.LiveProxyValue = function()
{
    this.eProxyType = 0;
    this.sProxy = new Taf.Vector(new Taf.STRING());
};
HUYA.LiveProxyValue.prototype._clone = function () { return new HUYA.LiveProxyValue(); }
HUYA.LiveProxyValue.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveProxyValue.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveProxyValue.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.eProxyType);
    os.writeVector(1, this.sProxy);
};

HUYA.LiveProxyValue.prototype.readFrom = function (is)
{
    this.eProxyType= is.readInt32(0, false, this.eProxyType);
    this.sProxy= is.readVector(1, false, this.sProxy);
};
HUYA.SendCardPackageItemReq = function()
{
    this.tId = new HUYA.UserId();
    this.lSid = 0;
    this.lSubSid = 0;
    this.iShowFreeitemInfo = 0;
    this.iItemType = 0;
    this.iItemCount = 0;
    this.lPresenterUid = 0;
    this.sPayId = "";
    this.sSendContent = "";
    this.sSenderNick = "";
    this.sPresenterNick = "";
    this.iPayPloy = 0;
    this.iItemCountByGroup = 0;
    this.iItemGroup = 0;
    this.iSuperPupleLevel = 0;
    this.iFromType = 0;
    this.sExpand = "";
    this.sToken = "";
    this.iTemplateType = 0;
    this.sTokencaKey = "";
    this.sPassport = "";
    this.iSenderShortSid = 0;
    this.iPayByFreeItem = 0;
};
HUYA.SendCardPackageItemReq.prototype._clone = function () { return new HUYA.SendCardPackageItemReq(); }
HUYA.SendCardPackageItemReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.SendCardPackageItemReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.SendCardPackageItemReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeInt64(1, this.lSid);
    os.writeInt64(2, this.lSubSid);
    os.writeInt32(3, this.iShowFreeitemInfo);
    os.writeInt32(4, this.iItemType);
    os.writeInt32(5, this.iItemCount);
    os.writeInt64(6, this.lPresenterUid);
    os.writeString(7, this.sPayId);
    os.writeString(9, this.sSendContent);
    os.writeString(10, this.sSenderNick);
    os.writeString(11, this.sPresenterNick);
    os.writeInt32(12, this.iPayPloy);
    os.writeInt32(13, this.iItemCountByGroup);
    os.writeInt32(14, this.iItemGroup);
    os.writeInt32(15, this.iSuperPupleLevel);
    os.writeInt32(16, this.iFromType);
    os.writeString(17, this.sExpand);
    os.writeString(18, this.sToken);
    os.writeInt32(19, this.iTemplateType);
    os.writeString(20, this.sTokencaKey);
    os.writeString(21, this.sPassport);
    os.writeInt64(22, this.iSenderShortSid);
    os.writeInt32(23, this.iPayByFreeItem);
};

HUYA.SendCardPackageItemReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.lSid= is.readInt64(1, false, this.lSid);
    this.lSubSid= is.readInt64(2, false, this.lSubSid);
    this.iShowFreeitemInfo= is.readInt32(3, false, this.iShowFreeitemInfo);
    this.iItemType= is.readInt32(4, false, this.iItemType);
    this.iItemCount= is.readInt32(5, false, this.iItemCount);
    this.lPresenterUid= is.readInt64(6, false, this.lPresenterUid);
    this.sPayId= is.readString(7, false, this.sPayId);
    this.sSendContent= is.readString(9, false, this.sSendContent);
    this.sSenderNick= is.readString(10, false, this.sSenderNick);
    this.sPresenterNick= is.readString(11, false, this.sPresenterNick);
    this.iPayPloy= is.readInt32(12, false, this.iPayPloy);
    this.iItemCountByGroup= is.readInt32(13, false, this.iItemCountByGroup);
    this.iItemGroup= is.readInt32(14, false, this.iItemGroup);
    this.iSuperPupleLevel= is.readInt32(15, false, this.iSuperPupleLevel);
    this.iFromType= is.readInt32(16, false, this.iFromType);
    this.sExpand= is.readString(17, false, this.sExpand);
    this.sToken= is.readString(18, false, this.sToken);
    this.iTemplateType= is.readInt32(19, false, this.iTemplateType);
    this.sTokencaKey= is.readString(20, false, this.sTokencaKey);
    this.sPassport= is.readString(21, false, this.sPassport);
    this.iSenderShortSid= is.readInt64(22, false, this.iSenderShortSid);
    this.iPayByFreeItem= is.readInt32(23, false, this.iPayByFreeItem);
};
HUYA.SendCardPackageItemRsp = function()
{
    this.iPayRespCode = 0;
    this.iItemType = 0;
    this.iItemCount = 0;
    this.strPayId = "";
    this.strPayConfirmUrl = "";
    this.strSendContent = "";
    this.iItemCountByGroup = 0;
    this.iItemGroup = 0;
    this.lPresenterUid = 0;
    this.sExpand = "";
    this.strPayItemInfo = "";
};
HUYA.SendCardPackageItemRsp.prototype._clone = function () { return new HUYA.SendCardPackageItemRsp(); }
HUYA.SendCardPackageItemRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.SendCardPackageItemRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.SendCardPackageItemRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iPayRespCode);
    os.writeInt32(1, this.iItemType);
    os.writeInt32(2, this.iItemCount);
    os.writeString(3, this.strPayId);
    os.writeString(4, this.strPayConfirmUrl);
    os.writeString(5, this.strSendContent);
    os.writeInt32(6, this.iItemCountByGroup);
    os.writeInt32(7, this.iItemGroup);
    os.writeInt64(8, this.lPresenterUid);
    os.writeString(9, this.sExpand);
    os.writeString(10, this.strPayItemInfo);
};

HUYA.SendCardPackageItemRsp.prototype.readFrom = function (is)
{
    this.iPayRespCode= is.readInt32(0, false, this.iPayRespCode);
    this.iItemType= is.readInt32(1, false, this.iItemType);
    this.iItemCount= is.readInt32(2, false, this.iItemCount);
    this.strPayId= is.readString(3, false, this.strPayId);
    this.strPayConfirmUrl= is.readString(4, false, this.strPayConfirmUrl);
    this.strSendContent= is.readString(5, false, this.strSendContent);
    this.iItemCountByGroup= is.readInt32(6, false, this.iItemCountByGroup);
    this.iItemGroup= is.readInt32(7, false, this.iItemGroup);
    this.lPresenterUid= is.readInt64(8, false, this.lPresenterUid);
    this.sExpand= is.readString(9, false, this.sExpand);
    this.strPayItemInfo= is.readString(10, false, this.strPayItemInfo);
};
HUYA.GetVerificationStatusReq = function()
{
    this.tId = new HUYA.UserId();
};
HUYA.GetVerificationStatusReq.prototype._clone = function () { return new HUYA.GetVerificationStatusReq(); }
HUYA.GetVerificationStatusReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetVerificationStatusReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetVerificationStatusReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
};

HUYA.GetVerificationStatusReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
};
HUYA.GetFirstRechargePkgStatusReq = function()
{
    this.tId = new HUYA.UserId();
};
HUYA.GetFirstRechargePkgStatusReq.prototype._clone = function () { return new HUYA.GetFirstRechargePkgStatusReq(); }
HUYA.GetFirstRechargePkgStatusReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetFirstRechargePkgStatusReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetFirstRechargePkgStatusReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
};

HUYA.GetFirstRechargePkgStatusReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
};
HUYA.MuteRoomUserReq = function()
{
    this.tId = new HUYA.UserId();
    this.lUid = 0;
    this.sText = "";
    this.lPresenterUid = 0;
    this.lSubcid = 0;
    this.iMutedTime = 0;
};
HUYA.MuteRoomUserReq.prototype._clone = function () { return new HUYA.MuteRoomUserReq(); }
HUYA.MuteRoomUserReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.MuteRoomUserReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.MuteRoomUserReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeInt64(1, this.lUid);
    os.writeString(2, this.sText);
    os.writeInt64(3, this.lPresenterUid);
    os.writeInt64(4, this.lSubcid);
    os.writeInt32(5, this.iMutedTime);
};

HUYA.MuteRoomUserReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.lUid= is.readInt64(1, false, this.lUid);
    this.sText= is.readString(2, false, this.sText);
    this.lPresenterUid= is.readInt64(3, false, this.lPresenterUid);
    this.lSubcid= is.readInt64(4, false, this.lSubcid);
    this.iMutedTime= is.readInt32(5, false, this.iMutedTime);
};
HUYA.GetVerificationStatusResp = function()
{
    this.iStatus = 0;
    this.lExpenditure = 0;
};
HUYA.GetVerificationStatusResp.prototype._clone = function () { return new HUYA.GetVerificationStatusResp(); }
HUYA.GetVerificationStatusResp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetVerificationStatusResp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetVerificationStatusResp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iStatus);
    os.writeInt64(1, this.lExpenditure);
};

HUYA.GetVerificationStatusResp.prototype.readFrom = function (is)
{
    this.iStatus= is.readInt32(0, false, this.iStatus);
    this.lExpenditure= is.readInt64(1, false, this.lExpenditure);
};
HUYA.GetFirstRechargePkgStatusResp = function()
{
    this.iStatus = 0;
};
HUYA.GetFirstRechargePkgStatusResp.prototype._clone = function () { return new HUYA.GetFirstRechargePkgStatusResp(); }
HUYA.GetFirstRechargePkgStatusResp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetFirstRechargePkgStatusResp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetFirstRechargePkgStatusResp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iStatus);
};

HUYA.GetFirstRechargePkgStatusResp.prototype.readFrom = function (is)
{
    this.iStatus= is.readInt32(0, false, this.iStatus);
};
HUYA.MuteRoomUserRsp = function()
{
    this.iRetCode = 0;
    this.sMsg = "";
};
HUYA.MuteRoomUserRsp.prototype._clone = function () { return new HUYA.MuteRoomUserRsp(); }
HUYA.MuteRoomUserRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.MuteRoomUserRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.MuteRoomUserRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iRetCode);
    os.writeString(1, this.sMsg);
};

HUYA.MuteRoomUserRsp.prototype.readFrom = function (is)
{
    this.iRetCode= is.readInt32(0, false, this.iRetCode);
    this.sMsg= is.readString(1, false, this.sMsg);
};
HUYA.SendItemSubBroadcastPacket = function()
{
    this.iItemType = 0;
    this.strPayId = "";
    this.iItemCount = 0;
    this.lPresenterUid = 0;
    this.lSenderUid = 0;
    this.sPresenterNick = "";
    this.sSenderNick = "";
    this.sSendContent = "";
    this.iItemCountByGroup = 0;
    this.iItemGroup = 0;
    this.iSuperPupleLevel = 0;
    this.iComboScore = 0;
    this.iDisplayInfo = 0;
    this.iEffectType = 0;
    this.iSenderIcon = "";
    this.iPresenterIcon = "";
    this.iTemplateType = 0;
    this.sExpand = "";
    this.bBusi = false;
    this.iColorEffectType = 0;
};
HUYA.SendItemSubBroadcastPacket.prototype._clone = function () { return new HUYA.SendItemSubBroadcastPacket(); }
HUYA.SendItemSubBroadcastPacket.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.SendItemSubBroadcastPacket.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.SendItemSubBroadcastPacket.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iItemType);
    os.writeString(1, this.strPayId);
    os.writeInt32(2, this.iItemCount);
    os.writeInt64(3, this.lPresenterUid);
    os.writeInt64(4, this.lSenderUid);
    os.writeString(5, this.sPresenterNick);
    os.writeString(6, this.sSenderNick);
    os.writeString(7, this.sSendContent);
    os.writeInt32(8, this.iItemCountByGroup);
    os.writeInt32(9, this.iItemGroup);
    os.writeInt32(10, this.iSuperPupleLevel);
    os.writeInt32(11, this.iComboScore);
    os.writeInt32(12, this.iDisplayInfo);
    os.writeInt32(13, this.iEffectType);
    os.writeString(14, this.iSenderIcon);
    os.writeString(15, this.iPresenterIcon);
    os.writeInt32(16, this.iTemplateType);
    os.writeString(17, this.sExpand);
    os.writeBoolean(18, this.bBusi);
    os.writeInt32(19, this.iColorEffectType);
};

HUYA.SendItemSubBroadcastPacket.prototype.readFrom = function (is)
{
    this.iItemType= is.readInt32(0, false, this.iItemType);
    this.strPayId= is.readString(1, false, this.strPayId);
    this.iItemCount= is.readInt32(2, false, this.iItemCount);
    this.lPresenterUid= is.readInt64(3, false, this.lPresenterUid);
    this.lSenderUid= is.readInt64(4, false, this.lSenderUid);
    this.sPresenterNick= is.readString(5, false, this.sPresenterNick);
    this.sSenderNick= is.readString(6, false, this.sSenderNick);
    this.sSendContent= is.readString(7, false, this.sSendContent);
    this.iItemCountByGroup= is.readInt32(8, false, this.iItemCountByGroup);
    this.iItemGroup= is.readInt32(9, false, this.iItemGroup);
    this.iSuperPupleLevel= is.readInt32(10, false, this.iSuperPupleLevel);
    this.iComboScore= is.readInt32(11, false, this.iComboScore);
    this.iDisplayInfo= is.readInt32(12, false, this.iDisplayInfo);
    this.iEffectType= is.readInt32(13, false, this.iEffectType);
    this.iSenderIcon= is.readString(14, false, this.iSenderIcon);
    this.iPresenterIcon= is.readString(15, false, this.iPresenterIcon);
    this.iTemplateType= is.readInt32(16, false, this.iTemplateType);
    this.sExpand= is.readString(17, false, this.sExpand);
    this.bBusi= is.readBoolean(18, false, this.bBusi);
    this.iColorEffectType= is.readInt32(19, false, this.iColorEffectType);
};
HUYA.SendItemNoticeWordBroadcastPacket = function()
{
    this.iItemType = 0;
    this.iItemCount = 0;
    this.lSenderSid = 0;
    this.lSenderUid = 0;
    this.sSenderNick = "";
    this.lPresenterUid = 0;
    this.sPresenterNick = "";
    this.lNoticeChannelCount = 0;
    this.iItemCountByGroup = 0;
    this.iItemGroup = 0;
    this.iDisplayInfo = 0;
    this.iSuperPupleLevel = 0;
    this.iTemplateType = 0;
    this.sExpand = "";
    this.bBusi = false;
};
HUYA.SendItemNoticeWordBroadcastPacket.prototype._clone = function () { return new HUYA.SendItemNoticeWordBroadcastPacket(); }
HUYA.SendItemNoticeWordBroadcastPacket.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.SendItemNoticeWordBroadcastPacket.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.SendItemNoticeWordBroadcastPacket.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iItemType);
    os.writeInt32(1, this.iItemCount);
    os.writeInt64(2, this.lSenderSid);
    os.writeInt64(3, this.lSenderUid);
    os.writeString(4, this.sSenderNick);
    os.writeInt64(5, this.lPresenterUid);
    os.writeString(6, this.sPresenterNick);
    os.writeInt64(7, this.lNoticeChannelCount);
    os.writeInt32(8, this.iItemCountByGroup);
    os.writeInt32(9, this.iItemGroup);
    os.writeInt32(10, this.iDisplayInfo);
    os.writeInt32(11, this.iSuperPupleLevel);
    os.writeInt32(12, this.iTemplateType);
    os.writeString(13, this.sExpand);
    os.writeBoolean(14, this.bBusi);
};

HUYA.SendItemNoticeWordBroadcastPacket.prototype.readFrom = function (is)
{
    this.iItemType= is.readInt32(0, false, this.iItemType);
    this.iItemCount= is.readInt32(1, false, this.iItemCount);
    this.lSenderSid= is.readInt64(2, false, this.lSenderSid);
    this.lSenderUid= is.readInt64(3, false, this.lSenderUid);
    this.sSenderNick= is.readString(4, false, this.sSenderNick);
    this.lPresenterUid= is.readInt64(5, false, this.lPresenterUid);
    this.sPresenterNick= is.readString(6, false, this.sPresenterNick);
    this.lNoticeChannelCount= is.readInt64(7, false, this.lNoticeChannelCount);
    this.iItemCountByGroup= is.readInt32(8, false, this.iItemCountByGroup);
    this.iItemGroup= is.readInt32(9, false, this.iItemGroup);
    this.iDisplayInfo= is.readInt32(10, false, this.iDisplayInfo);
    this.iSuperPupleLevel= is.readInt32(11, false, this.iSuperPupleLevel);
    this.iTemplateType= is.readInt32(12, false, this.iTemplateType);
    this.sExpand= is.readString(13, false, this.sExpand);
    this.bBusi= is.readBoolean(14, false, this.bBusi);
};
HUYA.BeginLiveNotice = function()
{
    this.lPresenterUid = 0;
    this.iGameId = 0;
    this.sGameName = "";
    this.iRandomRange = 0;
    this.iStreamType = 0;
    this.vStreamInfo = new Taf.Vector(new HUYA.StreamInfo());
    this.vCdnList = new Taf.Vector(new Taf.STRING());
    this.lLiveId = 0;
    this.iPCDefaultBitRate = 0;
    this.iWebDefaultBitRate = 0;
    this.iMobileDefaultBitRate = 0;
    this.lMultiStreamFlag = 0;
    this.sNick = "";
    this.lYYId = 0;
    this.lAttendeeCount = 0;
    this.iCodecType = 0;
    this.iScreenType = 0;
    this.vMultiStreamInfo = new Taf.Vector(new HUYA.MultiStreamInfo());
    this.sLiveDesc = "";
    this.lLiveCompatibleFlag = 0;
};
HUYA.BeginLiveNotice.prototype._clone = function () { return new HUYA.BeginLiveNotice(); }
HUYA.BeginLiveNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BeginLiveNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BeginLiveNotice.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lPresenterUid);
    os.writeInt32(1, this.iGameId);
    os.writeString(2, this.sGameName);
    os.writeInt32(3, this.iRandomRange);
    os.writeInt32(4, this.iStreamType);
    os.writeVector(5, this.vStreamInfo);
    os.writeVector(6, this.vCdnList);
    os.writeInt64(7, this.lLiveId);
    os.writeInt32(8, this.iPCDefaultBitRate);
    os.writeInt32(9, this.iWebDefaultBitRate);
    os.writeInt32(10, this.iMobileDefaultBitRate);
    os.writeInt64(11, this.lMultiStreamFlag);
    os.writeString(12, this.sNick);
    os.writeInt64(13, this.lYYId);
    os.writeInt64(14, this.lAttendeeCount);
    os.writeInt32(15, this.iCodecType);
    os.writeInt32(16, this.iScreenType);
    os.writeVector(17, this.vMultiStreamInfo);
    os.writeString(18, this.sLiveDesc);
    os.writeInt64(19, this.lLiveCompatibleFlag);
};

HUYA.BeginLiveNotice.prototype.readFrom = function (is)
{
    this.lPresenterUid= is.readInt64(0, false, this.lPresenterUid);
    this.iGameId= is.readInt32(1, false, this.iGameId);
    this.sGameName= is.readString(2, false, this.sGameName);
    this.iRandomRange= is.readInt32(3, false, this.iRandomRange);
    this.iStreamType= is.readInt32(4, false, this.iStreamType);
    this.vStreamInfo= is.readVector(5, false, this.vStreamInfo);
    this.vCdnList= is.readVector(6, false, this.vCdnList);
    this.lLiveId= is.readInt64(7, false, this.lLiveId);
    this.iPCDefaultBitRate= is.readInt32(8, false, this.iPCDefaultBitRate);
    this.iWebDefaultBitRate= is.readInt32(9, false, this.iWebDefaultBitRate);
    this.iMobileDefaultBitRate= is.readInt32(10, false, this.iMobileDefaultBitRate);
    this.lMultiStreamFlag= is.readInt64(11, false, this.lMultiStreamFlag);
    this.sNick= is.readString(12, false, this.sNick);
    this.lYYId= is.readInt64(13, false, this.lYYId);
    this.lAttendeeCount= is.readInt64(14, false, this.lAttendeeCount);
    this.iCodecType= is.readInt32(15, false, this.iCodecType);
    this.iScreenType= is.readInt32(16, false, this.iScreenType);
    this.vMultiStreamInfo= is.readVector(17, false, this.vMultiStreamInfo);
    this.sLiveDesc= is.readString(18, false, this.sLiveDesc);
    this.lLiveCompatibleFlag= is.readInt64(19, false, this.lLiveCompatibleFlag);
};
HUYA.EndLiveNotice = function()
{
    this.lPresenterUid = 0;
    this.iReason = 0;
    this.lLiveId = 0;
};
HUYA.EndLiveNotice.prototype._clone = function () { return new HUYA.EndLiveNotice(); }
HUYA.EndLiveNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.EndLiveNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.EndLiveNotice.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lPresenterUid);
    os.writeInt32(1, this.iReason);
    os.writeInt64(2, this.lLiveId);
};

HUYA.EndLiveNotice.prototype.readFrom = function (is)
{
    this.lPresenterUid= is.readInt64(0, false, this.lPresenterUid);
    this.iReason= is.readInt32(1, false, this.iReason);
    this.lLiveId= is.readInt64(2, false, this.lLiveId);
};
HUYA.NobleEnterNotice = function()
{
    this.tNobleInfo = new HUYA.NobleBase();
};
HUYA.NobleEnterNotice.prototype._clone = function () { return new HUYA.NobleEnterNotice(); }
HUYA.NobleEnterNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleEnterNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleEnterNotice.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tNobleInfo);
};

HUYA.NobleEnterNotice.prototype.readFrom = function (is)
{
    this.tNobleInfo= is.readStruct(0, false, this.tNobleInfo);
};
HUYA.NobleSpeakResp = function()
{
    this.iRespCode = 0;
    this.lUid = 0;
    this.lTid = 0;
    this.lSid = 0;
    this.lPid = 0;
};
HUYA.NobleSpeakResp.prototype._clone = function () { return new HUYA.NobleSpeakResp(); }
HUYA.NobleSpeakResp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleSpeakResp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleSpeakResp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iRespCode);
    os.writeInt64(1, this.lUid);
    os.writeInt64(2, this.lTid);
    os.writeInt64(3, this.lSid);
    os.writeInt64(4, this.lPid);
};

HUYA.NobleSpeakResp.prototype.readFrom = function (is)
{
    this.iRespCode= is.readInt32(0, false, this.iRespCode);
    this.lUid= is.readInt64(1, false, this.lUid);
    this.lTid= is.readInt64(2, false, this.lTid);
    this.lSid= is.readInt64(3, false, this.lSid);
    this.lPid= is.readInt64(4, false, this.lPid);
};
HUYA.NobleSpeakReq = function()
{
    this.tUserId = new HUYA.UserId();
    this.lTid = 0;
    this.lSid = 0;
    this.lPid = 0;
    this.sMsg = "";
    this.tSender = new HUYA.SenderItem();
    this.tNoble = new HUYA.NobleItem();
    this.tFans = new HUYA.FansItem();
    this.tVipSimle = new HUYA.VipSmileItem();
    this.tStamp = new HUYA.StampItem();
    this.tMass = new HUYA.MassItem();
    this.mReserver = new Taf.Map(new Taf.STRING(), new Taf.STRING());
};
HUYA.NobleSpeakReq.prototype._clone = function () { return new HUYA.NobleSpeakReq(); }
HUYA.NobleSpeakReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleSpeakReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleSpeakReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
    os.writeInt64(1, this.lTid);
    os.writeInt64(2, this.lSid);
    os.writeInt64(3, this.lPid);
    os.writeString(4, this.sMsg);
    os.writeStruct(5, this.tSender);
    os.writeStruct(6, this.tNoble);
    os.writeStruct(7, this.tFans);
    os.writeStruct(8, this.tVipSimle);
    os.writeStruct(9, this.tStamp);
    os.writeStruct(10, this.tMass);
    os.writeMap(11, this.mReserver);
};

HUYA.NobleSpeakReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
    this.lTid= is.readInt64(1, false, this.lTid);
    this.lSid= is.readInt64(2, false, this.lSid);
    this.lPid= is.readInt64(3, false, this.lPid);
    this.sMsg= is.readString(4, false, this.sMsg);
    this.tSender= is.readStruct(5, false, this.tSender);
    this.tNoble= is.readStruct(6, false, this.tNoble);
    this.tFans= is.readStruct(7, false, this.tFans);
    this.tVipSimle= is.readStruct(8, false, this.tVipSimle);
    this.tStamp= is.readStruct(9, false, this.tStamp);
    this.tMass= is.readStruct(10, false, this.tMass);
    this.mReserver= is.readMap(11, false, this.mReserver);
};
HUYA.NobleSpeakBrst = function()
{
    this.tUserId = new HUYA.UserId();
    this.lTid = 0;
    this.lSid = 0;
    this.lPid = 0;
    this.sMsg = "";
    this.tSender = new HUYA.SenderItem();
    this.tNoble = new HUYA.NobleItem();
    this.tFans = new HUYA.FansItem();
    this.tVipSimle = new HUYA.VipSmileItem();
    this.tStamp = new HUYA.StampItem();
    this.tMass = new HUYA.MassItem();
    this.mReserver = new Taf.Map(new Taf.STRING(), new Taf.STRING());
    this.iChatCache = 0;
    this.iRoomAuditLevel = 0;
};
HUYA.NobleSpeakBrst.prototype._clone = function () { return new HUYA.NobleSpeakBrst(); }
HUYA.NobleSpeakBrst.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleSpeakBrst.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleSpeakBrst.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
    os.writeInt64(1, this.lTid);
    os.writeInt64(2, this.lSid);
    os.writeInt64(3, this.lPid);
    os.writeString(4, this.sMsg);
    os.writeStruct(5, this.tSender);
    os.writeStruct(6, this.tNoble);
    os.writeStruct(7, this.tFans);
    os.writeStruct(8, this.tVipSimle);
    os.writeStruct(9, this.tStamp);
    os.writeStruct(10, this.tMass);
    os.writeMap(11, this.mReserver);
    os.writeInt32(12, this.iChatCache);
    os.writeInt32(13, this.iRoomAuditLevel);
};

HUYA.NobleSpeakBrst.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
    this.lTid= is.readInt64(1, false, this.lTid);
    this.lSid= is.readInt64(2, false, this.lSid);
    this.lPid= is.readInt64(3, false, this.lPid);
    this.sMsg= is.readString(4, false, this.sMsg);
    this.tSender= is.readStruct(5, false, this.tSender);
    this.tNoble= is.readStruct(6, false, this.tNoble);
    this.tFans= is.readStruct(7, false, this.tFans);
    this.tVipSimle= is.readStruct(8, false, this.tVipSimle);
    this.tStamp= is.readStruct(9, false, this.tStamp);
    this.tMass= is.readStruct(10, false, this.tMass);
    this.mReserver= is.readMap(11, false, this.mReserver);
    this.iChatCache= is.readInt32(12, false, this.iChatCache);
    this.iRoomAuditLevel= is.readInt32(13, false, this.iRoomAuditLevel);
};
HUYA.SenderItem = function()
{
    this.lSenderUid = 0;
    this.lYYid = 0;
    this.iSenderRole = 0;
    this.iSenderGender = 0;
    this.sSenderNick = "";
};
HUYA.SenderItem.prototype._clone = function () { return new HUYA.SenderItem(); }
HUYA.SenderItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.SenderItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.SenderItem.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lSenderUid);
    os.writeInt64(1, this.lYYid);
    os.writeInt32(2, this.iSenderRole);
    os.writeInt32(3, this.iSenderGender);
    os.writeString(4, this.sSenderNick);
};

HUYA.SenderItem.prototype.readFrom = function (is)
{
    this.lSenderUid= is.readInt64(0, false, this.lSenderUid);
    this.lYYid= is.readInt64(1, false, this.lYYid);
    this.iSenderRole= is.readInt32(2, false, this.iSenderRole);
    this.iSenderGender= is.readInt32(3, false, this.iSenderGender);
    this.sSenderNick= is.readString(4, false, this.sSenderNick);
};
HUYA.NobleItem = function()
{
    this.iNobleLevel = 0;
    this.lDeadLine = 0;
};
HUYA.NobleItem.prototype._clone = function () { return new HUYA.NobleItem(); }
HUYA.NobleItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleItem.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iNobleLevel);
    os.writeInt64(1, this.lDeadLine);
};

HUYA.NobleItem.prototype.readFrom = function (is)
{
    this.iNobleLevel= is.readInt32(0, false, this.iNobleLevel);
    this.lDeadLine= is.readInt64(1, false, this.lDeadLine);
};
HUYA.FansItem = function()
{
    this.iFansLevel = 0;
    this.sFansNick = "";
    this.sFansPresenterNick = "";
};
HUYA.FansItem.prototype._clone = function () { return new HUYA.FansItem(); }
HUYA.FansItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FansItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FansItem.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iFansLevel);
    os.writeString(1, this.sFansNick);
    os.writeString(2, this.sFansPresenterNick);
};

HUYA.FansItem.prototype.readFrom = function (is)
{
    this.iFansLevel= is.readInt32(0, false, this.iFansLevel);
    this.sFansNick= is.readString(1, false, this.sFansNick);
    this.sFansPresenterNick= is.readString(2, false, this.sFansPresenterNick);
};
HUYA.VipSmileItem = function()
{
    this.sVipSmileKey = "";
    this.sVipSmilePath = "";
};
HUYA.VipSmileItem.prototype._clone = function () { return new HUYA.VipSmileItem(); }
HUYA.VipSmileItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.VipSmileItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.VipSmileItem.prototype.writeTo = function (os)
{
    os.writeString(0, this.sVipSmileKey);
    os.writeString(1, this.sVipSmilePath);
};

HUYA.VipSmileItem.prototype.readFrom = function (is)
{
    this.sVipSmileKey= is.readString(0, false, this.sVipSmileKey);
    this.sVipSmilePath= is.readString(1, false, this.sVipSmilePath);
};
HUYA.StampItem = function()
{
    this.sSealIconPath = "";
    this.sKeyImg = "";
    this.lStampTime = 0;
    this.lStampEndTime = 0;
    this.iValidity = 0;
    this.sStampUserNick = "";
};
HUYA.StampItem.prototype._clone = function () { return new HUYA.StampItem(); }
HUYA.StampItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.StampItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.StampItem.prototype.writeTo = function (os)
{
    os.writeString(0, this.sSealIconPath);
    os.writeString(1, this.sKeyImg);
    os.writeInt64(2, this.lStampTime);
    os.writeInt64(3, this.lStampEndTime);
    os.writeInt32(4, this.iValidity);
    os.writeString(5, this.sStampUserNick);
};

HUYA.StampItem.prototype.readFrom = function (is)
{
    this.sSealIconPath= is.readString(0, false, this.sSealIconPath);
    this.sKeyImg= is.readString(1, false, this.sKeyImg);
    this.lStampTime= is.readInt64(2, false, this.lStampTime);
    this.lStampEndTime= is.readInt64(3, false, this.lStampEndTime);
    this.iValidity= is.readInt32(4, false, this.iValidity);
    this.sStampUserNick= is.readString(5, false, this.sStampUserNick);
};
HUYA.MassItem = function()
{
    this.iGoldHostLevel = 0;
    this.iSuperPupleLevel = 0;
    this.iVipLevel = 0;
    this.iUserLevel = 0;
    this.iIsVipRed = 0;
    this.iAtSomebody = 0;
    this.sAtSomebodyNick = "";
    this.ibarrageColor = 0;
    this.sDevSourceType = "";
};
HUYA.MassItem.prototype._clone = function () { return new HUYA.MassItem(); }
HUYA.MassItem.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.MassItem.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.MassItem.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iGoldHostLevel);
    os.writeInt32(1, this.iSuperPupleLevel);
    os.writeInt32(2, this.iVipLevel);
    os.writeInt32(3, this.iUserLevel);
    os.writeInt32(4, this.iIsVipRed);
    os.writeInt32(5, this.iAtSomebody);
    os.writeString(6, this.sAtSomebodyNick);
    os.writeInt32(7, this.ibarrageColor);
    os.writeString(8, this.sDevSourceType);
};

HUYA.MassItem.prototype.readFrom = function (is)
{
    this.iGoldHostLevel= is.readInt32(0, false, this.iGoldHostLevel);
    this.iSuperPupleLevel= is.readInt32(1, false, this.iSuperPupleLevel);
    this.iVipLevel= is.readInt32(2, false, this.iVipLevel);
    this.iUserLevel= is.readInt32(3, false, this.iUserLevel);
    this.iIsVipRed= is.readInt32(4, false, this.iIsVipRed);
    this.iAtSomebody= is.readInt32(5, false, this.iAtSomebody);
    this.sAtSomebodyNick= is.readString(6, false, this.sAtSomebodyNick);
    this.ibarrageColor= is.readInt32(7, false, this.ibarrageColor);
    this.sDevSourceType= is.readString(8, false, this.sDevSourceType);
};
HUYA.NobleInfoReq = function()
{
    this.tUserId = new HUYA.UserId();
};
HUYA.NobleInfoReq.prototype._clone = function () { return new HUYA.NobleInfoReq(); }
HUYA.NobleInfoReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleInfoReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleInfoReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
};

HUYA.NobleInfoReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
};
HUYA.NobleInfoRsp = function()
{
    this.tInfo = new HUYA.NobleInfo();
};
HUYA.NobleInfoRsp.prototype._clone = function () { return new HUYA.NobleInfoRsp(); }
HUYA.NobleInfoRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleInfoRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleInfoRsp.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tInfo);
};

HUYA.NobleInfoRsp.prototype.readFrom = function (is)
{
    this.tInfo= is.readStruct(0, false, this.tInfo);
};
HUYA.NobleInfo = function()
{
    this.lUid = 0;
    this.lPid = 0;
    this.lValidDate = 0;
    this.sNobleName = "";
    this.iNobleLevel = 0;
    this.iNoblePet = 0;
    this.iNobleStatus = 0;
    this.iNobleType = 0;
};
HUYA.NobleInfo.prototype._clone = function () { return new HUYA.NobleInfo(); }
HUYA.NobleInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeInt64(1, this.lPid);
    os.writeInt64(2, this.lValidDate);
    os.writeString(3, this.sNobleName);
    os.writeInt32(4, this.iNobleLevel);
    os.writeInt32(5, this.iNoblePet);
    os.writeInt32(6, this.iNobleStatus);
    os.writeInt32(7, this.iNobleType);
};

HUYA.NobleInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.lPid= is.readInt64(1, false, this.lPid);
    this.lValidDate= is.readInt64(2, false, this.lValidDate);
    this.sNobleName= is.readString(3, false, this.sNobleName);
    this.iNobleLevel= is.readInt32(4, false, this.iNobleLevel);
    this.iNoblePet= is.readInt32(5, false, this.iNoblePet);
    this.iNobleStatus= is.readInt32(6, false, this.iNobleStatus);
    this.iNobleType= is.readInt32(7, false, this.iNobleType);
};
HUYA.GetPropsListReq = function() {
    this.tUserId = new HUYA.UserId();
    this.sMd5 = "";
    this.iTemplateType = HUYA.EClientTemplateType.TPL_PC;
    this.sVersion = "";
};
HUYA.GetPropsListReq.prototype._clone = function() {
    return new HUYA.GetPropsListReq(); }
HUYA.GetPropsListReq.prototype._write = function(os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetPropsListReq.prototype._read = function(is, tag, def) {
    return is.readStruct(tag, true, def); }

HUYA.GetPropsListReq.prototype.writeTo = function(os) {
    os.writeStruct(1, this.tUserId);
    os.writeString(2, this.sMd5);
    os.writeInt32(3, this.iTemplateType);
    os.writeString(4, this.sVersion);
};

HUYA.GetPropsListReq.prototype.readFrom = function(is) {
    this.tUserId = is.readStruct(1, false, this.tUserId);
    this.sMd5 = is.readString(2, false, this.sMd5);
    this.iTemplateType = is.readInt32(3, false, this.iTemplateType);
    this.sVersion = is.readString(4, false, this.sVersion);
};
HUYA.GetPropsListRsp = function() {
    this.vPropsItemList = new Taf.Vector(new HUYA.PropsItem());
    this.sMd5 = "";
    this.iNewEffectSwitch = 0;
};
HUYA.GetPropsListRsp.prototype._clone = function() {
    return new HUYA.GetPropsListRsp(); }
HUYA.GetPropsListRsp.prototype._write = function(os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetPropsListRsp.prototype._read = function(is, tag, def) {
    return is.readStruct(tag, true, def); }

HUYA.GetPropsListRsp.prototype.writeTo = function(os) {
    os.writeVector(1, this.vPropsItemList);
    os.writeString(2, this.sMd5);
    os.writeInt16(3, this.iNewEffectSwitch);
};

HUYA.GetPropsListRsp.prototype.readFrom = function(is) {
    this.vPropsItemList = is.readVector(1, false, this.vPropsItemList);
    this.sMd5 = is.readString(2, false, this.sMd5);
    this.iNewEffectSwitch = is.readInt16(3, false, this.iNewEffectSwitch);
};
HUYA.PropsItem = function() {
    this.iPropsId = 0;
    this.sPropsName = "";
    this.iPropsYb = 0;
    this.iPropsGreenBean = 0;
    this.iPropsWhiteBean = 0;
    this.iPropsGoldenBean = 0;
    this.iPropsRed = 0;
    this.iPropsPopular = 0;
    this.iPropsExpendNum = -1;
    this.iPropsFansValue = -1;
    this.vPropsNum = new Taf.Vector(new Taf.INT32());
    this.iPropsMaxNum = 0;
    this.iPropsBatterFlag = 0;
    this.vPropsChannel = new Taf.Vector(new Taf.INT32());
    this.sPropsToolTip = "";
    this.vPropsIdentity = new Taf.Vector(new HUYA.PropsIdentity());
    this.iPropsWeights = 0;
    this.iPropsLevel = 0;
    this.tDisplayInfo = new HUYA.DisplayInfo();
    this.tSpecialInfo = new HUYA.SpecialInfo();
    this.iPropsGrade = 0;
    this.iPropsGroupNum = 0;
    this.sPropsCommBannerResource = "";
    this.sPropsOwnBannerResource = "";
    this.iPropsShowFlag = 0;
    this.iTemplateType = 0;
    this.iShelfStatus = 0;
    this.sAndroidLogo = "";
    this.sIpadLogo = "";
    this.sIphoneLogo = "";
    this.sPropsCommBannerResourceEx = "";
    this.sPropsOwnBannerResourceEx = "";
};
HUYA.PropsItem.prototype._clone = function() {
    return new HUYA.PropsItem(); }
HUYA.PropsItem.prototype._write = function(os, tag, value) { os.writeStruct(tag, value); }
HUYA.PropsItem.prototype._read = function(is, tag, def) {
    return is.readStruct(tag, true, def); }

HUYA.PropsItem.prototype.writeTo = function(os) {
    os.writeInt32(1, this.iPropsId);
    os.writeString(2, this.sPropsName);
    os.writeInt32(3, this.iPropsYb);
    os.writeInt32(4, this.iPropsGreenBean);
    os.writeInt32(5, this.iPropsWhiteBean);
    os.writeInt32(6, this.iPropsGoldenBean);
    os.writeInt32(7, this.iPropsRed);
    os.writeInt32(8, this.iPropsPopular);
    os.writeInt32(9, this.iPropsExpendNum);
    os.writeInt32(10, this.iPropsFansValue);
    os.writeVector(11, this.vPropsNum);
    os.writeInt32(12, this.iPropsMaxNum);
    os.writeInt32(13, this.iPropsBatterFlag);
    os.writeVector(14, this.vPropsChannel);
    os.writeString(15, this.sPropsToolTip);
    os.writeVector(16, this.vPropsIdentity);
    os.writeInt32(17, this.iPropsWeights);
    os.writeInt32(18, this.iPropsLevel);
    os.writeStruct(19, this.tDisplayInfo);
    os.writeStruct(20, this.tSpecialInfo);
    os.writeInt32(21, this.iPropsGrade);
    os.writeInt32(22, this.iPropsGroupNum);
    os.writeString(23, this.sPropsCommBannerResource);
    os.writeString(24, this.sPropsOwnBannerResource);
    os.writeInt32(25, this.iPropsShowFlag);
    os.writeInt32(26, this.iTemplateType);
    os.writeInt32(27, this.iShelfStatus);
    os.writeString(28, this.sAndroidLogo);
    os.writeString(29, this.sIpadLogo);
    os.writeString(30, this.sIphoneLogo);
    os.writeString(31, this.sPropsCommBannerResourceEx);
    os.writeString(32, this.sPropsOwnBannerResourceEx);
};

HUYA.PropsItem.prototype.readFrom = function(is) {
    this.iPropsId = is.readInt32(1, false, this.iPropsId);
    this.sPropsName = is.readString(2, false, this.sPropsName);
    this.iPropsYb = is.readInt32(3, false, this.iPropsYb);
    this.iPropsGreenBean = is.readInt32(4, false, this.iPropsGreenBean);
    this.iPropsWhiteBean = is.readInt32(5, false, this.iPropsWhiteBean);
    this.iPropsGoldenBean = is.readInt32(6, false, this.iPropsGoldenBean);
    this.iPropsRed = is.readInt32(7, false, this.iPropsRed);
    this.iPropsPopular = is.readInt32(8, false, this.iPropsPopular);
    this.iPropsExpendNum = is.readInt32(9, false, this.iPropsExpendNum);
    this.iPropsFansValue = is.readInt32(10, false, this.iPropsFansValue);
    this.vPropsNum = is.readVector(11, false, this.vPropsNum);
    this.iPropsMaxNum = is.readInt32(12, false, this.iPropsMaxNum);
    this.iPropsBatterFlag = is.readInt32(13, false, this.iPropsBatterFlag);
    this.vPropsChannel = is.readVector(14, false, this.vPropsChannel);
    this.sPropsToolTip = is.readString(15, false, this.sPropsToolTip);
    this.vPropsIdentity = is.readVector(16, false, this.vPropsIdentity);
    this.iPropsWeights = is.readInt32(17, false, this.iPropsWeights);
    this.iPropsLevel = is.readInt32(18, false, this.iPropsLevel);
    this.tDisplayInfo = is.readStruct(19, false, this.tDisplayInfo);
    this.tSpecialInfo = is.readStruct(20, false, this.tSpecialInfo);
    this.iPropsGrade = is.readInt32(21, false, this.iPropsGrade);
    this.iPropsGroupNum = is.readInt32(22, false, this.iPropsGroupNum);
    this.sPropsCommBannerResource = is.readString(23, false, this.sPropsCommBannerResource);
    this.sPropsOwnBannerResource = is.readString(24, false, this.sPropsOwnBannerResource);
    this.iPropsShowFlag = is.readInt32(25, false, this.iPropsShowFlag);
    this.iTemplateType = is.readInt32(26, false, this.iTemplateType);
    this.iShelfStatus = is.readInt32(27, false, this.iShelfStatus);
    this.sAndroidLogo = is.readString(28, false, this.sAndroidLogo);
    this.sIpadLogo = is.readString(29, false, this.sIpadLogo);
    this.sIphoneLogo = is.readString(30, false, this.sIphoneLogo);
    this.sPropsCommBannerResourceEx = is.readString(31, false, this.sPropsCommBannerResourceEx);
    this.sPropsOwnBannerResourceEx = is.readString(32, false, this.sPropsOwnBannerResourceEx);
};
HUYA.PropsIdentity = function() {
    this.iPropsIdType = 0;
    this.sPropsPic18 = "";
    this.sPropsPic24 = "";
    this.sPropsPicGif = "";
    this.sPropsBannerResource = "";
    this.sPropsBannerSize = "";
    this.sPropsBannerMaxTime = "";
    this.sPropsChatBannerResource = "";
    this.sPropsChatBannerSize = "";
    this.sPropsChatBannerMaxTime = "";
    this.iPropsChatBannerPos = 0;
    this.iPropsChatBannerIsCombo = 0;
    this.sPropsRollContent = "";
    this.iPropsBannerAnimationstyle = 0;
};
HUYA.PropsIdentity.prototype._clone = function() {
    return new HUYA.PropsIdentity(); }
HUYA.PropsIdentity.prototype._write = function(os, tag, value) { os.writeStruct(tag, value); }
HUYA.PropsIdentity.prototype._read = function(is, tag, def) {
    return is.readStruct(tag, true, def); }

HUYA.PropsIdentity.prototype.writeTo = function(os) {
    os.writeInt32(1, this.iPropsIdType);
    os.writeString(2, this.sPropsPic18);
    os.writeString(3, this.sPropsPic24);
    os.writeString(4, this.sPropsPicGif);
    os.writeString(5, this.sPropsBannerResource);
    os.writeString(6, this.sPropsBannerSize);
    os.writeString(7, this.sPropsBannerMaxTime);
    os.writeString(8, this.sPropsChatBannerResource);
    os.writeString(9, this.sPropsChatBannerSize);
    os.writeString(10, this.sPropsChatBannerMaxTime);
    os.writeInt32(11, this.iPropsChatBannerPos);
    os.writeInt32(12, this.iPropsChatBannerIsCombo);
    os.writeString(13, this.sPropsRollContent);
    os.writeInt32(14, this.iPropsBannerAnimationstyle);
};

HUYA.PropsIdentity.prototype.readFrom = function(is) {
    this.iPropsIdType = is.readInt32(1, false, this.iPropsIdType);
    this.sPropsPic18 = is.readString(2, false, this.sPropsPic18);
    this.sPropsPic24 = is.readString(3, false, this.sPropsPic24);
    this.sPropsPicGif = is.readString(4, false, this.sPropsPicGif);
    this.sPropsBannerResource = is.readString(5, false, this.sPropsBannerResource);
    this.sPropsBannerSize = is.readString(6, false, this.sPropsBannerSize);
    this.sPropsBannerMaxTime = is.readString(7, false, this.sPropsBannerMaxTime);
    this.sPropsChatBannerResource = is.readString(8, false, this.sPropsChatBannerResource);
    this.sPropsChatBannerSize = is.readString(9, false, this.sPropsChatBannerSize);
    this.sPropsChatBannerMaxTime = is.readString(10, false, this.sPropsChatBannerMaxTime);
    this.iPropsChatBannerPos = is.readInt32(11, false, this.iPropsChatBannerPos);
    this.iPropsChatBannerIsCombo = is.readInt32(12, false, this.iPropsChatBannerIsCombo);
    this.sPropsRollContent = is.readString(13, false, this.sPropsRollContent);
    this.iPropsBannerAnimationstyle = is.readInt32(14, false, this.iPropsBannerAnimationstyle);
};
HUYA.DisplayInfo = function() {
    this.iMarqueeScopeMin = 0;
    this.iMarqueeScopeMax = 0;
    this.iCurrentVideoNum = 0;
    this.iCurrentVideoMin = 0;
    this.iCurrentVideoMax = 0;
    this.iAllVideoNum = 0;
    this.iAllVideoMin = 0;
    this.iAllVideoMax = 0;
    this.iCurrentScreenNum = 0;
    this.iCurrentScreenMin = 0;
    this.iCurrentScreenMax = 0;
};
HUYA.DisplayInfo.prototype._clone = function() {
    return new HUYA.DisplayInfo(); }
HUYA.DisplayInfo.prototype._write = function(os, tag, value) { os.writeStruct(tag, value); }
HUYA.DisplayInfo.prototype._read = function(is, tag, def) {
    return is.readStruct(tag, true, def); }

HUYA.DisplayInfo.prototype.writeTo = function(os) {
    os.writeInt32(1, this.iMarqueeScopeMin);
    os.writeInt32(2, this.iMarqueeScopeMax);
    os.writeInt32(3, this.iCurrentVideoNum);
    os.writeInt32(4, this.iCurrentVideoMin);
    os.writeInt32(5, this.iCurrentVideoMax);
    os.writeInt32(6, this.iAllVideoNum);
    os.writeInt32(7, this.iAllVideoMin);
    os.writeInt32(8, this.iAllVideoMax);
    os.writeInt32(9, this.iCurrentScreenNum);
    os.writeInt32(10, this.iCurrentScreenMin);
    os.writeInt32(11, this.iCurrentScreenMax);
};

HUYA.DisplayInfo.prototype.readFrom = function(is) {
    this.iMarqueeScopeMin = is.readInt32(1, false, this.iMarqueeScopeMin);
    this.iMarqueeScopeMax = is.readInt32(2, false, this.iMarqueeScopeMax);
    this.iCurrentVideoNum = is.readInt32(3, false, this.iCurrentVideoNum);
    this.iCurrentVideoMin = is.readInt32(4, false, this.iCurrentVideoMin);
    this.iCurrentVideoMax = is.readInt32(5, false, this.iCurrentVideoMax);
    this.iAllVideoNum = is.readInt32(6, false, this.iAllVideoNum);
    this.iAllVideoMin = is.readInt32(7, false, this.iAllVideoMin);
    this.iAllVideoMax = is.readInt32(8, false, this.iAllVideoMax);
    this.iCurrentScreenNum = is.readInt32(9, false, this.iCurrentScreenNum);
    this.iCurrentScreenMin = is.readInt32(10, false, this.iCurrentScreenMin);
    this.iCurrentScreenMax = is.readInt32(11, false, this.iCurrentScreenMax);
};
HUYA.SpecialInfo = function() {
    this.iFirstSingle = 0;
    this.iFirstGroup = 0;
    this.sFirstTips = "";
    this.iSecondSingle = 0;
    this.iSecondGroup = 0;
    this.sSecondTips = "";
    this.iThirdSingle = 0;
    this.iThirdGroup = 0;
    this.sThirdTips = "";
    this.iWorldSingle = 0;
    this.iWorldGroup = 0;
};
HUYA.SpecialInfo.prototype._clone = function() {
    return new HUYA.SpecialInfo(); }
HUYA.SpecialInfo.prototype._write = function(os, tag, value) { os.writeStruct(tag, value); }
HUYA.SpecialInfo.prototype._read = function(is, tag, def) {
    return is.readStruct(tag, true, def); }

HUYA.SpecialInfo.prototype.writeTo = function(os) {
    os.writeInt32(1, this.iFirstSingle);
    os.writeInt32(2, this.iFirstGroup);
    os.writeString(3, this.sFirstTips);
    os.writeInt32(4, this.iSecondSingle);
    os.writeInt32(5, this.iSecondGroup);
    os.writeString(6, this.sSecondTips);
    os.writeInt32(7, this.iThirdSingle);
    os.writeInt32(8, this.iThirdGroup);
    os.writeString(9, this.sThirdTips);
    os.writeInt32(10, this.iWorldSingle);
    os.writeInt32(11, this.iWorldGroup);
};

HUYA.SpecialInfo.prototype.readFrom = function(is) {
    this.iFirstSingle = is.readInt32(1, false, this.iFirstSingle);
    this.iFirstGroup = is.readInt32(2, false, this.iFirstGroup);
    this.sFirstTips = is.readString(3, false, this.sFirstTips);
    this.iSecondSingle = is.readInt32(4, false, this.iSecondSingle);
    this.iSecondGroup = is.readInt32(5, false, this.iSecondGroup);
    this.sSecondTips = is.readString(6, false, this.sSecondTips);
    this.iThirdSingle = is.readInt32(7, false, this.iThirdSingle);
    this.iThirdGroup = is.readInt32(8, false, this.iThirdGroup);
    this.sThirdTips = is.readString(9, false, this.sThirdTips);
    this.iWorldSingle = is.readInt32(10, false, this.iWorldSingle);
    this.iWorldGroup = is.readInt32(11, false, this.iWorldGroup);
};
HUYA.TokenCdnInfo = function()
{
    this.sCdnName = "";
    this.sUrl = "";
};
HUYA.TokenCdnInfo.prototype._clone = function () { return new HUYA.TokenCdnInfo(); }
HUYA.TokenCdnInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.TokenCdnInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.TokenCdnInfo.prototype.writeTo = function (os)
{
    os.writeString(0, this.sCdnName);
    os.writeString(1, this.sUrl);
};

HUYA.TokenCdnInfo.prototype.readFrom = function (is)
{
    this.sCdnName= is.readString(0, false, this.sCdnName);
    this.sUrl= is.readString(1, false, this.sUrl);
};
HUYA.CdnAntiCodeInfo = function()
{
    this.sCdnName = "";
    this.sFlvAntiCode = "";
    this.sHlsAntiCode = "";
};
HUYA.CdnAntiCodeInfo.prototype._clone = function () { return new HUYA.CdnAntiCodeInfo(); }
HUYA.CdnAntiCodeInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.CdnAntiCodeInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.CdnAntiCodeInfo.prototype.writeTo = function (os)
{
    os.writeString(0, this.sCdnName);
    os.writeString(1, this.sFlvAntiCode);
    os.writeString(2, this.sHlsAntiCode);
};

HUYA.CdnAntiCodeInfo.prototype.readFrom = function (is)
{
    this.sCdnName= is.readString(0, false, this.sCdnName);
    this.sFlvAntiCode= is.readString(1, false, this.sFlvAntiCode);
    this.sHlsAntiCode= is.readString(2, false, this.sHlsAntiCode);
};
HUYA.BatchGetCdnTokenReq = function()
{
    this.vCdnInfos = new Taf.Vector(new HUYA.TokenCdnInfo());
    this.sStreamName = "";
};
HUYA.BatchGetCdnTokenReq.prototype._clone = function () { return new HUYA.BatchGetCdnTokenReq(); }
HUYA.BatchGetCdnTokenReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BatchGetCdnTokenReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BatchGetCdnTokenReq.prototype.writeTo = function (os)
{
    os.writeVector(0, this.vCdnInfos);
    os.writeString(1, this.sStreamName);
};

HUYA.BatchGetCdnTokenReq.prototype.readFrom = function (is)
{
    this.vCdnInfos= is.readVector(0, false, this.vCdnInfos);
    this.sStreamName= is.readString(1, false, this.sStreamName);
};
HUYA.BatchGetCdnTokenRsp = function()
{
    this.vCdnAntiCodes = new Taf.Vector(new HUYA.CdnAntiCodeInfo());
};
HUYA.BatchGetCdnTokenRsp.prototype._clone = function () { return new HUYA.BatchGetCdnTokenRsp(); }
HUYA.BatchGetCdnTokenRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BatchGetCdnTokenRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BatchGetCdnTokenRsp.prototype.writeTo = function (os)
{
    os.writeVector(0, this.vCdnAntiCodes);
};

HUYA.BatchGetCdnTokenRsp.prototype.readFrom = function (is)
{
    this.vCdnAntiCodes= is.readVector(0, false, this.vCdnAntiCodes);
};
HUYA.NobleBase = function()
{
    this.lUid = 0;
    this.sNickName = "";
    this.iLevel = 0;
    this.sName = "";
    this.iPet = 0;
    this.lPid = 0;
    this.lTid = 0;
    this.lSid = 0;
    this.lStartTime = 0;
    this.lEndTime = 0;
    this.iLeftDay = 0;
    this.iStatus = 0;
    this.iOpenFlag = 0;
};
HUYA.NobleBase.prototype._clone = function () { return new HUYA.NobleBase(); }
HUYA.NobleBase.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.NobleBase.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.NobleBase.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sNickName);
    os.writeInt32(2, this.iLevel);
    os.writeString(3, this.sName);
    os.writeInt32(4, this.iPet);
    os.writeInt64(5, this.lPid);
    os.writeInt64(6, this.lTid);
    os.writeInt64(7, this.lSid);
    os.writeInt64(8, this.lStartTime);
    os.writeInt64(9, this.lEndTime);
    os.writeInt32(10, this.iLeftDay);
    os.writeInt32(11, this.iStatus);
    os.writeInt32(12, this.iOpenFlag);
};

HUYA.NobleBase.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sNickName= is.readString(1, false, this.sNickName);
    this.iLevel= is.readInt32(2, false, this.iLevel);
    this.sName= is.readString(3, false, this.sName);
    this.iPet= is.readInt32(4, false, this.iPet);
    this.lPid= is.readInt64(5, false, this.lPid);
    this.lTid= is.readInt64(6, false, this.lTid);
    this.lSid= is.readInt64(7, false, this.lSid);
    this.lStartTime= is.readInt64(8, false, this.lStartTime);
    this.lEndTime= is.readInt64(9, false, this.lEndTime);
    this.iLeftDay= is.readInt32(10, false, this.iLeftDay);
    this.iStatus= is.readInt32(11, false, this.iStatus);
    this.iOpenFlag= is.readInt32(12, false, this.iOpenFlag);
};
HUYA.GetWebdbUserInfoReq = function()
{
    this.lUid = 0;
    this.lImid = 0;
    this.sPassport = "";
    this.sAccount = "";
    this.bCacheFirst = true;
};
HUYA.GetWebdbUserInfoReq.prototype._clone = function () { return new HUYA.GetWebdbUserInfoReq(); }
HUYA.GetWebdbUserInfoReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetWebdbUserInfoReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetWebdbUserInfoReq.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeInt64(1, this.lImid);
    os.writeString(2, this.sPassport);
    os.writeString(3, this.sAccount);
    os.writeBoolean(4, this.bCacheFirst);
};

HUYA.GetWebdbUserInfoReq.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.lImid= is.readInt64(1, false, this.lImid);
    this.sPassport= is.readString(2, false, this.sPassport);
    this.sAccount= is.readString(3, false, this.sAccount);
    this.bCacheFirst= is.readBoolean(4, false, this.bCacheFirst);
};
HUYA.GetWebdbUserInfoRsp = function()
{
    this.tUserInfo = new HUYA.DBUserInfo();
};
HUYA.GetWebdbUserInfoRsp.prototype._clone = function () { return new HUYA.GetWebdbUserInfoRsp(); }
HUYA.GetWebdbUserInfoRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetWebdbUserInfoRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetWebdbUserInfoRsp.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserInfo);
};

HUYA.GetWebdbUserInfoRsp.prototype.readFrom = function (is)
{
    this.tUserInfo= is.readStruct(0, false, this.tUserInfo);
};
HUYA.DBUserInfo = function()
{
    this.lUid = 0;
    this.sPassport = "";
    this.sAccount = "";
    this.sNick = "";
    this.iSex = 0;
    this.iBirthday = 0;
    this.sArea = "";
    this.sProvince = "";
    this.sCity = "";
    this.sSign = "";
    this.sIntro = "";
    this.iJifen = 0;
    this.sRegisterTime = "";
    this.sHdlogo = "";
    this.sSessionCard = "";
    this.lImid = 0;
};
HUYA.DBUserInfo.prototype._clone = function () { return new HUYA.DBUserInfo(); }
HUYA.DBUserInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.DBUserInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.DBUserInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sPassport);
    os.writeString(2, this.sAccount);
    os.writeString(3, this.sNick);
    os.writeInt32(4, this.iSex);
    os.writeInt32(5, this.iBirthday);
    os.writeString(6, this.sArea);
    os.writeString(7, this.sProvince);
    os.writeString(8, this.sCity);
    os.writeString(9, this.sSign);
    os.writeString(10, this.sIntro);
    os.writeInt32(11, this.iJifen);
    os.writeString(12, this.sRegisterTime);
    os.writeString(13, this.sHdlogo);
    os.writeString(14, this.sSessionCard);
    os.writeInt64(16, this.lImid);
};

HUYA.DBUserInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sPassport= is.readString(1, false, this.sPassport);
    this.sAccount= is.readString(2, false, this.sAccount);
    this.sNick= is.readString(3, false, this.sNick);
    this.iSex= is.readInt32(4, false, this.iSex);
    this.iBirthday= is.readInt32(5, false, this.iBirthday);
    this.sArea= is.readString(6, false, this.sArea);
    this.sProvince= is.readString(7, false, this.sProvince);
    this.sCity= is.readString(8, false, this.sCity);
    this.sSign= is.readString(9, false, this.sSign);
    this.sIntro= is.readString(10, false, this.sIntro);
    this.iJifen= is.readInt32(11, false, this.iJifen);
    this.sRegisterTime= is.readString(12, false, this.sRegisterTime);
    this.sHdlogo= is.readString(13, false, this.sHdlogo);
    this.sSessionCard= is.readString(14, false, this.sSessionCard);
    this.lImid= is.readInt64(16, false, this.lImid);
};
HUYA.GiftInfo = function()
{
    this.iItemType = 0;
    this.iItemCount = 0;
};
HUYA.GiftInfo.prototype._clone = function () { return new HUYA.GiftInfo(); }
HUYA.GiftInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GiftInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GiftInfo.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iItemType);
    os.writeInt32(1, this.iItemCount);
};

HUYA.GiftInfo.prototype.readFrom = function (is)
{
    this.iItemType= is.readInt32(0, false, this.iItemType);
    this.iItemCount= is.readInt32(1, false, this.iItemCount);
};
HUYA.GetUserBoxInfoReq = function()
{
    this.tId = new HUYA.UserId();
};
HUYA.GetUserBoxInfoReq.prototype._clone = function () { return new HUYA.GetUserBoxInfoReq(); }
HUYA.GetUserBoxInfoReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetUserBoxInfoReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetUserBoxInfoReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
};

HUYA.GetUserBoxInfoReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
};
HUYA.GetUserBoxInfoRsp = function()
{
    this.lUid = 0;
    this.tTask1 = new HUYA.BoxTaskInfo();
    this.tTask2 = new HUYA.BoxTaskInfo();
    this.tTask3 = new HUYA.BoxTaskInfo();
    this.tTask4 = new HUYA.BoxTaskInfo();
    this.tTask5 = new HUYA.BoxTaskInfo();
    this.tTask6 = new HUYA.BoxTaskInfo();
};
HUYA.GetUserBoxInfoRsp.prototype._clone = function () { return new HUYA.GetUserBoxInfoRsp(); }
HUYA.GetUserBoxInfoRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.GetUserBoxInfoRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.GetUserBoxInfoRsp.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeStruct(1, this.tTask1);
    os.writeStruct(2, this.tTask2);
    os.writeStruct(3, this.tTask3);
    os.writeStruct(4, this.tTask4);
    os.writeStruct(5, this.tTask5);
    os.writeStruct(7, this.tTask6);
};

HUYA.GetUserBoxInfoRsp.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.tTask1= is.readStruct(1, false, this.tTask1);
    this.tTask2= is.readStruct(2, false, this.tTask2);
    this.tTask3= is.readStruct(3, false, this.tTask3);
    this.tTask4= is.readStruct(4, false, this.tTask4);
    this.tTask5= is.readStruct(5, false, this.tTask5);
    this.tTask6= is.readStruct(7, false, this.tTask6);
};
HUYA.FinishTaskNoticeReq = function()
{
    this.tId = new HUYA.UserId();
    this.lSid = 0;
    this.lSubSid = 0;
    this.iTaskId = 0;
    this.sPassport = "";
    this.iFromType = 0;
    this.fVersion = 1;
    this.sTime = "";
    this.sMd5 = "";
};
HUYA.FinishTaskNoticeReq.prototype._clone = function () { return new HUYA.FinishTaskNoticeReq(); }
HUYA.FinishTaskNoticeReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FinishTaskNoticeReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FinishTaskNoticeReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeInt64(1, this.lSid);
    os.writeInt64(2, this.lSubSid);
    os.writeInt32(3, this.iTaskId);
    os.writeString(4, this.sPassport);
    os.writeInt32(5, this.iFromType);
    os.writeFloat(6, this.fVersion);
    os.writeString(7, this.sTime);
    os.writeString(8, this.sMd5);
};

HUYA.FinishTaskNoticeReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.lSid= is.readInt64(1, false, this.lSid);
    this.lSubSid= is.readInt64(2, false, this.lSubSid);
    this.iTaskId= is.readInt32(3, false, this.iTaskId);
    this.sPassport= is.readString(4, false, this.sPassport);
    this.iFromType= is.readInt32(5, false, this.iFromType);
    this.fVersion= is.readFloat(6, false, this.fVersion);
    this.sTime= is.readString(7, false, this.sTime);
    this.sMd5= is.readString(8, false, this.sMd5);
};
HUYA.FinishTaskNoticeRsp = function()
{
    this.iRspCode = 0;
    this.iTaskId = 0;
};
HUYA.FinishTaskNoticeRsp.prototype._clone = function () { return new HUYA.FinishTaskNoticeRsp(); }
HUYA.FinishTaskNoticeRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.FinishTaskNoticeRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.FinishTaskNoticeRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iRspCode);
    os.writeInt32(1, this.iTaskId);
};

HUYA.FinishTaskNoticeRsp.prototype.readFrom = function (is)
{
    this.iRspCode= is.readInt32(0, false, this.iRspCode);
    this.iTaskId= is.readInt32(1, false, this.iTaskId);
};
HUYA.AwardBoxPrizeReq = function()
{
    this.tId = new HUYA.UserId();
    this.lSid = 0;
    this.lSubSid = 0;
    this.iTaskId = 0;
    this.sPassport = "";
    this.iFromType = 0;
    this.fVersion = 1;
    this.sTime = "";
    this.sMd5 = "";
};
HUYA.AwardBoxPrizeReq.prototype._clone = function () { return new HUYA.AwardBoxPrizeReq(); }
HUYA.AwardBoxPrizeReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.AwardBoxPrizeReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.AwardBoxPrizeReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeInt64(1, this.lSid);
    os.writeInt64(2, this.lSubSid);
    os.writeInt32(3, this.iTaskId);
    os.writeString(4, this.sPassport);
    os.writeInt32(5, this.iFromType);
    os.writeFloat(6, this.fVersion);
    os.writeString(7, this.sTime);
    os.writeString(8, this.sMd5);
};

HUYA.AwardBoxPrizeReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.lSid= is.readInt64(1, false, this.lSid);
    this.lSubSid= is.readInt64(2, false, this.lSubSid);
    this.iTaskId= is.readInt32(3, false, this.iTaskId);
    this.sPassport= is.readString(4, false, this.sPassport);
    this.iFromType= is.readInt32(5, false, this.iFromType);
    this.fVersion= is.readFloat(6, false, this.fVersion);
    this.sTime= is.readString(7, false, this.sTime);
    this.sMd5= is.readString(8, false, this.sMd5);
};
HUYA.AwardBoxPrizeRsp = function()
{
    this.iRspCode = 0;
    this.iTaskId = 0;
    this.iItemType = 0;
    this.iCount = 0;
};
HUYA.AwardBoxPrizeRsp.prototype._clone = function () { return new HUYA.AwardBoxPrizeRsp(); }
HUYA.AwardBoxPrizeRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.AwardBoxPrizeRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.AwardBoxPrizeRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iRspCode);
    os.writeInt32(1, this.iTaskId);
    os.writeInt32(2, this.iItemType);
    os.writeInt32(3, this.iCount);
};

HUYA.AwardBoxPrizeRsp.prototype.readFrom = function (is)
{
    this.iRspCode= is.readInt32(0, false, this.iRspCode);
    this.iTaskId= is.readInt32(1, false, this.iTaskId);
    this.iItemType= is.readInt32(2, false, this.iItemType);
    this.iCount= is.readInt32(3, false, this.iCount);
};
HUYA.BoxTaskInfo = function()
{
    this.iStat = 0;
    this.iItemType = 0;
    this.iItemCount = 0;
};
HUYA.BoxTaskInfo.prototype._clone = function () { return new HUYA.BoxTaskInfo(); }
HUYA.BoxTaskInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.BoxTaskInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.BoxTaskInfo.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iStat);
    os.writeInt32(1, this.iItemType);
    os.writeInt32(2, this.iItemCount);
};

HUYA.BoxTaskInfo.prototype.readFrom = function (is)
{
    this.iStat= is.readInt32(0, false, this.iStat);
    this.iItemType= is.readInt32(1, false, this.iItemType);
    this.iItemCount= is.readInt32(2, false, this.iItemCount);
};
HUYA.InterveneCountRsp = function()
{
    this.lTimeStamp = 0;
    this.iExpire = 0;
    this.lChannelId = 0;
    this.vCountInfos = new Taf.Vector(new HUYA.InterveneCountInfo());
};
HUYA.InterveneCountRsp.prototype._clone = function () { return new HUYA.InterveneCountRsp(); }
HUYA.InterveneCountRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.InterveneCountRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.InterveneCountRsp.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lTimeStamp);
    os.writeInt32(1, this.iExpire);
    os.writeInt64(2, this.lChannelId);
    os.writeVector(3, this.vCountInfos);
};

HUYA.InterveneCountRsp.prototype.readFrom = function (is)
{
    this.lTimeStamp= is.readInt64(0, false, this.lTimeStamp);
    this.iExpire= is.readInt32(1, false, this.iExpire);
    this.lChannelId= is.readInt64(2, false, this.lChannelId);
    this.vCountInfos= is.readVector(3, false, this.vCountInfos);
};
HUYA.InterveneCountInfo = function()
{
    this.lSubChannelId = 0;
    this.lAttendeeCount = 0;
};
HUYA.InterveneCountInfo.prototype._clone = function () { return new HUYA.InterveneCountInfo(); }
HUYA.InterveneCountInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.InterveneCountInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.InterveneCountInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lSubChannelId);
    os.writeInt64(1, this.lAttendeeCount);
};

HUYA.InterveneCountInfo.prototype.readFrom = function (is)
{
    this.lSubChannelId= is.readInt64(0, false, this.lSubChannelId);
    this.lAttendeeCount= is.readInt64(1, false, this.lAttendeeCount);
};
HUYA.AuditorEnterLiveNotice = function()
{
    this.iUserType = 0;
    this.lUid = 0;
    this.sNick = "";
    this.bSendMessagePopUp = false;
    this.sSendMessageTips = "";
    this.lSubcid = 0;
    this.iSendMessagePopUpAmtTime = 0;
};
HUYA.AuditorEnterLiveNotice.prototype._clone = function () { return new HUYA.AuditorEnterLiveNotice(); }
HUYA.AuditorEnterLiveNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.AuditorEnterLiveNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.AuditorEnterLiveNotice.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iUserType);
    os.writeInt64(1, this.lUid);
    os.writeString(2, this.sNick);
    os.writeBoolean(3, this.bSendMessagePopUp);
    os.writeString(4, this.sSendMessageTips);
    os.writeInt64(5, this.lSubcid);
    os.writeInt32(6, this.iSendMessagePopUpAmtTime);
};

HUYA.AuditorEnterLiveNotice.prototype.readFrom = function (is)
{
    this.iUserType= is.readInt32(0, false, this.iUserType);
    this.lUid= is.readInt64(1, false, this.lUid);
    this.sNick= is.readString(2, false, this.sNick);
    this.bSendMessagePopUp= is.readBoolean(3, false, this.bSendMessagePopUp);
    this.sSendMessageTips= is.readString(4, false, this.sSendMessageTips);
    this.lSubcid= is.readInt64(5, false, this.lSubcid);
    this.iSendMessagePopUpAmtTime= is.readInt32(6, false, this.iSendMessagePopUpAmtTime);
};
HUYA.AuditorRoleChangeNotice = function()
{
    this.iOldUserType = 0;
    this.iNewUserType = 0;
    this.lUid = 0;
    this.lSubcid = 0;
    this.sNick = "";
    this.bPopUp = false;
    this.sSystemTips = "";
    this.bSendMessagePopUp = false;
    this.sSendMessageTips = "";
    this.iSendMessagePopUpAmtTime = 0;
};
HUYA.AuditorRoleChangeNotice.prototype._clone = function () { return new HUYA.AuditorRoleChangeNotice(); }
HUYA.AuditorRoleChangeNotice.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.AuditorRoleChangeNotice.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.AuditorRoleChangeNotice.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iOldUserType);
    os.writeInt32(1, this.iNewUserType);
    os.writeInt64(2, this.lUid);
    os.writeInt64(3, this.lSubcid);
    os.writeString(4, this.sNick);
    os.writeBoolean(5, this.bPopUp);
    os.writeString(6, this.sSystemTips);
    os.writeBoolean(7, this.bSendMessagePopUp);
    os.writeString(8, this.sSendMessageTips);
    os.writeInt32(9, this.iSendMessagePopUpAmtTime);
};

HUYA.AuditorRoleChangeNotice.prototype.readFrom = function (is)
{
    this.iOldUserType= is.readInt32(0, false, this.iOldUserType);
    this.iNewUserType= is.readInt32(1, false, this.iNewUserType);
    this.lUid= is.readInt64(2, false, this.lUid);
    this.lSubcid= is.readInt64(3, false, this.lSubcid);
    this.sNick= is.readString(4, false, this.sNick);
    this.bPopUp= is.readBoolean(5, false, this.bPopUp);
    this.sSystemTips= is.readString(6, false, this.sSystemTips);
    this.bSendMessagePopUp= is.readBoolean(7, false, this.bSendMessagePopUp);
    this.sSendMessageTips= is.readString(8, false, this.sSendMessageTips);
    this.iSendMessagePopUpAmtTime= is.readInt32(9, false, this.iSendMessagePopUpAmtTime);
};
