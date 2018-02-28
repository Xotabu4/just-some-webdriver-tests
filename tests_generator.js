// For testing purposes only
// Automatically synchronically generating needed number of tests
const fs = require('fs');
const path = require('path');

const TESTS_FOLDER = './tests'
const TESTS_TO_GENERATE = process.env.TESTS_NUM || 2

let files = fs.readdirSync(TESTS_FOLDER)
console.log('Cleaning up generated tests ...')
let removedFilesCounter = 0
for (const file of files) {
    if (file == '.gitkeep') continue
    fs.unlinkSync(path.join(TESTS_FOLDER, file))
    removedFilesCounter++
}
console.log('Removed', removedFilesCounter, 'previous test files')

let index = 0
while (index < TESTS_TO_GENERATE) {
    const testFileTemplate =
        `
let TEST = require('../test').TEST
describe('SUITE ${index}', function () {
    it('TEST ' + ${index}, TEST)
})
`
    fs.writeFileSync(`${TESTS_FOLDER}/test_${index}.js`, testFileTemplate, { flag: 'w+' })
    index += 1
}
console.log('Generated', TESTS_TO_GENERATE, 'tests')

