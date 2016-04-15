//==============全局变量=================
var G = {}
this.G = G;

G.appid = 0;
G.topsid = 0;
G.subsid = 0;

G.yyuid = 0;
G.userId = null; //HUYA.UserId
G.isLogin = false; //是否已登录
G.hasVideo = false; //是否有直播

//用户信息 DBUserInfo
G.userInfo = null;

//直播间信息 GetLivingInfoRsp
G.livingInfo = null;

//HUYA.StreamInfo 当前正在播放的视频流信息，getLivingInfo
G.streamInfo = null;

//HUYA.GetCdnTokenRsp 重播时请求这个信息，内含视频地址
G.cdnToken = null;

//HUYA.NobleInfo 贵族信息，GetNobleInfo
G.nobleInfo = null;

//支付策略(1,2,4,8)
G.payploy = 15;

//当天二次验证状态 GetVerificationStatusResp    
//.iStatus; //0未验证过，1已验证过，2不需要验证
//.lExpenditure; //当天消费额
G.verifyStatus = null;

//用户是否已经领取过首充礼包
G.isGetFirstRechargePkg = false;

//欢聚云相关接口可能用到
G.udbAppid = 0;
G.udbAppkey = 0;



//原画码率
G.SrcBitRate = 0;
//当前码率
G.curBitRate = 0;

//视频清晰度对应的appid
G.BitRate = [500, 800, 1000, 1200, 1500, 2000,
	2500, 3000, 3500, 4000, 4500, 6500, 8500
];
G.BitRate1 = {
	"500": "0500",
	"800": "0800",
	"1200": "1200",
	"2000": "2000",
	"1500": "1500"
};
G.BitRate2 = {
	"1000": "22001",
	"2500": "22002",
	"3000": "22003",
	"3500": "22004",
	"4000": "22005",
	"4500": "22006",
	"6500": "22007",
	"8500": "22008"
};

//道具消费返回码提示
G.PayRspCode = [
	"扣费成功","扣费确认","扣费失败","Y币不足",
	"等级不够","没到时限","付费道具关闭","扣道具信息返回",
	"无效类型信息","数量超出限制","UDB验证失败","防刷验证失败",
	"参数错误，密保验证错误","没有足够资源(针对免费道具)",
	"Y币冻结","超出频率限制"
];
G.PayRspCode[48] = '二次验证失败';
G.PayRspCode[49] = 'UDB二次验证失败';
G.PayRspCode[50] = '二次验证参数错误';


//百宝箱返回码
G.BoxErrorCode = {
    0:'成功', 501:'未完成', 502:'外挂', 503:'失败'
};

