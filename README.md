# just-some-webdriver-tests
Project that just runs specified number of dummy tests.


This project generates specified amount of dummy tests, and triggers them.
Main goal of this project - is to test infrastructure setup, and paralelization.

Test logic itself is located in `./test.js`.

### How to use?
- install nodejs 9.x
- clone repo
- `npm install`

Then most important:
- `TESTS_NUM=2 SELENIUM_ADDRESS="http://localhost:4444/wd/hub" npm test`

Two environment variables supported:

- TESTS_NUM - set this environment variable to generate specific number of tests (2 by default). This value is also used as test threads
- SELENIUM_ADDRESS - your selenoid server URL (or selenium hub). Localhost server is used by default - 'http://localhost:4444/wd/hub'

Test files removed, and regenerated on each `npm test`

I try to calculate approximate number of http requests to server. But lot of requests are not calculated. Actual number will be bigger (x1.5-x2 times)

### Test logic

You can update `test.js` file with any test logic that you want. All generated tests will be the identical (only names differs). All will use same `TEST` function as body.
