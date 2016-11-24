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

// choose metadata to apply to each step in a scenario as strings or chance.js expressions.
var stepMetadata = [{"name": "chance.name()"},
  {"gender": "chance.gender()"},
  {"age": "chance.age()"},
  {"website": "chance.url()"},
  {"online": "chance.weighted(['true', 'false'], [3, 1])"}, // generate a true/false value for an online state with weighting 3 to 1.
  {"location": "Ireland"}];

// create your overwrite options for the schema (if any)
var schemaOptions = {id: "abcd1234", workflowId:"5678efgh", assignee: "trever"};

// create config for the generator to run off of
var config = {"label": "test scenario" + Math.random(),
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

Sample Output (With 5 steps):

```
{
  "label": "test scenario0.6107732157688588",
  "numOfSteps": 5,
  "metadata": {
    "name": "2765278b"
  },
  "schema": "workorder",
  "schemaOptions": {
    "id": "abcd1234",
    "workflowId": "5678efgh",
    "assignee": "trever"
  },
  "steps": [
    {
      "sha1": "8cf89eb24a1b970e5759c994046604bef4b3cf4a",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "fifvak",
        "status": "New",
        "startTimestamp": "2099-10-09T19:43:22.135Z",
        "address": "1055 Ocza View",
        "location": [
          -43.6389477,
          45.3338793
        ],
        "summary": "Uzejlaw bar gempi sevaj ket ceh obselvuz di me zeaj muvomiw deboned aki ulaj cenif nocihcew rocvas wen wuvvomhi fum ubihujdaw niuso datunif iho kape mub naviskeg ewiussew bosvu riulno."
      },
      "metadata": [
        {
          "name": "Marc Pena"
        },
        {
          "gender": "Female"
        },
        {
          "age": 64
        },
        {
          "website": "http://bak.nr/hogaho"
        },
        {
          "online": "false"
        },
        {
          "location": "Ireland"
        }
      ]
    },
    {
      "sha1": "849a0182fee9b76445d5c6c7b541090d27dd403b",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "jada",
        "status": "New",
        "startTimestamp": "2038-09-21T09:26:37.033Z",
        "address": "109 Ahibup Manor",
        "location": [
          44.0001227,
          76.2673175
        ],
        "summary": "Serovus tukuba enera wefwe oliici tosiwe hotut danofjek pilrukike poammiz zeto vu ovukasenu gajuko tiropaj ecfeweg garver giawe vaepduw ad arusovfuc kiltilaz wi cuzis jopodi nev lehe ahdo nabge irmiso."
      },
      "metadata": [
        {
          "name": "Mina Marshall"
        },
        {
          "gender": "Female"
        },
        {
          "age": 37
        },
        {
          "website": "http://bicetar.kg/sidnen"
        },
        {
          "online": "true"
        },
        {
          "location": "Ireland"
        }
      ]
    },
    {
      "sha1": "d57dba97eae5190661177c206d49fb5cfcc12fc8",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "vupcutat",
        "status": "New",
        "startTimestamp": "2094-04-19T02:24:12.561Z",
        "address": "687 Werso Glen",
        "location": [
          178.8252358,
          -27.5852798
        ],
        "summary": "Po bof sodut cokesul powo hohkun ij jovtil bosuzoz rustul jic ubosiw feb bu wulwuzpeb nur jufe oc jebce keh amuse ev ipo ke uhmiva fojdunuz ko vug de rudfusdi."
      },
      "metadata": [
        {
          "name": "Edwin Lucas"
        },
        {
          "gender": "Male"
        },
        {
          "age": 44
        },
        {
          "website": "http://jesap.net/omavow"
        },
        {
          "online": "true"
        },
        {
          "location": "Ireland"
        }
      ]
    },
    {
      "sha1": "29205653b9745bad3c195422badbbb428d8b6407",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "la",
        "status": "New",
        "startTimestamp": "2049-12-15T03:01:24.323Z",
        "address": "576 Nogmov Circle",
        "location": [
          -71.4454799,
          -55.2485873
        ],
        "summary": "Lupjaege tupoovo ecdis neebohos sid sunefpo or safug fewibe vi vahoguce vecpowu aspamsa wili votoguj wuk suj rot usvepuz ka fozpa veeso sidwok ezgo ne hedekih gupsijnaz gi ku luntiral."
      },
      "metadata": [
        {
          "name": "Roxie Moody"
        },
        {
          "gender": "Male"
        },
        {
          "age": 41
        },
        {
          "website": "http://pasotha.pe/mov"
        },
        {
          "online": "true"
        },
        {
          "location": "Ireland"
        }
      ]
    },
    {
      "sha1": "85fc75b0cfb0ff9b6d8b233cc934c64a20c9a0c2",
      "dataset": {
        "id": "abcd1234",
        "workflowId": "5678efgh",
        "assignee": "trever",
        "type": "Job Order",
        "title": "jez",
        "status": "New",
        "startTimestamp": "2098-11-01T09:20:01.730Z",
        "address": "1413 Tadcu Ridge",
        "location": [
          148.8799697,
          27.6835414
        ],
        "summary": "Apveibu nicadu imospi calej caliv ligup kej viz je jibtabpof hu geri bibmivuna ber ku evuha pobo mafcu pujjewa locti ezoza ajikafijo mudim ri puwe ifa fuk puswolew saigi pugipupim."
      },
      "metadata": [
        {
          "name": "Jacob Ruiz"
        },
        {
          "gender": "Female"
        },
        {
          "age": 53
        },
        {
          "website": "http://he.rs/fid"
        },
        {
          "online": "true"
        },
        {
          "location": "Ireland"
        }
      ]
    }
  ]
}
```

### Creating a Schema for a Dataset
A new schema can be created under the `schemas/` directory.  A sample schema can be seen in `schemas/sample.js`.
Schemas should provide default values for all fields. This will allow you to specify certain fields to have set values, whilst allowing other fields to use randomnly generated values. Data is generated using [Chance.js](http://chancejs.com).
