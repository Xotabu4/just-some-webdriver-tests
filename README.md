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
- `TESTS_NUM=10 SELENOID_URL="http://ip-5236.sunline.net.ua:4444/wd/hub" npm test`

Two environment variables supported:

- TESTS_NUM - set this environment variable to generate specific number of tests (10 by default). This value is also used as test threads
- SELENOID_URL - your selenoid server URL (or selenium hub). My own selenoid server is used by default - 'http://ip-5236.sunline.net.ua:4444/wd/hub'

Test files removed, and regenerated on each `npm test`
