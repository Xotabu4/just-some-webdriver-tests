async function TEST() {
    let goneMessage = element(By.cssContainingText('p#message', `It's gone!`))
    let button = $('button#btn')

    await browser.waitForAngularEnabled(false) // Before navigating to non-angular page
    await browser.get('http://the-internet.herokuapp.com/dynamic_controls') // second optional param - page load timeout
    expect(await goneMessage.isPresent()).toBe(false)
    await button.click()
    await browser.wait(protractor.ExpectedConditions.visibilityOf(goneMessage), 10000)
    expect(await goneMessage.isPresent()).toBe(true)
    console.log('Got text:', await goneMessage.getText())
}

exports.TEST = TEST;