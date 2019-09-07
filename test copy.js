let WEB_ELEMENT_FUNCTIONS = [
    "click",
    "sendKeys",
    "getTagName",
    "getCssValue",
    "getAttribute",
    "getText",
    "getSize",
    "getLocation",
    "isEnabled",
    "isSelected",
    "submit",
    "clear",
    "isDisplayed",
    "getId",
    "takeScreenshot"
];

async function TEST() {
    const { BaseFragment } = require("protractor-element-extend");
    class ElementDecorator extends BaseFragment {
        constructor(el) {
            super(el);
            console.log("$$ this", Object.getOwnPropertyNames(this));
            console.log(
                "$$ prototype",
                Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            );

            const thisFuncNames = Object.getOwnPropertyNames(this);
            console.log("% % ", thisFuncNames);
            thisFuncNames.forEach(thisFuncName => {
                if (WEB_ELEMENT_FUNCTIONS.includes(thisFuncName)) {
                    console.log(thisFuncName, WEB_ELEMENT_FUNCTIONS.includes(thisFuncName))
                    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this)))[
                        thisFuncName
                    ] = (...args) => {
                        return this.elementArrayFinder_[thisFuncName]
                            .apply(this.elementArrayFinder_, args)
                            .toElementFinder_();
                    };
                    delete this[thisFuncName];
                }
            });

            console.log("$$ this", Object.getOwnPropertyNames(this));
        }

        async click() {
            console.log("Doing OWN click");
            await super.click();
            return "own click works";
        }

        async someOwnFunction() {
            console.log("hello!");
        }
    }

    let goneMessage = element(By.cssContainingText("p#message", `It's gone!`));
    await browser.waitForAngularEnabled(false); // Before navigating to non-angular page
    await browser.get("/dynamic_controls"); // second optional param - page load timeout
    expect(await goneMessage.isPresent()).toBe(false);

    let elem = new ElementDecorator($("#checkbox-example button"));
    // let elem = $("#checkbox-example button")
    console.log("$$ this", Object.getOwnPropertyNames(elem));
    console.log(
        "$$ prototype",
        Object.getOwnPropertyNames(Object.getPrototypeOf(elem))
    );
    elem.someOwnFunction();
    let a = await elem.click();
    expect(a).toEqual("own click works");
    await browser.wait(
        protractor.ExpectedConditions.visibilityOf(goneMessage),
        10000
    );
    expect(await goneMessage.isPresent()).toBe(true);
    console.log("Got text:", await goneMessage.getText());
}

exports.TEST = TEST;

// version 1

// click(...args) {
//     return this.elementArrayFinder_['click'].apply(this.elementArrayFinder_, args).toElementFinder_()
// }

// version 2

// WEB_ELEMENT_FUNCTIONS.forEach((fnName) => {
//     (Object.getPrototypeOf(Object.getPrototypeOf(this)))[fnName] = (...args) => {
//         return (this.elementArrayFinder_)[fnName]
//             .apply(this.elementArrayFinder_, args)
//             .toElementFinder_();
//     };
// });
