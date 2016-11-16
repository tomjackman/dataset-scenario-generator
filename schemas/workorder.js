// mock data generator
var Chance = require('chance');
var chance = new Chance();

/**
* A schema for a workorder.
* A fallback to generated values will occur if no options are provided.
*
* @param {object} options - options to override fields in a dataset with non-changing ones (such as id's)
* @return {object} - the generated dataset based on the schema
*/
function getSchema(options) {
  return {
    id: options.id || chance.hash({length: 8}),
    workflowId: options.workflowId || chance.hash({length: 8}),
    assignee: options.assignee || chance.hash({length: 8}),
    type: options.type || chance.weighted(['Job Order'], [10]),
    title: options.title || chance.word(),
    status: options.status || chance.weighted(['New'], [10]),
    startTimestamp: options.startTimestamp || chance.date(),
    address: options.address || chance.address(),
    location: options.location || [
      chance.longitude({fixed: 7}),
      chance.latitude({fixed: 7})
    ],
    summary: options.summary || chance.sentence({words: 30})
  };
}

module.exports = {
  getSchema: getSchema
};
