
console.time('Test run took')
exports.config = {
    seleniumAddress: process.env.SELENOID_URL || 'http://ip-5236.sunline.net.ua:4444/wd/hub',
    baseUrl: 'https://www.thomascook.com/',
    specs: ['./tests/*.js'],
    
    SELENIUM_PROMISE_MANAGER: true,

    // Create new browser session for each test
    restartBrowserBetweenTests: true,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000 * 3 // 3 mins
    },

    capabilities: {
        browserName: 'chrome',
        // enableVNC: true,
        shardTestFiles: true,
        maxInstances: process.env.TESTS_NUM || 2, // Number of test threads
        // name: 'AWS LAMBDA'
    },

    afterLaunch: function (exitCode) {
        console.timeEnd('protractor took')
    }
};

