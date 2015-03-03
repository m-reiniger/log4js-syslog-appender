require('should');
require('assert');


describe('log4js-syslog-appender Socket Test', function () {

    var logger;

    before(function (done) {

        delete require.cache['../lib/log4js-syslog-appender.js'];
        delete require.cache['ain2'];
        delete require.cache['log4js'];

        var appender = require('../lib/log4js-syslog-appender.js');
        var log4js = require('log4js');

        log4js.clearAppenders();
        log4js.addAppender(appender.configure(
            {
                tag: "test",
                facility: "local0",
                transport: "socket",
                path: "/dev/log"
            }
        ), 'test-logging');
        logger = log4js.getLogger('test-logging');

        done();
    });

    describe('log', function () {

        it('should log a trace message', function (done) {
            logger.trace('trace message');
            done();
        });

        it('should log a debug message', function (done) {
            logger.debug('debug message');
            done();
        });

        it('should log an info message', function (done) {
            logger.info('info message');
            done();
        });

        it('should log a warn message', function (done) {
            logger.warn('warn message');
            done();
        });

        it('should log an error message', function (done) {
            logger.error('error message');
            done();
        });

        it('should log a fatal message', function (done) {
            logger.fatal('fatal message');
            done();
        });
    });

});

