var winston = require('winston');
var _ = require('underscore');
// hashing of datasets
var sha1 = require('sha1');

/**
* Generate a scenario using a set of configuration options.
* Scenarios will contain a list of steps that can perform operations on a dataset created off of a defined schema.
*
* @param config
* @param config.label - the name of the scenario
* @param config.stepInterval - the interval between performing steps (for updating a dataset)
* @param config.numOfSteps - the number of steps to add to the scenario
* @param config.schema - the schema to create a dataset upon
* @param config.schemaOptions - configurations options for the schema
* @param config.scenarioMetadata - metadata to give to a scenario
* @param config.stepMetadata - metadata to give to each step
* @return {object} - An object containing all the steps for a scenario.
*/
function generateScenario(config) {

  // setup default config values
  _.defaults(config, {label: "Untitled Scenario",
    numOfSteps: 10,
    schema: "workorder",
    schemaOptions: {},
    scenarioMetadata: null,
    stepMetadata: null
  }
  );

  winston.debug('Started Generator...');
  winston.debug('Specified Configuration:', config);

  // create scenario skeleton
  var scenario = {"label": config.label,
    "numOfSteps": config.numOfSteps,
    "metadata": config.scenarioMetadata,
    "schema": config.schema,
    "schemaOptions": config.schemaOptions,
    "steps": []
  };

// updates to the dataset will take place in this scenario
  for(var i = 0; i < config.numOfSteps; i++) {
    var step = generateStep(config.schema, config.schemaOptions);

      // apply any metadata that was specified for each step
    if (config.stepMetadata) {
      step.metadata = config.stepMetadata;
    }

    scenario.steps[i] = step;
  }

  winston.debug('Scenario Created with', scenario.steps.length, 'Steps.');
  return scenario;
}

/**
* Generate a step for a scenario.
* This will update the dataset with a set of generated values.
* Fields passed in using schemaOptions will not be updated.
*
* @param {object} schema - the schema to create a dataset upon
* @param {object} schemaOptions - options to override fields in a dataset with non-changing ones (such as id's)
* @return {object} - the step object
*/
function generateStep(schema, schemaOptions) {

  // update the dataset using new data with the defined scheme
  var schemaPath = '../schemas/' + schema + '.js';
  var generatedDataset = require(schemaPath).getSchema(schemaOptions);

  // Get a sha1 hash of the dataset
  var sha1_hash = sha1(JSON.stringify(generatedDataset));

  return {
    "sha1": sha1_hash,
    "dataset": generatedDataset
  };
}


module.exports = {
  generateStep: generateStep,
  generateScenario: generateScenario
};
