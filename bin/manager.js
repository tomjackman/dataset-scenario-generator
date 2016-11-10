var sha1 = require('sha1');
var winston = require('winston');
var MOCK_DATA = require('../config/mock_data.json');

/**
* Generate a scenario using a set of configuration options.
*
* @param config
* @param config.label - the name of the scenario
* @param config.stepInterval - the interval between performing steps (for updating a dataset)
* @param config.numOfSteps - the number of steps to add to the scenario
* @param config.percentageOnline - the percentage of steps that should be carried out in an 'online' state [0-100]
* @param config.percentageUpdate - the percentage of steps that should carry out updates along with listing/reading [0-100]
* @return {object} - An object containing all the steps for a scenario.
*/
function generateScenario(config) {

  winston.info('Started Generator...');
  winston.info('Specified Configuration:', config);

  var label = config.label || "Untitled Scenario";
  var numOfSteps = config.numOfSteps || 10;
  var stepInterval = config.stepInterval || 5000;
  var percentageOnline = config.percentageOnline || 100;
  var percentageUpdate = config.percentageUpdate || 20;

  var onlineState = false;
  var updateState = false;

  var scenario = {"label": label, "stepInterval": stepInterval, "steps": []};

// updates to the dataset will take place in this scenario
  if (percentageUpdate > 0) {
    for(var i = 0; i < numOfSteps; i++) {
      var step = {};
      // set whether this change will happen when online
      onlineState = getWeightingResult(percentageOnline);
      // set whether this step involves a change to the data set
      updateState = getWeightingResult(percentageUpdate);

      // a change to the dataset will be made on this step
      if (updateState) {
        step = generateStep(onlineState);
      } else if (scenario.steps[i - 1] === undefined) {
        // first step must create a dataset
        step = generateStep(onlineState);
      } else {
        // a step that doesn't perform updates should just use the dataset from the last step (as no updates to the dataeset take place)
        step = scenario.steps[i - 1];
        // this step doesn't perform an update to the dataset
        step.dataset_update = false;
      }
      scenario.steps[i] = step;
    }
  }
  winston.info('Scenario Created with', scenario.steps.length, 'Steps.');
  return scenario;

}

/**
* Generate a step.
* @param {boolean} onlineState - the network state for this step (online/offline)
* @return {object} - the step object
*/
function generateStep(onlineState) {
  // generate a random number between 1 and 100
  var rand = Math.floor((Math.random()*100) + 1);

  // update the dataset
  var dataset = {
    id: "rkX1fdSH",
    workflowId: 'SyVXyMuSr',
    assignee: 'rkX1fdSH',
    type: 'Job Order',
    title: MOCK_DATA[rand].title,
    status: 'New',
    startTimestamp: new Date().getTime(),
    address: MOCK_DATA[rand].address,
    location: [
      49.287227,
      -123.141489
    ],
    summary: MOCK_DATA[rand].summary
  };

  // Get a sha1 hash of the dataset
  var sha1_hash = sha1(JSON.stringify(dataset));

  return {
    "online": onlineState,
    "sha1": sha1_hash,
    "dataset_update": true,
    "dataset": dataset
  };
}

/**
* Get an update/offline state for a step using a specified weighting.
* @param {number} percentage - The percentage threshold
* @return {boolean} - The result for the given state
*/
function getWeightingResult(percentage) {
  percentage = percentage || 0;

  // no updates/offline changes will take place
  if (percentage === 0) {
    return false;
  }

  // generate a random number between 1 and 100
  var rand = Math.floor((Math.random()*100) + 1);

  // if the random number is in the threshold, the state is given a true value, otherwise its false
  if (rand < percentage) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getWeightingResult: getWeightingResult,
  generateStep: generateStep,
  generateScenario: generateScenario
};
