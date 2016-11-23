[![Known Vulnerabilities](https://snyk.io/test/github/tommyj1994/dataset-scenario-generator/be70b8b9d1fb05986d9bc883735a8cf29b612829/badge.svg)](https://snyk.io/test/github/tommyj1994/dataset-scenario-generator/be70b8b9d1fb05986d9bc883735a8cf29b612829)
# Dataset Scenario Generator
## Description
This tools allows you to create **scenarios** and **steps** for datasets using a set of configuration options. Each scenario contains a list of steps that can perform changes on the dataset over the lifetime of the scenario. Datasets are generated using template schemas defined in `schemas/`. These can be configured to specify exact values for certain key fields, eg id fields, while not so important fields can be assigned randomaly generated values. You can also pass in any metadata you want to a scenario and also for each step in a scenario.

### Scenarios
A scenario has:
* `label` - the name of the scenario
* `numOfSteps` - the number of steps to add to the scenario
* `schema` - the schema to create a dataset upon
* `schemaOptions` - configurations options for the schema
* `metadata` - metadata to give to a scenario

### Steps
Each step has:
* `dataset` - the dataset itself
* `sha1` - a sha1 of the dataset
* `metadata` - metadata to give to a step

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
// choose metadata to apply to the scenario
var scenarioMetadata = {'name': 'Vitali'};

// choose metadata to apply to each step in a scenario
var stepMetadata = {'key': 'Hello World'};

// create your overwrite options for the schema (if any)
var schemaOptions = {id: "abcd1234", workflowId:"5678efgh", assignee: "trever"};

// create config for the generator to run off of
var config = {"label": "test scenario" + Math.random(),
  "stepInterval": 500,
  "numOfSteps": 2,
  "schema": "workorder",
  "schemaOptions": schemaOptions,
  "scenarioMetadata": scenarioMetadata,
  "stepMetadata": stepMetadata};
```

Options
* `label` - a name for the scenario.
* `numOfSteps` - the number of steps in the scenario. [Default: 10]
* `schema` - the dataset scheme to use as defined in `/schemas`. [Default: 20]
* `scenarioMetadata` - the metadata to give to each scenario in object format. [Default: null],
* `stepMetadata` - the metadata to give to each step in a scenario in object format. [Default: null].

Then run the scenario generator using:

```
var scenario = generator.generateScenario(config);
```

And the scenario will be generated:

```
console.log(JSON.stringify(scenario));
```

Sample Output (With 2 steps):

```
{
  "label": "test scenario0.38175405911169946",
  "numOfSteps": 2,
  "scenarioMetadata": {
    "name": "Vitali"
  },
  "schema": "workorder",
  "schemaOptions": {
    "id": "abcd1234",
    "workflowId": "5678efgh",
    "assignee": "trever"
  },
  "steps": [
    {
      "sha1": "13fd878db4ebded0ae13938e0179300d7ba5a845",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "huehwa",
        "status": "New",
        "startTimestamp": "2050-08-27T21:13:51.473Z",
        "address": "1019 Osifu Center",
        "location": [
          -98.4734276,
          63.1620229
        ],
        "summary": "Lom webic ha kopjarew tukesifem bawu la be bukfe vivirpod kubud dugonkib komseene su komonafeg cal capogul juafwu duwuggo vemah ebiz veige wucab foof ru da orjewe ofat ta fewetgu."
      },
      "metadata": {
        "key": "Hello World"
      }
    },
    {
      "sha1": "4adffc5dc3e4456b1f62041f989762df4d7e3190",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "voksanem",
        "status": "New",
        "startTimestamp": "2026-04-24T02:15:57.649Z",
        "address": "1476 Hivo Way",
        "location": [
          136.5620996,
          -8.1675979
        ],
        "summary": "Nenuwna ew juwfav aramaja uga ono neppa gos dero ha idcoz loravgu je ulpamok sereru co ru figenaz nuudrid kiflufi ce cenke guwwifpip ibu gih ul molabse hopoj bucfihef je."
      },
      "metadata": {
        "key": "Hello World"
      }
    }
  ]
}
```

### Creating a Schema for a Dataset
A new schema can be created under the `schemas/` directory.  A sample schema can be seen in `schemas/sample.js`.
Schemas should provide default values for all fields. This will allow you to specify certain fields to have set values, whilst allowing other fields to use randomnly generated values. Data is generated using [Chance.js](http://chancejs.com).
