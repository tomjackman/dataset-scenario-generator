var winston = require('winston');
var _ = require('underscore');
var Chance = require('chance');
var chance = new Chance();
// hashing of datasets
var sha1 = require('sha1');

/**
* Generate a scenario using a set of configuration options.
* Scenarios will contain a list of steps that can perform operations on a dataset created off of a defined schema.
*
* @param config
* @param config.label - the name of the scenario
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
    step.metadata = applyStepMetadata(config.stepMetadata);
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

/**
* Apply metadata to a step.
* If chance.js were defined, these will be evaluated and applied in the metadata.
*
* @param {object} stepMetadata - the step metadata to process
* @return {array} - the array of metadata
*/
function applyStepMetadata(stepMetadata) {
  var appliedStepMetadata = [];
  var step;

  // process thorugh the metadata list
  for (var i = 0; i < stepMetadata.length; i++) {
    step = stepMetadata[i];
    var allPropertyNames = Object.keys(step);

    // process through the unknown json object keys
    for (var j = 0; j < allPropertyNames.length; j++) {
      var name = allPropertyNames[j];
      var value = step[name];

      // check if chance expression is given
      if (value.indexOf("chance.") !== -1) {
        winston.debug('Treating', value, 'as chance.js expression');
        try {
          // evaluate the expression as js
          value = eval(value);
        } catch (e) {
          if (e instanceof SyntaxError) {
            winston.error(e.message);
          }
        }
      }
    }
    // apply the metadata (chance.js expression result or not)
    appliedStepMetadata[i] = {};
    appliedStepMetadata[i][name] = value;
  }
  winston.debug('Created Step Metadata', appliedStepMetadata);
  return appliedStepMetadata;
}


module.exports = {
  generateStep: generateStep,
  generateScenario: generateScenario,
  applyStepMetadata: applyStepMetadata,
  chance: chance
};
