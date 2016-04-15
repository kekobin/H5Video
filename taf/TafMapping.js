/**
 * TAF协议映射，此文件依赖 TafProtocol.js
 */
var TafMx = TafMx || {};
TafMx.UriMapping = {
	"1002": HUYA.NobleEnterNotice,
	"1003": HUYA.NobleSpeakBrst,
	"1005": HUYA.NobleEnterNotice,

	"6200": HUYA.EnterPushInfo,
	"6201": HUYA.GameAdvertisement,
	"6202": HUYA.AdvanceUserEnterNotice,
	"6210": HUYA.VipBarListRsp,
	"6220": HUYA.WeekRankListRsp,
	"6221": HUYA.WeekRankEnterBanner,
	"6230": HUYA.FansRankListRsp,
	"6231": HUYA.BadgeInfo,
	"6232": HUYA.BadgeScoreChanged,
	"6233": HUYA.FansInfoNotice,
	"6234": HUYA.UserGiftNotice,
	"6250": HUYA.GiftBarRsp,
	"6260": HUYA.GrandCeremonyChampionPresenter,

	"6501": HUYA.SendItemSubBroadcastPacket,
	"6502": HUYA.SendItemNoticeWordBroadcastPacket,

	"8000": HUYA.BeginLiveNotice,
	"8001": HUYA.EndLiveNotice,

	"10040":HUYA.AuditorEnterLiveNotice,
	"10041":HUYA.AuditorRoleChangeNotice,
	
	"44000": HUYA.InterveneCountRsp
};
TafMx.WupMapping = {
	"doLaunch": HUYA.LiveLaunchRsp,
	"getLivingInfo": HUYA.GetLivingInfoRsp,
	"getWebdbUserInfo":HUYA.GetWebdbUserInfoRsp,
	"batchGetCdnTokenInfo":HUYA.BatchGetCdnTokenRsp,
	"sendCardPackageItem": HUYA.SendCardPackageItemRsp,
	"getVerificationStatus": HUYA.GetVerificationStatusResp,
	"getFirstRechargePkgStatus": HUYA.GetFirstRechargePkgStatusResp,
	"getVipBarList": HUYA.VipBarListRsp,
	"getWeekRankList": HUYA.WeekRankListRsp,
	"muteRoomUser": HUYA.MuteRoomUserRsp,
	"speak": HUYA.NobleSpeakResp,
	"GetNobleInfo": HUYA.NobleInfoRsp,
	"getPropsList": HUYA.GetPropsListRsp,
	"getUserBoxInfo":HUYA.GetUserBoxInfoRsp,
	"finishTaskNotice":HUYA.FinishTaskNoticeRsp,
	"awardBoxPrize":HUYA.AwardBoxPrizeRsp,
	"queryBadgeInfoList":HUYA.BadgeInfoListRsp,
	"useBadge":HUYA.BadgeInfo,
	"queryBadgeInfoList":HUYA.BadgeInfoListRsp,
};
