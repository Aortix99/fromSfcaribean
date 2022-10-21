// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    var chromeFlags = [
        '--headless', '--remote-debugging-port=9222', '--no-sandbox'
    ];
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'), // NEWLY ADDED
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                timeoutInterval: 60000,
                random: false
            },
            captureConsole: true,
            mocha: {
                bail: true
            }
        },
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' }
            ],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 20000,
        browsers: ['CustomChromeHeadless'],
        singleRun: true,
        restartOnFileChange: true,
        customLaunchers: {
            CustomChrome: {
                base: "Chrome",
                flags: chromeFlags
            },
            CustomChromeHeadless: {
                base: "ChromeHeadless",
                flags: chromeFlags
            }
        }
    });
};