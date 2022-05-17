const info = async message => {
  await console.info(message);
}

module.exports = {
  info,
  logTestName: async testName => {
    info(`=====================  Test case: '${await testName}' =====================`);
  },

  logTestEnd: async test => {
    if (await test.passed) {
      info(`***** Test case: '${await test.title}' passed! *****`);
    } else {
      await browser.takeScreenshot();
      await info(`>>>>>>>> TEST FAILED <<<<<<<<`);
    }
  },
  logStep: async stepName => {
    info(`--------==[ [Step]: ${await stepName} ]==--------`);
  },
}
