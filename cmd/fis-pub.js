var configData = require('./fis-conf').getConfig();

//发布目录
configData.deploy = {
    pub: {
        to: '../dist'
    }
}

var optimizer = configData.settings.optimizer;
optimizer['uglify-js'].compress = {
    dead_code: true,
    drop_console: true,
    drop_debugger: true
}

configData.roadmap.path.push({
    reg: /\/img\/output\/(.*)/i,
    release: 'images/$1'
});

configData.roadmap.domain = 'http://a.dwstatic.com/huya/h5player';

configData.pack = {
    'vplayer.css': ['css/index.scss'],
    'vplayer.js': [
        'lib/hhplayer.min.js',
        'lib/TweenLite.min.js',
        'lib/jquery.resize.min.js',
        'lib/md5.min.js',
        'js/vplayer.js'
    ],
    'vplayer_taf.js': ['taf/vplayer_taf.js']
};


fis.config.merge(configData);
