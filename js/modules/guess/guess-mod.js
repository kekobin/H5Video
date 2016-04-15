//竞猜模块
function GuessMod(vplayer){
    var _vplayer = vplayer;
    var _this = this;
    
    var _classMap = {};
    var _instanceMap = {};
    
    var _gameData = null;
    
    (function(){
        _classMap.MAIN = GuessMain;
        _classMap.OPEN = GuessOpen;
        _classMap.PLAN = GuessPlan;
        _classMap.SET = GuessSet;
        _classMap.RESULT = GuessResult;
        
        _gameData = new GuessGameData();
    }());
    
    //获取UI
    this.getUI = function(key){
        var ui = _instanceMap[key];
        if(ui == null){
            var cla = _classMap[key];
            ui = new cla();
            ui.initialize(this,_vplayer);
            _instanceMap[key] = ui;
        }
        return ui;
    };
    
    ////协议返回
    function backNotice(value){
        _gameData.clear();
        var gameList = value.vGameNoticeInfoList.value;
        var len = gameList.length;
        var game, gameVO, beanList, beanListLen;
        for(var i = 0;i < len;i ++){
            gameVO = new GuessGameVO();
            _gameData.addGame(gameVO);
            
            game = gameList[i];
            gameVO.beanList = createBeanList(game.vGameNoticeInfo.value);
        }
        var main = _this.getUI("MAIN");
        main.backNotice(_gameData.getGameList());
    }
    
    function createBeanList(list){
        var result = [];
        var len = list.length;
        var data, beanVO;
        for(var i = 0;i < len;i ++){
            data = list[i];
            beanVO = new GuessGameBeanVO();
            $.extend(beanVO,data);
            beanVO.vGameUnitInfo = createUintList(data.vGameUnitInfo.value);
            result.push(beanVO);
        }
        return result;
    }
    
    function createUintList(list){
        var result = [];
        var len = list.length;
        var data, uintVO;
        for(var i = 0;i < len;i ++){
            data = list[i];
            uintVO = new GuessGameUintVO();
            $.extend(uintVO, data);
            result.push(uintVO);
        }
        return result;
    }
    
    function backChange(){
    }
    
    function backSettlement(){
    }
    
    function backEnd(){
    }
    
    function backHistory(value){
        var main = _this.getUI("MAIN");
        main.backHistory(value.vHistoryGameInfo);
    }
    
    ////测试代码
    var num = 1;
    
    this.testNotice = function(){
        var uList = [];
        uList.push({iBetExchangeAmount:10, iBetOdds:9, iGameUnitId:62780, sGameUnitName:"能"});
        uList.push({iBetExchangeAmount:15, iBetOdds:15, iGameUnitId:62781, sGameUnitName:"不能"});
        
        var bList = [];
        var b = {};
        b.iBetType = 1;
        b.iExchangeCredit = 0;
        b.iGameId = 31391;
        b.iGameStats = 1;
        b.iStarterCreditValue = 0;
        b.iStarterTotalGames = 0;
        b.iStarterUncloseGames = 0;
        b.lGameStarterUid = 957146872;
        b.lGameStarttime = 1460105950;
        b.sGameDescription = "";
        b.sGameName = "我能杀15个？";
        b.vGameUnitInfo = {value:uList};
        bList.push(b);
        b = {};
        b.iBetType = 2;
        b.iExchangeCredit = 66700000;
        b.iGameId = 31392;
        b.iGameStats = 1;
        b.iStarterCreditValue = 0;
        b.iStarterTotalGames = 0;
        b.iStarterUncloseGames = 0;
        b.lGameStarterUid = 957146872;
        b.lGameStarttime = 1460105950;
        b.sGameDescription = "";
        b.sGameName = "我能杀15个？";
        b.vGameUnitInfo = {value:uList};
        bList.push(b);
        
        var uList1 = [];
        uList1.push({iBetExchangeAmount:20, iBetOdds:5, iGameUnitId:62782, sGameUnitName:"可以"});
        uList1.push({iBetExchangeAmount:50, iBetOdds:10, iGameUnitId:62783, sGameUnitName:"不行"});
        
        var bList1 = [];
        b = {};
        b.iBetType = 1;
        b.iExchangeCredit = 0;
        b.iGameId = 31393;
        b.iGameStats = 1;
        b.iStarterCreditValue = 0;
        b.iStarterTotalGames = 0;
        b.iStarterUncloseGames = 0;
        b.lGameStarterUid = 957146872;
        b.lGameStarttime = 1460105950;
        b.sGameDescription = "";
        b.sGameName = "5分钟内取人头？";
        b.vGameUnitInfo = {value:uList1};
        bList1.push(b);
        b = {};
        b.iBetType = 2;
        b.iExchangeCredit = 66700000;
        b.iGameId = 31394;
        b.iGameStats = 1;
        b.iStarterCreditValue = 0;
        b.iStarterTotalGames = 0;
        b.iStarterUncloseGames = 0;
        b.lGameStarterUid = 957146872;
        b.lGameStarttime = 1460105950;
        b.sGameDescription = "";
        b.sGameName = "5分钟内取人头？";
        b.vGameUnitInfo = {value:uList1};
        bList1.push(b);
        
        var obj = {vGameNoticeInfoList:{value:[{vGameNoticeInfo:{value:bList}},{vGameNoticeInfo:{value:bList1}}]}};
        backNotice(obj);
    };
    
    this.testHis = function(){
        var hisList = [];
        hisList.push({sTopicName:"我人头数单双",iBreakFlag:0,sWinnerName:"单"});
        hisList.push({sTopicName:"我是MVP吗",iBreakFlag:1,sWinnerName:"我不是"});
        hisList.push({sTopicName:"我能不能4杀",iBreakFlag:0,sWinnerName:"不能"});
        var data = {vHistoryGameInfo:hisList};
        backHistory(data);
    };
}
//竞猜数据
function GuessGameData(){
    var _list = [];//竞猜列表
    
    this.addGame = function(game){
        _list.push(game);
    }
    
    this.getGameList = function(){
        return _list;
    }
    
    this.clear = function(){
        _list = [];
    }
}
//竞猜
function GuessGameVO(){
    this.beanList = [];
}
//开始竞猜信息
function GuessGameBeanVO(){
    this.iGameId = 0;//game_id
    this.iGameStats = 0;//竞猜状态(1竞猜状态 2封盘 3结算 4结算完毕 5流局)
    this.lGameStarterUid = 0;//开启竞猜者ID
    this.sGameName = "";//竞猜名称
    this.lGameStarttime = 0;//竞猜开始时间
    this.sGameDescription = "";//竞猜描述
    this.vGameUnitInfo = null;//比赛单元列表
    this.iStarterTotalGames = 0;//总场次
    this.iStarterUncloseGames = 0;//未完成场次
    this.iStarterCreditValue = 0;//信用值
    this.iExchangeCredit = 0;//交易信用
    this.iBetType = 0;//押注类型(1银，2金)
}
//比赛单元
function GuessGameUintVO(){
    this.iGameUnitId = 0;//对阵ID
    this.sGameUnitName = "";//对阵名称
    this.iBetOdds = 0;//赔率
    this.iBetExchangeAmount = 0;//已种豆数
}
//坐庄信息
function GuessGameBetVO(){
    this.iBetId = 0;//庄家单ID
    this.iBetMaxAmount = 0;//最大下注金额
    this.iBetExchangeAmount = 0;//已交易金额
    this.iBetOdds = 0;//赔率
    this.iBetType = 0;//押注类型
    this.sBankerName = "";//庄家昵称
}
//历史竞猜信息
function GuessGameHistoryVO(){
    this.sTopicName = "";//主题名称
    this.iBreakFlag = -1;//状态 0正常结束，1流局
    this.sWinnerName = "";//赢方名称
}
//我的竞猜记录信息
function GuessGameMyBetVO(){
    this.iBetId = 0;//庄家单ID
    this.sBankerName = "";//庄家昵称
    this.iOperationType = 0;//操作类型
    this.iBetType = 0;//押注类型
    this.iBetAmount = 0;//底金
    this.iBetExchangeAmount = 0;//下注金额
    this.iBetOdds = 0;//赔率
    this.lBetTime = 0;//时间，坐庄时间或买单时间，具体由operation_type定
    this.sBetWinnerName = "";//除名
    this.sGameName = "";//game topic name
}
//开始竞猜信息
function GuessGameStartVO(){
    this.vGameUnitList = null;//比赛对阵名
    this. iBetType = 0;//押注类型
    this.iCid = 0;//频道短位
    this.sGameName = "";//竞猜主题名称
}