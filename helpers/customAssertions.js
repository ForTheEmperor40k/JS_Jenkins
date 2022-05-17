import { get } from 'lodash'

function open(client, chai, utils) {
  chai.Assertion.addProperty('open', function() {
    const page = utils.flag(this, 'object');
    const negate = utils.flag(this, 'negate');
    const identifier = $(page.identifier);
    identifier.waitForDisplayed(60000);
    if (negate) {
      expect(identifier.isDisplayed()).to.be.false;
    } else {
      expect(identifier.isDisplayed()).to.be.true;
    }
  })
}

function elementsCount(client, chai, utils) {
  chai.Assertion.addMethod('elementsCount', function(expectedCount) {
    const elements = utils.flag(this, 'object');

    expect(get(elements, 'selector')).to.have.count(expectedCount);
  })
}

export default function(client) {
  return function chaiPageObjects(chai, utils) {
    let methodsToAdd = [open, elementsCount]

    methodsToAdd.forEach(function(methodToAdd) {
      methodToAdd(client, chai, utils)
    })
  }
}
