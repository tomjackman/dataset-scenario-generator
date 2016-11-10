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

Sample Output (With 5 steps):

```
{
  "label": "test scenario",
  "stepInterval": 500,
  "numOfSteps": 5,
  "steps": [
    {
      "online": true,
      "sha1": "77fb3ed53482484a12dcfb38168e0e9b84b5c90c",
      "dataset_update": true,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Job Order",
        "title": "XTRACT",
        "status": "New",
        "startTimestamp": 1478786949940,
        "address": "8 Schmedeman Point",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend."
      }
    },
    {
      "online": true,
      "sha1": "77fb3ed53482484a12dcfb38168e0e9b84b5c90c",
      "dataset_update": false,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Job Order",
        "title": "XTRACT",
        "status": "New",
        "startTimestamp": 1478786949940,
        "address": "8 Schmedeman Point",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend."
      }
    },
    {
      "online": false,
      "sha1": "3051332880d73f5017210284980299c5a5848ea8",
      "dataset_update": true,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Job Order",
        "title": "DQL",
        "status": "New",
        "startTimestamp": 1478786949942,
        "address": "39 Hermina Trail",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat."
      }
    },
    {
      "online": false,
      "sha1": "747ca82fde447b63a2fce324c223f2282eebea10",
      "dataset_update": true,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Job Order",
        "title": "Estate Planning",
        "status": "New",
        "startTimestamp": 1478786949943,
        "address": "302 Kinsman Crossing",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
      }
    },
    {
      "online": false,
      "sha1": "747ca82fde447b63a2fce324c223f2282eebea10",
      "dataset_update": false,
      "dataset": {
        "id": "rkX1fdSH",
        "workflowId": "SyVXyMuSr",
        "assignee": "rkX1fdSH",
        "type": "Job Order",
        "title": "Estate Planning",
        "status": "New",
        "startTimestamp": 1478786949943,
        "address": "302 Kinsman Crossing",
        "location": [
          49.287227,
          -123.141489
        ],
        "summary": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
      }
    }
  ]
}
```

### Working With Scenarios

* Create a empty local dataset to be used with sync.
* Generate a scenario.
* Create a function that runs repeatedly on an interval set in the scenario configuration. This will run through the steps in a scenario.
* At each interval step, update the local dataset to the dataset defined in the scenarios step (if `step.dataset_update` is set to `true`).
* Add handling for steps that are done offline by checking if `step.online` is set to `false`.
