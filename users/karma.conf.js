// Karma configuration
// Generated on Mon Apr 14 2014 14:53:17 GMT-0300 (ART)

module.exports = function(config) {
    config.set({
        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: './',

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: [
            '../common/angular.js',
            '../common/*.js',
            '*.js',
            'tests/*.spec.js'
        ],

        exclude: [
            '../common/prettify.js'
        ],
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher'],

        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use.
         */
        port: 9876,
        runnerPort: 9101,
        urlRoot: '/',

        autoWatch: true,
        singleRun: false,

        browsers: [
            'PhantomJS'
        ]
    });
};