import "./styles.css";

const rules = {
  recordOfInterestKey: "schema_id",
  typesOfRecords: [
    {
      label: "location",
      fieldsOfInterest: ["location", "for"]
    },
    {
      fieldsOfInterest: ["officer"]
    },
    {
      fieldsOfInterest: ["status"]
    },
    {
      fieldsOfInterest: ["message"]
    },
    {
      fieldsOfInterest: ["bar"]
    }
  ]
};

const data = {
  data: {
    workflows: [
      {
        id: "Uuid(734d3fb8-8826-4aa1-a7e7-d2e05a27a1a1)",
        messages: [
          {
            id:
              "MessageID { node_id: NodeID(12274386502028594595), time: 1634757687227, counter: 1 }",
            msg: {
              id: "Uuid(017c9f26-b7bb-0001-aa57-617db9438da3)",
              workflow_id: "Uuid(734d3fb8-8826-4aa1-a7e7-d2e05a27a1a1)",
              type_id: "Uuid(dfbd7ce9-797e-4335-b3e4-a552ff82eae3)"
            }
          },
          {
            id:
              "MessageID { node_id: NodeID(12274386502028594595), time: 1634757687227, counter: 2 }",
            msg: {
              id: "Uuid(017c9f26-b7bb-0002-aa57-617db9438da3)",
              workflow_id: "Uuid(734d3fb8-8826-4aa1-a7e7-d2e05a27a1a1)",
              user_id: "Uuid(9f68e793-97fc-40f0-b944-53731cbb4c49)",
              node_ids: []
            }
          },
          {
            id:
              "MessageID { node_id: NodeID(12274386502028594595), time: 1634757687230, counter: 3 }",
            msg: {
              id: "Uuid(017c9f26-b7be-0003-aa57-617db9438da3)",
              workflow_id: "Uuid(734d3fb8-8826-4aa1-a7e7-d2e05a27a1a1)",
              scope: "SYSTEM",
              key: "description",
              value: "myrtle beach #1"
            }
          },
          {
            id:
              "MessageID { node_id: NodeID(11426764080594058073), time: 1634757871409, counter: 4 }",
            msg: {
              id: "Uuid(017c9f29-8731-0004-9e94-0563c4007b59)",
              workflow_id: "Uuid(734d3fb8-8826-4aa1-a7e7-d2e05a27a1a1)",
              schema_id: "Uuid(d8be5065-7127-3562-0000-000000000000)",
              location: "(44.0265155, -121.2779022)"
            }
          },
          {
            id:
              "MessageID { node_id: NodeID(11426764080594058073), time: 1634757912743, counter: 5 }",
            msg: {
              id: "Uuid(017c9f2a-28a7-0005-9e94-0563c4007b59)",
              workflow_id: "Uuid(734d3fb8-8826-4aa1-a7e7-d2e05a27a1a1)",
              schema_id: "Uuid(b0fd550d-8195-22b6-0000-000000000000)",
              location: "(44.02650271, -121.27782959)",
              for: "FIRST_RESPONDERS"
            }
          }
        ]
      }
    ]
  }
};

const parse = (data, rules) => {
  const workflows = data.data.workflows;
  const output = [];

  // eg. of what parsedOutput should contain
  const eg = {
    location: {
      time: "123456789",
      location: "230724, 23u802384",
      for: "firetruck"
    },
    officer: "Officer Blue"
    //...
  };

  workflows.forEach((workflow) => {
    const recordsOfInterest = workflow.messages.filter(
      (message) => message.msg[rules.recordOfInterestKey]
    );
    console.log("recordsOfInterest: ", recordsOfInterest);
    recordsOfInterest.forEach((recordMsg) => {
      rules.typesOfRecords.forEach((rule) => {
        let outputObj = null;
        const keys = Object.keys(recordMsg.msg);

        console.log("keys", keys);
        keys.forEach((key) => {
          if (rule.fieldsOfInterest.includes(key)) {
            outputObj = {
              time: recordMsg.id.split("time: ")[1].split(",")[0].trim()
            };
            const label = rule.label || rule.fieldsOfInterest[0];
            const fieldObj = outputObj[label] || {};
            outputObj[label] = fieldObj;
            console.log("recordMsg on match: ", recordMsg.msg[key]);
            if (recordMsg.msg[key]) {
              fieldObj[key] = recordMsg.msg[key];
            }
          }
        });
        output.push(outputObj);
      });
    });
  });

  return output.filter((obj) => !!obj);
};

console.log(parse(data, rules));
