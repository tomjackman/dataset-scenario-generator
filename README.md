[![Known Vulnerabilities](https://snyk.io/test/github/tommyj1994/dataset-scenario-generator/be70b8b9d1fb05986d9bc883735a8cf29b612829/badge.svg)](https://snyk.io/test/github/tommyj1994/dataset-scenario-generator/be70b8b9d1fb05986d9bc883735a8cf29b612829)
# Dataset Scenario Generator
## Description
This tools allows you to create **scenarios** and **steps** for datasets using a set of configuration options. Each scenario contains a list of steps that can perform changes on the dataset over the lifetime of the scenario. Datasets are generated using template schemas defined in `schemas/`. These can be configured to specify exact values for certain key fields, eg id fields, while not so important fields can be assigned randomaly generated values..

### Scenarios
A scenario has:
* label - a name
* steps - a list of steps
* stepInterval - a time interval for running through steps

### Steps
Each step has:
* dataset - the dataset itself
* sha1 - a sha1 of the dataset
* online - a flag to mimic an offline state for the step
* dataset_update - a flag to state whether or not the step performs an update on the dataset

## Installation
Clone the repo and install dependencies using:

```
npm install
```

Then create a symbolic link:
```
npm link
```

## Basic Usage
In your application require the module:

```
var generator = require('dataset-scenario-generator');

```

Then setup the configuration for the generator:
```
// each dataset schema can be assigned a number of non changing fields over the lifetime of a scenario.
var schemaOptions = {id: "abcd1234",
                     workflowId:"5678efgh",
                     assignee: "trever"};

var config = { "label": "test scenario",
               "stepInterval": 5000,
               "numOfSteps": 20,
               "percentageOnline": 50,
               "percentageUpdate": 50,
               "schema": "workorder",
               "schemaOptions": schemaOptions}
```
Options
* label - a name for the scenario.
* stepInterval - the time interval between each step in the scenario taking place (in milliseconds). [Default: 5000]
* numOfSteps - the number of steps in the scenario. [Default: 10]
* percentageOnline - the percentage of steps that should be set with an online (network connected) flag. [Default: 100]
* percentageUpdate - the percentage of steps that should perform an update to the dataset. [Default: 20]
* schema - the dataset scheme to use as defined in `/schemas`. [Default: 20]

An *update* percentage of 20% means that roughly 20% of the steps in the scenario should perform updates on the dataset.

An *online* percentage of 100% means that all of the steps in the scenario should be carried out mimicking an online state.

Then run the scenario generator using:

```
var scenario = generator.generateScenario(config);
```

And the scenario will be generated:

```
console.log(JSON.stringify(scenario));
```

Sample Output (With 5 steps):

```
{
  "label": "test scenario",
  "stepInterval": 500,
  "numOfSteps": 5,
  "steps": [
    {
      "online": false,
      "sha1": "03bc2a55d5fefd0b1fca872d10ecf1684b319914",
      "dataset_update": true,
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "caguke",
        "status": "New",
        "startTimestamp": "2065-04-13T15:51:30.374Z",
        "address": "864 Upihij Pass",
        "location": [
          57.6766859,
          20.3997629
        ],
        "summary": "Zig du fazlazac ori fezva vile nig pevba okbin ez inijefe vuk gitoze enisodu kojih viwlamwic feza moveva reg gitsajep fuwekihe eswu fodrug kozi tasdepdam ros niftatje norbohgu vi co."
      }
    },
    {
      "online": true,
      "sha1": "4c774a8a674a955c0368286cd8ef4dc424d6ca38",
      "dataset_update": true,
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "indetgul",
        "status": "New",
        "startTimestamp": "2055-11-26T12:44:26.017Z",
        "address": "1384 Foppa Parkway",
        "location": [
          100.753955,
          69.0433111
        ],
        "summary": "Roisre bo amocecu savjutul sawho numeer ej tejceh sebeate cu bowosek ewa moge laet sasguosa ed abahiw im udvutpic jellev ammeted po imuso egofa dakor pujgakgem tawrakze jazev dej mom."
      }
    },
    {
      "online": true,
      "sha1": "4c774a8a674a955c0368286cd8ef4dc424d6ca38",
      "dataset_update": false,
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "indetgul",
        "status": "New",
        "startTimestamp": "2055-11-26T12:44:26.017Z",
        "address": "1384 Foppa Parkway",
        "location": [
          100.753955,
          69.0433111
        ],
        "summary": "Roisre bo amocecu savjutul sawho numeer ej tejceh sebeate cu bowosek ewa moge laet sasguosa ed abahiw im udvutpic jellev ammeted po imuso egofa dakor pujgakgem tawrakze jazev dej mom."
      }
    },
    {
      "online": true,
      "sha1": "28057553012605ab7ce3b7c3c96b398be374f496",
      "dataset_update": true,
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "coozali",
        "status": "New",
        "startTimestamp": "2106-02-15T04:17:55.605Z",
        "address": "322 Akifin Path",
        "location": [
          122.6938838,
          54.834368
        ],
        "summary": "Gor ara omwalal ehe atiiwi wavevuod kovihit hawbelhuh ke keebeval mesmap rojimub buuz ido eze gezitum pepfe tethe cu tocona kezugpe vi saodi dug ronu kerez zo illur lur wazjurne."
      }
    },
    {
      "online": false,
      "sha1": "d0b69c0c4e91d419c36ec751ab7192151e689901",
      "dataset_update": true,
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "mimlapa",
        "status": "New",
        "startTimestamp": "2041-06-15T02:59:48.381Z",
        "address": "1632 Lolpa Glen",
        "location": [
          -139.6641065,
          9.5004314
        ],
        "summary": "Ecovidep suso fok kabus dupofop efubaoru kevheici maf fi ezeku we ludi umwe eg omu uv viv sep ho gihow vo capug winsetdo fegvi nezewo wal ha bi cimdow ugwopoki."
      }
    }
  ],
  "schema": "workorder"
}
```

### Creating a Schema for a Dataset
A new schema can be created under the `schemas/` directory.  A sample schema can be seen in `schemas/sample.js`.
Schemas should provide default values for all fields. This will allow you to specify certain fields to have set values, whilst allowing other fields to use randomnly generated values. Data is generated using [Chance.js](http://chancejs.com).

### Working With Scenarios

* Set dataset id to be used with sync which will be store the dataset in localstorage.
* Generate a scenario based off of a schema in `schemas/`.
* Create a function that runs on an interval set in the scenario configuration. This will run through the steps in a scenario.
* At each interval step, update the local dataset in localstorage to the dataset defined in the scenarios step (if `step.dataset_update` is set to `true`).
* Ping the cloud app to state the current step in a scenario.
* On the cloud app, check that the sha1 of the dataset managed by sync is the same as the one stored in the database for that step.
* For each step -> If the step performs a dataset update (`step.dataset_update === true`), then overwrite the local dataset in localstorage with the updates.
* Add handling for offline steps.
