const info = async message => {
  await console.info(message);
}

module.exports = {
  info,
  logTestName: testName => {
    info(`=====================  Test case: '${testName}' =====================`);
  },

  logTestEnd: test => {
    if (test.passed) {
      info(`***** Test case: '${test.title}' passed! *****`);
    } else {
      info(`>>>>>>>> TEST FAILED <<<<<<<<`);
    }
  },
  logStep: stepName => {
    info(`--------==[ [Step]: ${stepName} ]==--------`);
  },
}
