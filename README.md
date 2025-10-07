# TechnicalAssessmentPlaywrightTSJS - Remy Miller

Task: Test Automation Playwright Js Challenge - Create a simple Playwright JS test framework demonstrating UI and API test automation skills.

This project does have a CI/CD pipeline setup thatt runs on a schedule daily using GitHub Actions. Every single deliverable and request has been met.

This task has been split into 2 sections: UI and API. Below I will guide you on how to complete the Setup and how to execute the Test Cases along with reviewing its evidence.

Setup:

1. Create a folder on your local machine to clone the repository into
2. Open the terminal in the folder or cd into the folder and use the git command 'git clone' followed by the link to clone the repository - 'https://github.com/Remy-Miller/TechnicalAssessmentPlaywrightTSJS.git'
   i.e git clone https://github.com/Remy-Miller/TechnicalAssessmentPlaywrightTSJS.git
3. The Repository has been cloned to your local machine.
4. In the IDE of your choice open the project/folder. I recommend using Visual Studio Code as your IDE.
5. Once the project is open within your IDE, open a terminal to run the following commands:
   - npm ci
   - npx playwright install
     if you are struggling to install; the 2 above commands then then rather use: - npm ci --force - npx playwright install --with-deps --force
     to verify playwright is ready to use run the following command and verify that a version number is returned:
   - npx playwright --version
6. The framework is ready to use and execute tests

API Testing Execution:

1. Navigate to your project, open a new terminal and cd into the project folder if you are not in there already.
2. enter the following command:
   - npm run APITests
3. The API Test cases will be executed.
4. Once the API Test case are finished executing, run the following command:
   - npm run ShowMonocartReport
5. A new tab will open on your default browser with the Monocart Report available to review the execution.
6. Evidence of the execution can be found in the following path:
   - 'Evidence/Year/Month/Day/API_E2E_Test_Timestamp.txt' file

UI Testing Execution:

1. Navigate to your project, open a new terminal and cd into the project folder if you are not in there already.
2. enter the following command:
   - npm run UITests
3. The UI Test cases will be executed.
4. Once the UI Test case are finished executing, run the following command:
   - npm run ShowMonocartReport
5. A new tab will open on your default browser with the Monocart Report available to review the execution.
6. Evidence of the execution can be found in each test case on the Monocart Report as a video attachment

If it is not clear how to Setup or Execute Tests then please do reach out to me asap.
