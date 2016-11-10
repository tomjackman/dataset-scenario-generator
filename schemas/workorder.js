var Chance = require('chance');
var chance = new Chance();

// workorder schema
function getSchema() {
  return {
    id: chance.hash({length: 8}),
    workflowId: chance.hash({length: 8}),
    assignee: chance.hash({length: 8}),
    type: chance.weighted(['Job Order'], [10]),
    title: chance.word(),
    status: chance.weighted(['New'], [10]),
    startTimestamp: chance.date(),
    address: chance.address(),
    location: [
      chance.longitude({fixed: 7}),
      chance.latitude({fixed: 7})
    ],
    summary: chance.sentence({words: 30})
  };
}

module.exports = {
  getSchema: getSchema
};
