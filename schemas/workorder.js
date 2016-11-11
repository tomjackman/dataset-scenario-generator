var Chance = require('chance');
var chance = new Chance();
var _ = require('underscore');

// workorder schema
function getSchema(options) {

  // fallback to generated values if no options are provided
  _.defaults(options, {id: chance.hash({length: 8}),
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
  }
  );

  return {
    id: options.id,
    workflowId: options.workflowId,
    assignee: options.assignee,
    type: options.type,
    title: options.title,
    status: options.status,
    startTimestamp: options.startTimestamp,
    address: options.address,
    location: options.location,
    summary: options.sumamry
  };
}

module.exports = {
  getSchema: getSchema
};
