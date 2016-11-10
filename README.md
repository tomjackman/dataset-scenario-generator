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
* the dataset itself
* a sha1 of the dataset
* a flag to mimic an offline state for the step
* a flag to state whether or not the step performs an update on the dataset

## Installation
Clone the repo and install dependencies using:

```
npm install
```

Then create a symbolic link:
```
npm link
```

## Usage
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
               "percentageUpdate": 50 }
```
Options
* label - a name for the scenario.
* stepInterval - the time interval between each step in the scenario taking place (in milliseconds). [Default: 5000]
* numOfSteps - the number of steps in the scenario. [Default: 10]
* percentageOnline - the percentage of steps that should be set with an online (network connected) flag. [Default: 100]
* percentageUpdate - the percentage of steps that should perform an update to the dataset. [Default: 20]

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

Sample Output (With 2 steps):

```
{
  "label": "test scenario",
  "stepInterval": 5000,
  "steps": [
    {
      "id": "f43f4ff3f",
      "online": true,
      "sha1": "bf95da4cae3216c876b5298cbab4f9f15505ec8a",
      "dataset_update": false,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Systems Design",
        "title": "Footpath in disrepair",
        "status": "New",
        "startTimestamp": 1478706989091,
        "address": "851 Upham Center",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet."
      }
    },
    {
      "id": "f43f4ff3f",
      "online": true,
      "sha1": "bf95da4cae3216c876b5298cbab4f9f15505ec8a",
      "dataset_update": false,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Systems Design",
        "title": "Footpath in disrepair",
        "status": "New",
        "startTimestamp": 1478706989091,
        "address": "851 Upham Center",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet."
      }
    }
  ]
}
```

### Working With Scenarios

Create a local dataset for the object.
