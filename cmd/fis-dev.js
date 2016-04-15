var configData = require('./fis-conf').getConfig();

//发布目录
configData.deploy = {
    dev: {
        to: '../dev'
    }
}

configData.roadmap.path.push({
    reg: /\/img\/output\/(.*)/i,
    release: '/pkg/images/$1'
});

configData.roadmap.domain = 'http://games.huya.com/h5player/dev';

configData.pack = {
    'pkg/vplayer_v1.css': ['css/index.scss'],
    'pkg/vplayer_v1.js': [
        'lib/hhplayer.min.js',
        'lib/TweenLite.min.js',
        'lib/jquery.resize.min.js',
        'lib/md5.min.js',
        'js/vplayer.js'
    ],
    'pkg/vplayer_taf_v1.js': ['taf/vplayer_taf.js']
};


fis.config.merge(configData);
