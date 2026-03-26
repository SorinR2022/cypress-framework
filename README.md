
# Cypress Automation Framework

A scalable, environment-aware E2E automation suite for SauceDemo and ReqRes API.

## Quick Start

1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Create your local configuration:**
    > **Note:** The file `cypress/config/local.json` is **not included** in this repository for security reasons. You must create it manually before running tests.

        **Steps to create `local.json`:**
        1. In your project, navigate to the `cypress/config/` directory.
        2. Create a new file named `local.json`.
        3. Add the following content, updating the values as needed:
                ```json
                {
                    "baseUrl": "https://www.saucedemo.com",
                    "username": "standard_user",
                    "password": "secret_sauce",
                    "reqresApiKey": "<your_reqres_api_key_here>"
                }
                ```
        - The `reqresApiKey` field is required for API tests using ReqRes. Replace `<your_reqres_api_key_here>` with your actual API key.

3. **Run tests:**
    - Headless mode: `npm run cy:run`
    - Interactive mode: `npm run cy:open`
   


## Engineering Reflection

**Scaling to 300+ tests**
To scale a suite of this size, implement parallelization via Cypress Cloud or a specialized CI orchestrator to minimize execution time. Architecturally, move toward a Component/Atomic design pattern for Page Objects to avoid large, unmaintainable classes. Implement Metadata Tagging (e.g., @smoke, @regression) using cypress-grep for targeted execution. Utilize API-driven state injection to bypass the UI for non-authentication tests, significantly reducing cumulative runtime.

**Reducing and monitoring flakiness in CI**
Flakiness is addressed by enforcing a strict "No-Fixed-Wait" policy, relying solely on cy.intercept() or explicit element visibility guards. Test Retries (configured to 2 in this project) catch intermittent environmental issues. To monitor stability over time, integrate a dashboard (like Cypress Cloud or Allure) to identify and quarantine unstable specs before they impact the main deployment pipeline.

**Test strategy for Pull Requests vs. Nightly runs**
On every Pull Request, execute a Smoke Suite (critical path tests like login, add-to-cart, and core API health) for immediate developer feedback. Nightly runs include the Full Regression Suite, covering edge cases, deep UI validations, and comprehensive API schema testing. Nightly runs are also the ideal time for time-intensive tasks like Visual Regression testing.


## Project Structure

- `cypress/e2e/`: Categorized test specs (UI, API, Network)
- `cypress/support/pages/`: Page Objects utilizing stable data-test selectors
- `cypress/config/`: Environment-specific JSON profiles
- `cypress/support/commands/`: Custom abstractions for reusable flows (e.g., authentication)

## Security & Secrets Management


**For this technical assessment:**
- The ReqRes API Key must be provided in your `cypress/config/local.json` file (see Quick Start above) to ensure the suite is plug-and-play for the reviewer. This allows API tests to run locally without additional setup.

**In a production environment:**
- API keys and secrets (including `reqresApiKey`) must never be committed to version control or hardcoded in config files.
- Secrets should be injected at runtime via CI/CD environment variables (e.g., GitHub Secrets, AWS Secrets Manager) or a secure secrets management solution.
- All sensitive values should be managed securely and never exposed in the repository or logs.



