var should = require('should');
var sandbox = require('sandboxed-module');
var assert = require('assert');
var log4js = require('log4js');


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

    var appender = sandbox.require('../lib/log4js-syslog-appender.js', {
        requires: {
            'ain2': fakeAin2
        },
        globals: {}
    });


    log4js.clearAppenders();
    log4js.addAppender(appender.configure({}), 'test-logging');
    var logger = log4js.getLogger('test-logging');


    before(function (done) {
        done();
    });

    describe('log', function(){

        it('should log a trace message', function(done){
            logger.trace('trace message');
            messages[0].should.equal('[TRACE] - trace message');
            clearMessages();
            done();
        });

        it('should log a debug message', function(done){
            logger.debug('debug message');
            messages[0].should.equal('[DEBUG] - debug message');
            clearMessages();
            done();
        });

        it('should log an info message', function(done){
            logger.info('info message');
            messages[0].should.equal('[INFO] - info message');
            clearMessages();
            done();
        });

        it('should log a warn message', function(done){
            logger.warn('warn message');
            messages[0].should.equal('[WARN] - warn message');
            clearMessages();
            done();
        });

        it('should log an error message', function(done){
            logger.error('error message');
            messages[0].should.equal('[ERROR] - error message');
            clearMessages();
            done();
        });

        it('should log a fatal message', function(done){
            logger.fatal('fatal message');
            messages[0].should.equal('[FATAL] - fatal message');
            clearMessages();
            done();
        });
    });

});

