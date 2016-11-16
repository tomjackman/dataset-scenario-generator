// mock data generator
var Chance = require('chance');
var chance = new Chance();

/**
* A sample schema.
* A fallback to generated values will occur if no options are provided.
*
* @param {object} options - options to override fields in a dataset with non-changing ones (such as id's)
* @return {object} - the generated dataset based on the schema
*/
function getSchema(options) {
  return {
    id: options.id || chance.hash({length: 8}),
    title: options.title || chance.word(),
    status: options.status || chance.weighted(['New'], [10]),
    startTimestamp: options.startTimestamp || chance.date()
  };
}

module.exports = {
  getSchema: getSchema
};
