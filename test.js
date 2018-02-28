let WAIT_TIMEOUT = 10000 // ms

function TEST() {
    let counter = 0
    let count = () => {
        counter++
    }

    browser.get('/').then(count)

    // Promo appears randomly
    let promo = $('[id*="promo-lightbox"] span[class*="close-on-click"]')
    browser.wait(protractor.ExpectedConditions.visibilityOf(promo), 1500)
        .then(()=> promo.click(), err => { /* nothing to do, promo not appear*/})

    // Just to make more dummy calls
    $$('div').each(div => {
        div.getAttribute('class').then(count)
    })

    $('#SearchbarForm-submitBtn').click().then(count)

    function waitResultsWithCounter() {
        count()
        return $$('article.PackageCard').count().then(packages => packages == 10)
    }

    console.time('wait for results took')
    return browser.wait(waitResultsWithCounter, WAIT_TIMEOUT).then(() => {
        console.timeEnd('wait for results took')
        console.log('Did at least', counter, 'requests to browser')
    })
}

exports.TEST = TEST;