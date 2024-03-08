### Prepare the following parameters:

- PARALLEL=3
- RETRY=1
- LOG_LEVEL="log"
- EMULATION="browser"
- UI_AUTOMATION_HOST="localhost"
- UI_AUTOMATION_BROWSER="chromium"
- HEADLESS=false
- SCRIPT_TIMEOUT=60000
- SCREENSHOTS_PATH="./test-results/screenshots/"
- VIDEOS_PATH="./test-results/videos"
- REPORT_PATH="./test-results/reports/"
- REPORT_NAME="Cucumber Playwright Typescript Report"
- REPORT_TITLE="Test Automation with Cucumber and Playwright"
- JSON_REPORT_PATH="./test-results/reports/"
- JSON_REPORT_FILE="./test-results/reports/cucumber-report.json"
- HTML_REPORT_FILE="./test-results/reports/cucumber-report.html"
- PWDEBUG=0
- DEVTOOLS=false
- TEST_EMAIL="enter email"
- TEST_PASSWORD="enter password"
- VAR_LOOKUP_TRIGGER="$."

### Run the following command:

`./run_tests.sh <env> @<tag>`

Example: `./run_tests.sh dev "@dev and not @production"`

### Production Server

`https://hub.testingtalks.com.au`
