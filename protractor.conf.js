
console.time('Test run took')
exports.config = {
    seleniumAddress: process.env.SELENIUM_ADDRESS || 'http://localhost:4444/wd/hub',
    baseUrl: 'https://www.thomascook.com/',
    specs: ['./tests/*.js'],

    SELENIUM_PROMISE_MANAGER: false,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000 * 3 // 3 mins
    },

    capabilities: {
        browserName: 'chrome',
        enableVNC: true,
        shardTestFiles: true,
        maxInstances: process.env.TESTS_NUM || 2, // Number of test threads
        //name: 'Oleksandr Khotemskyi',
        //screenResolution: "2000x1080",
        // enableVideo: true,
        // videoName: 'my_video.mp4'
    },

    // delete video - curl -X DELETE http://localhost:4444/video/116755a6019a5ccf9b227a0861d304e7.mp4

    afterLaunch: function (exitCode) {
        console.timeEnd('protractor took')
    }
};

