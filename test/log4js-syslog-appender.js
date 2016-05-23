
var should = require('should');
var sandbox = require('sandboxed-module');
var assert = require('assert');


describe('log4js-syslog-appender', function () {

    var messages = [];
    var fakeAin2 = function(){
        this.trace = function (msg) {
            messages.push(msg);
        };
        this.debug = function (msg) {
            messages.push(msg);
        };
        this.info = function (msg) {
            messages.push(msg);
        };
        this.warn = function (msg) {
            messages.push(msg);
        };
        this.error = function (msg) {
            messages.push(msg);
        };
    };

    var clearMessages = function(){
        messages = [];
    };

    var logger;


    before(function (done) {

        delete require.cache['../lib/log4js-syslog-appender.js'];
        delete require.cache['ain2'];
        var appender = sandbox.require('../lib/log4js-syslog-appender.js', {
            requires: {
                'ain2': fakeAin2
            },
            globals: {}
        });

        delete require.cache['log4js'];
        var log4js = require('log4js');

        log4js.clearAppenders();
        log4js.addAppender(appender.configure({}), 'test-logging');
        logger = log4js.getLogger('test-logging');

        done();
    });

    describe('log', function(){

        it('should log a trace message', function(done){
            logger.trace('trace message');
            messages[0].should.equal('trace message');
            clearMessages();
            done();
        });

        it('should log a debug message', function(done){
            logger.debug('debug message');
            messages[0].should.equal('debug message');
            clearMessages();
            done();
        });

        it('should log an info message', function(done){
            logger.info('info message');
            messages[0].should.equal('info message');
            clearMessages();
            done();
        });

        it('should log a warn message', function(done){
            logger.warn('warn message');
            messages[0].should.equal('warn message');
            clearMessages();
            done();
        });

        it('should log an error message', function(done){
            logger.error('error message');
            messages[0].should.equal('error message');
            clearMessages();
            done();
        });

        it('should log a fatal message', function(done){
            logger.fatal('fatal message');
            messages[0].should.equal('fatal message');
            clearMessages();
            done();
        });
    });

});

