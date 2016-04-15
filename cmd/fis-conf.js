exports.getConfig = function() {
    return {
        //项目过滤
        project: {
            exclude: [/node_modules\/|\.svn\/|\.git\//i, 'Gruntfile.js', 'package.json', 'docs/**', '**.cmd', '**.sh', '**.md', 'components/**.json', 'cmd/**']
        },
        //fis插件配置
        modules: {
            //编译
            parser: {
                //.tmpl后缀的文件使用fis-parser-utc插件编译
                tmpl: 'utc',
                less: 'less',
                sass: 'node-sass',
                scss: 'node-sass'
            },
            //标准化处理阶段
            postprocessor: {
                js: 'jswrapper, require-async',
                css: 'autoprefixer',
                html: 'require-async'
            },
            //单文件编译过程中的最后阶段，对文件进行优化，默认值 -o
            optimizer: {
                js: 'uglify-js',
                css: 'clean-css',
                png: 'png-compressor'
            },
            postpackager: ['autoload', 'simple'],
            //csssprite合并 ?__sprite
            //spriter:"csssprites"
        },
        roadmap: {
            ext: {
                less: 'css',
                sass: 'css',
                scss: 'css'
            },
            path: [{
                //前端模板
                reg: '**.tmpl',
                //当做类html文件处理，可以识别<img src="xxx"/>等资源定位标识
                isJsLike: true,
                release: false
            }, {
                //css子文件
                reg: /^\/(css\/([^\/]+)\/(.*)\.(css|less|scss|sass))$/i,
                //文件不产出
                release: false
            }, {
                //css文件
                reg: /^\/css\/((.*)\.(css|less|scss|sass))$/i,
                //使用雪碧图
                useSprite: true
            }, {
                //js子文件
                reg: /^\/(js\/([^\/]+)\/(.*)\.js)$/i,
                //文件不产出
                release: false
            }, {
                reg: /^\/(taf\/[Taf|lib](.*)\.js)$/i,
                release: false
            }, {
                reg: 'map.json',
                release: false
            }]
        },
        //插件的配置信息
        settings: {
            optimizer: {
                'uglify-js': {
                    //不压缩变量名
                    mangle: {
                        except: 'exports, module, require, define'
                    },
                    //自动去除console.log等调试信息
                    compress: {
                        drop_console: false
                    }
                },
                'png-compressor': {
                    //pngquant会将所有 png24 的图片压缩为 png8，压缩率极高，但alpha通道信息会有损失。
                    type: 'pngquant' //default is pngcrush
                }
            },
            postprocessor: {
                jswrapper: {
                    template: 'dwfis.define("${id}", function(require, exports, module){\r\n${content}\r\n});'
                },
                autoprefixer: {
                    // detail config (https://github.com/postcss/autoprefixer#browsers)
                    // 这里copy了原来duya目录下的grunt配置，请根据项目需要自行修改
                    browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 8'],
                    cascade: true
                }
            },
            spriter: {
                csssprites: {
                    //开启模板内联css处理,默认关闭
                    //htmlUseSprite: true,
                    //默认针对html原生<style></style>标签内的内容处理。
                    //用户可以通过配置styleTag来扩展要识别的css片段
                    //以下是默认<style></style>标签的匹配正则
                    //styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
                    //默认是3px
                    //margin:5
                    layout: 'matrix'
                }
            },
            postpackager: {
                simple: {
                    autoCombine: true,
                    headTag: '<!--HEAD_END-->',
                    bodyTag: '<!--BODY_END-->'
                }
            }
        }
    }
};
