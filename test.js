async function TEST() {
    await browser.waitForAngularEnabled(false);
    await browser.get("/dynamic_controls");
    const goneMessage = element(
        By.cssContainingText("p#message", `It's gone!`)
    );
    expect(await goneMessage.isPresent()).toBe(false);
    await $("#checkbox-example button").click();
    let counter = 0;
    console.log("Starting wait");
    try {
        await browser.wait(async function() {
            try {
                console.log("Iteration number: ", counter);
                counter = counter + 1;
                const res = await goneMessage.isDisplayed();
                return res;
            } catch (err) {
                return false;
            }
        }, 10000);
    } catch (err) {
        console.log("Wait finished due to timeout!");
        console.log(err);
    }
    console.log("Wait finished successfully!");
    expect(await goneMessage.isDisplayed()).toBe(true);
    console.log("Got text:", await goneMessage.getText());
}

exports.TEST = TEST;

await browser.wait(
    // 1 - Condition to wait for
    async function() {
        try {
            const res = await goneMessage.isDisplayed();
            return res;
        } catch (err) {
            return false;
        }
    },
    // 2 - How long to keep asking for condition to became true
    10000,
    // 3 - Error message, in case condition never reached
    `Optional error message instead default WaitTimeout message`
);
