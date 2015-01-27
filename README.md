# log4js-syslog-appender

This is a syslog appender for log4js. It is a rewrite of https://www.npmjs.com/package/log4js-node-syslog. It uses ain2 (https://github.com/phuesler/ain) again since node-syslog does not work with the latest versions of node. 

log4js-syslog-appender works with node versions 0.10.x and 0.11.x. 

## Installation

	npm install log4js-syslog-appender --save-dev

## Configuration

In your log4js config you can use the following configuration:

	"appender": {
		"type": "log4js-syslog-appender",
		"tag": "YOUR NODE TAG",
		"facility": "local0",
		"hostname": "localhost",
		"port": 514
    }

Options:

* `tag`: appears in front of your log message in the syslog / default: `log4js`
* `facility`: your syslog facility / default: `local0`
* `hostname`: hostname of your syslog server / default `localhost`
* `port`: port of your syslog server / default `514`

Code example:

	var log4js = require('log4js');

	log4js.configure({
    	appenders: [ 
        { 
            type: 'log4js-syslog-appender', 
            tag: 'My API', 
            facility: 'local0', 
            hostname: 'localhost', 
            port: 514
        }
    ]});

	var logger = log4js.getLogger('log4js-ain2-tester');


	logger.trace('a trace message');
	logger.debug('a debug message');
	logger.info('an info message');
	logger.warn('a warning message');
	logger.error('an error message');
	logger.fatal('a fatal message');


This should produce messages in your syslog similar to this:
	
	Jan 27 17:08:12 2015-01-27T16:08:12.808Z localhost My API[52315]: [WARN] - a warning message
	Jan 27 17:08:12 2015-01-27T16:08:12.808Z localhost My API[52315]: [ERROR] - an error message
	Jan 27 17:08:12 2015-01-27T16:08:12.808Z localhost My API[52315]: [FATAL] - a fatal message
	
Please note! Depending on your syslog setup trace, debug and info might not appear in the syslog.

## Troubleshooting

Please keep in mind, that this module is based on ain2. Ain2 sends messages to the syslog deamon via UDP. Your syslog setup must accept network sockets in order to receive messages. 

For further information see https://github.com/phuesler/ain.

## Development

	npm install
	npm test
