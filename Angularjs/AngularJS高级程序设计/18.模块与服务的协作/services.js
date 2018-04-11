// 关于服务：不打破mvc（mvvm）模式，让项目横向发展，让其应用到多个项目中，比如日志
// 在修改日志服务的时候可以不打扰模块的主体部分，很好的分割开了

// Service服务主要是构造器函数，主要其实是为了继承而来的
// 继承的好处当然很多了，避免了代码的冗余什么的，代码复用啊
// 下面的继承方法是错误的示范啊，不太好（方法应该prototype.log;最好不要用new BaseLogger）
function BaseLogger() {
    this.messageCount = 0;
    this.log = function(message) {
        console.log(this.msgType + ': ' + '(LOG + ' + this.messageCount++ + ') ' + message);
    };
}

function DebugLogger() {}
DebugLogger.prototype = new BaseLogger();
DebugLogger.prototype.msgType = 'Debug';

function ErrorLogger() {}
ErrorLogger.prototype = new BaseLogger();
ErrorLogger.prototype.msgType = 'Error';



angular.module('customerService', [])
    .factory('logService', function() { //也可以在function($log)下面使用$log服务
        // 使用Factory服务-----------------------------------------------------------------------
        // var messageCount=0; //证明这个是单例模式
        // return {
        // 	log:function(message){
        // 		console.log('(LOG + ' + messageCount++ +') ' + message);
        // 	}
        // };
        // ------------------------------------------------------------------------------------------
    })
    .service('logService', function() {
        // 使用Service服务(简单)---------------------------------------------------------------------------
        /*this.messageCount=0;
        this.log=function(message){
        	console.log('(LOG + ' + this.messageCount++ +') ' + message);
        };*/
        // 相等于
        /*return {
        	messageCount:0,
        	log:function(message){
        		console.log('(LOG + ' + this.messageCount++ +') ' + message);
        	}*/
        // };

        // ------------------------------------------------------------------------------------------
    })
    // .service('logService',DebugLogger)
    .service('errorService', ErrorLogger)
    .provider('logService', function() {
        // provider主要是为了进行配置而使用的，一般放在config中进行配置
        // 比如我现在需要配置显示打印和显示数目
        var debug = true,
            counter = true;

        return {
            messageCountEnabled: function(setting) {
            	console.log('messageCountEnabled:',setting);
                if (angular.isDefined(setting)) {
                    counter = setting;
                    return this;
                } else {
                    return counter;
                }
            },
            debugEnabled: function(setting) {
                if (angular.isDefined(setting)) {
                    debug = setting;
                    return this;
                } else {
                    return debug;
                }
            },
            // 在controller使用的时候方法都在$get下面
            $get: function() {
                // $get:function($log){ //如果要使用$log需要在这里引用
                return {
                    messageCount: 0,
                    log: function(message) {
                        if (debug) {
                            // 然后在下面用$log替换掉console就可以了
                            console.log('(LOG + ' +
                                (counter ? this.messageCount++ : '') //打上括号比较好，要不然会被最后面当做冒号后面的数据
                                +
                                ') ' + message);
                        }

                    }
                }
            }
        };
    });