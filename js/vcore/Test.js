var Test = window.Test || {};
window.Test = Test;

Test.login = login;
Test.userIn = userIn;
Test.load = _play;
Test.play = play;
Test.pause = pause;
Test.danmu = danmu.playDanmu;
Test.bitrate = reqBitRate;

Object.defineProperties(Test, {
	muted: { //是否静音
		get: function() {
			return muted;
		},
		set: function(v) {
			muted = !!v;
			video.muted = muted;
			console.log("### muted="+muted);
		}
	},
	volume: { //音量值
		get: function() {
			return volume;
		},
		set: function(v) {
			v = Math.min(v, 100);
			v = Math.max(v, 0);
			volume = v;
			video.volume = v * 0.01;
			console.log("### volume="+volume);
		}
	}
});

