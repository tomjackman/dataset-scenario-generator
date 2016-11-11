var _ = require('underscore');
// mock data generator
var Chance = require('chance');
var chance = new Chance();

// sample schema
function getSchema(options) {

  // fallback to generated values if no options are passed in via parameters
  _.defaults(options, {
    id: chance.hash({length: 8}),
    title: chance.word(),
    status: chance.weighted(['New'], [10]),
    startTimestamp: chance.date()
  }
  );

  return {
    id: options.id,
    title: options.title,
    status: options.status,
    startTimestamp: options.startTimestamp
  };
}

module.exports = {
  getSchema: getSchema
};
