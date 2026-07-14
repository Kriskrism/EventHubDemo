# EventHubDemo

# EventHub Test Automation Framework

A scalable end-to-end test automation framework built using **Playwright** and **TypeScript** for testing the EventHub application. The framework supports UI testing, API testing, parallel execution, environment configuration, and detailed reporting.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Allure Reports
- GitHub Actions (CI/CD)

---

## Framework Features

- UI Automation
- API Automation
- Page Object Model (POM)
- Parallel Test Execution
- Environment-specific configuration
- Reusable Fixtures
- Authentication using API
- Automatic Screenshot & Video Capture on Failure
- Trace Viewer Support
- Allure Reporting
- Cross-browser execution
- CI/CD Pipeline Support

---

## Project Structure

```
eventhub/
│
├── tests/
│   ├── ui/
│   └── api/
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── ...
│
├── fixtures/
│   ├── authFixture.ts
│   └── testFixture.ts
│
├── utils/
│   ├── apiHelper.ts
│   ├── constants.ts
│   └── helpers.ts
│
├── test-data/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

- Node.js (v18 or later)
- npm
- Git

Verify installation:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd eventhub
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

Run all tests

```bash
npx playwright test
```

Run UI tests

```bash
npx playwright test tests/ui
```

Run API tests

```bash
npx playwright test tests/api
```

Run a specific test

```bash
npx playwright test tests/ui/login.spec.ts
```

Run tests in headed mode

```bash
npx playwright test --headed
```

Run tests on Chrome only

```bash
npx playwright test --project=chromium
```

Debug tests

```bash
npx playwright test --debug
```

---

## Environment Configuration

Environment-specific values such as:

- Base URL
- API URL
- Credentials
- Tokens

are configured in:

```
playwright.config.ts
```

or environment variables if applicable.

---

## Authentication

The framework authenticates users using API login before executing protected test scenarios.

Authentication tokens are:

- Generated during test execution
- Reused through custom fixtures
- Passed in API request headers

---

## Reporting

Generate Playwright HTML Report

```bash
npx playwright show-report
```

Generate Allure Report

```bash
allure generate ./allure-results --clean -o ./allure-report
```

Open Allure Report

```bash
allure open ./allure-report
```

---

## Screenshots & Videos

On test failure the framework automatically captures:

- Screenshot
- Video
- Trace

Trace Viewer

```bash
npx playwright show-trace trace.zip
```

---

## CI/CD

The project is configured to run automated tests through GitHub Actions.

Typical workflow:

1. Install dependencies
2. Install Playwright browsers
3. Execute tests
4. Publish reports
5. Archive test artifacts

---

## Coding Standards

- Follow the Page Object Model
- Keep locators inside page classes
- Store test data separately
- Avoid hardcoded waits
- Use Playwright auto-wait functionality
- Write independent and reusable tests

---

## Best Practices

- Use meaningful test names
- Reuse fixtures whenever possible
- Keep assertions inside test files
- Handle authentication through API
- Keep test data externalized
- Execute tests in parallel where applicable

---

## Useful Commands

Install dependencies

```bash
npm install
```

Install browsers

```bash
npx playwright install
```

Run all tests

```bash
npx playwright test
```

Run headed

```bash
npx playwright test --headed
```

Generate Allure report

```bash
allure generate ./allure-results --clean -o ./allure-report
```

Open Allure report

```bash
allure open ./allure-report
```

Show Playwright report

```bash
npx playwright show-report
```

---

## Future Enhancements

- Data-driven testing
- Database validation
- Performance testing integration
- Accessibility testing
- Visual regression testing
- Slack/Teams notifications
- Docker support
- Azure DevOps Pipeline integration

---

## Author

**Krishna M**

Senior QA Engineer

---

## License

This project is intended for internal testing and automation purposes.