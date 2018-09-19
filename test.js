async function TEST() {
    let goneMessage = element(By.cssContainingText('p#message', `It's gone!`))
    let button = $('#checkbox-example button')

    await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
    await browser.get('http://the-internet.herokuapp.com/dynamic_controls') // second optional param - page load timeout
    expect(await goneMessage.isPresent()).toBe(false)
    await button.click()
    await browser.wait(protractor.ExpectedConditions.visibilityOf(goneMessage), 10000)
    expect(await goneMessage.isPresent()).toBe(true)
    console.log('Got text:', await goneMessage.getText())
}

exports.TEST = TEST;

// let repeat = `while true
// do 
//     TESTS_NUM=60 SELENIUM_ADDRESS="http://xotabu4pc:4444/wd/hub" npm test
//     sleep 5
// done`