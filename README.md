[![Known Vulnerabilities](https://snyk.io/test/github/tommyj1994/dataset-scenario-generator/be70b8b9d1fb05986d9bc883735a8cf29b612829/badge.svg)](https://snyk.io/test/github/tommyj1994/dataset-scenario-generator/be70b8b9d1fb05986d9bc883735a8cf29b612829)
# Dataset Scenario Generator
## Description
This tools allows you to create **scenarios** and **steps** for datasets using a set of configuration options. Each scenario contains a list of steps that can perform changes on the dataset over the lifetime of the scenario.

### Scenarios
A scenario has:
* a name
* a list of steps
* a time interval for running through steps

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
var config = { "label": "test scenario",
               "stepInterval": 5000,
               "numOfSteps": 20,
               "percentageOnline": 50,
               "percentageUpdate": 50,
               "schema": "workorder"}
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
      "online": true,
      "sha1": "3af1764f038b4f55aeb0d216f4cab8d8392fe479",
      "dataset_update": true,
      "dataset": {
        "id": "618240ad",
        "workflowId": "350a09c7",
        "assignee": "65440c46",
        "type": "Job Order",
        "title": "hel",
        "status": "New",
        "startTimestamp": "2029-04-01T22:58:55.863Z",
        "address": "126 Jupkeh Place",
        "location": [
          -85.6390012,
          14.0938828
        ],
        "summary": "Difuh baawuci uveomaso ewa igvejded partadni ragowov azjuguz agdat gi gupe orcucsa imoruesu go vim unu jar cup oftu kah fev lac tezvog kucjeham dako se gupmunhad neumo lolihfa buvesafof."
      }
    },
    {
      "online": true,
      "sha1": "3af1764f038b4f55aeb0d216f4cab8d8392fe479",
      "dataset_update": false,
      "dataset": {
        "id": "618240ad",
        "workflowId": "350a09c7",
        "assignee": "65440c46",
        "type": "Job Order",
        "title": "hel",
        "status": "New",
        "startTimestamp": "2029-04-01T22:58:55.863Z",
        "address": "126 Jupkeh Place",
        "location": [
          -85.6390012,
          14.0938828
        ],
        "summary": "Difuh baawuci uveomaso ewa igvejded partadni ragowov azjuguz agdat gi gupe orcucsa imoruesu go vim unu jar cup oftu kah fev lac tezvog kucjeham dako se gupmunhad neumo lolihfa buvesafof."
      }
    },
    {
      "online": false,
      "sha1": "ee110ae5a51aba8df4c36e7f75aab3daa2062a77",
      "dataset_update": true,
      "dataset": {
        "id": "c7f9977c",
        "workflowId": "c4f47267",
        "assignee": "03bebade",
        "type": "Job Order",
        "title": "humewa",
        "status": "New",
        "startTimestamp": "2093-09-27T07:46:08.918Z",
        "address": "532 Rulaz Boulevard",
        "location": [
          -141.5284867,
          -42.4719954
        ],
        "summary": "Gahnad zo ukose pifop ziapcel fafne vos amoko jos dulob nihif oj ciban afuva tubevel wa reh witmiat ojumepi ku cuw sijpop owa pe debudgi afmo ge volacuab wewgandif ak."
      }
    },
    {
      "online": false,
      "sha1": "a11516e8239c4a0f444fd1b573d9f164f93c04af",
      "dataset_update": true,
      "dataset": {
        "id": "5ee9dfc9",
        "workflowId": "1097737a",
        "assignee": "a4819573",
        "type": "Job Order",
        "title": "akorin",
        "status": "New",
        "startTimestamp": "2051-01-09T06:36:18.819Z",
        "address": "82 Soak Loop",
        "location": [
          -144.798206,
          -47.7751872
        ],
        "summary": "Himmetal walow rafaded awoavih luwozo sudaom pamob zueru ta ifi wagterduh robbi fomez rec gen nu voak daonze onuwe fuwetu et dueme jezsucif pinub kid minse cipmaw sig udnid ace."
      }
    },
    {
      "online": false,
      "sha1": "a11516e8239c4a0f444fd1b573d9f164f93c04af",
      "dataset_update": false,
      "dataset": {
        "id": "5ee9dfc9",
        "workflowId": "1097737a",
        "assignee": "a4819573",
        "type": "Job Order",
        "title": "akorin",
        "status": "New",
        "startTimestamp": "2051-01-09T06:36:18.819Z",
        "address": "82 Soak Loop",
        "location": [
          -144.798206,
          -47.7751872
        ],
        "summary": "Himmetal walow rafaded awoavih luwozo sudaom pamob zueru ta ifi wagterduh robbi fomez rec gen nu voak daonze onuwe fuwetu et dueme jezsucif pinub kid minse cipmaw sig udnid ace."
      }
    }
  ],
  "schema": "workorder"
}
```

### Working With Scenarios

* Create a empty local dataset to be used with sync.
* Generate a scenario.
* Create a function that runs repeatedly on an interval set in the scenario configuration. This will run through the steps in a scenario.
* At each interval step, update the local dataset to the dataset defined in the scenarios step (if `step.dataset_update` is set to `true`).
* Add handling for steps that are done offline by checking if `step.online` is set to `false`.
