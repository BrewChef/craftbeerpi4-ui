
const data = {
  "actor": {
    "1": {
      "config": {},
      "id": 1,
      "instance": null,
      "name": "1",
      "type": "DummyActor"
    },
    "2": {
      "config": {},
      "id": 2,
      "instance": null,
      "name": "HEATER1",
      "type": "DummyActor"
    }
  },
  "actor_types": {
    "DummyActor": {
      "actions": [
        {
          "label": "MY ACTION",
          "method": "hello",
          "parameters": {
            "name": {
              "type": "text"
            }
          }
        }
      ],
      "class": null,
      "name": "DummyActor",
      "properties": [
        {
          "configurable": true,
          "default_value": "",
          "description": "",
          "label": "Value1",
          "name": "value1",
          "type": "text"
        }
      ]
    }
  },
  "dashboard": {
    "1": {
      "id": 1,
      "name": "HELLO"
    },
    "2": {
      "id": 2,
      "name": "My New Dashbaord"
    }
  },
  "kettle": {
    "1": {
      "agitator": "3",
      "automatic": null,
      "config": {
        "name": ""
      },
      "heater": "2",
      "id": 1,
      "logic": "t1",
      "name": "MashTun",
      "sensor": "1",
      "target_temp": null
    },
    "2": {
      "agitator": "3",
      "automatic": null,
      "config": {
        "p1": "",
        "p2": "",
        "p3": "",
        "www": ""
      },
      "heater": "2",
      "id": 2,
      "logic": "t2",
      "name": "Hot Liqour Tank",
      "sensor": "2",
      "target_temp": null
    }
  },
  "parameter": {
    "NAME": {
      "description": "non",
      "name": "NAME",
      "options": {},
      "type": "text",
      "value": "WEB DE"
    },
    "PARAM2": {
      "description": "non",
      "name": "PARAM2",
      "options": {},
      "type": "text",
      "value": "TEST HALLO"
    },
    "SELECT_PARAM": {
      "description": "wooohhoo",
      "name": "SELECT_PARAM",
      "options": [
        {
          "label": "YES",
          "value": 1
        },
        {
          "label": "NO",
          "value": 0
        }
      ],
      "type": "select",
      "value": "1"
    }
  },
  "sensor": {
    "1": {
      "config": {},
      "id": 1,
      "name": "111",
      "type": "DummySensor"
    },
    "2": {
      "config": {},
      "id": 2,
      "name": "Sensor2",
      "type": "DummySensor"
    }
  },
  "sensor_types": {
    "DummySensor": {
      "actions": [],
      "class": null,
      "name": "DummySensor",
      "properties": []
    }
  },
  "tank": {
    "1": {
      "brewname": null,
      "config": null,
      "cooler": "2",
      "heater": "2",
      "id": 1,
      "logic": null,
      "name": "HALLO",
      "sensor": "1",
      "sensor2": "1",
      "sensor3": "1",
      "target_temp": null
    }
  }
}

export default  data