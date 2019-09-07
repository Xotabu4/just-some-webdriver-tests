console.time("Test run took");
exports.config = {
    seleniumAddress:
        process.env.SELENIUM_ADDRESS || "http://localhost:4444/wd/hub",
    baseUrl: "http://the-internet.herokuapp.com",
    specs: ["./tests/*.js"],
    SELENIUM_PROMISE_MANAGER: false,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000 * 3 // 3 mins
    },
    multiCapabilities: [
        {
            browserName: "chrome",
            // enableVNC: true,
            shardTestFiles: false,
            maxInstances: process.env.TESTS_NUM || 1 // Number of test threads
        }
    ],
    onPrepare: async function() {
        await browser.driver
            .manage()
            .window()
            .setSize(1920, 1080);
    },

    afterLaunch: function(exitCode) {
        console.timeEnd("Test run took");
    }
};

// delete video - curl -X DELETE http://localhost:4444/video/116755a6019a5ccf9b227a0861d304e7.mp4

// "operaOptions": {"binary": "/usr/bin/opera"}

//     chromeOptions: {
//         mobileEmulation: {
//             deviceName: "Nexus 5"
//         }
//     },

// enableVideo: true
// videoName: 'my_video.mp4'
