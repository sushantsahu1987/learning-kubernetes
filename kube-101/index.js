const prome = require('appmetrics-prometheus').attach()
const express = require("express");
const bodyParser = require("body-parser");
const health = require("@cloudnative/health-connect");

const healthcheck = new health.HealthChecker();
const pingcheck = new health.PingCheck("www.google.com");
healthcheck.registerReadinessCheck(pingcheck);

let users = require("./data");
let unique_id = users.length;

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/live', health.LivenessEndpoint(healthcheck));
app.use('/ready', health.ReadinessEndpoint(healthcheck));

app.get("/users", (req, resp) => {
  resp.send({ users });
});

app.post("/user", (req, resp) => {
  const {
    user: { id, firstname, lastname, gender },
  } = req.body;
  const usertoupdate = users.find((item) => item.id === id);
  const updateduser = { ...usertoupdate, firstname, lastname, gender };
  const newusers = users.filter((item) => item.id != id);
  users = [...newusers, updateduser];
  resp.send({  user: updateduser });
});

app.put("/user", (req, resp) => {
  const { user } = req.body;
  console.log(user);
  user.id = unique_id++;
  users.push(user);
  resp.send({ user_id:user.id });
});

app.delete("/user/:userid", (req, resp) => {
  const { userid } = req.params;
  const newusers = users.filter((item) => item.id != userid);
  users = newusers;
  resp.send({ id:userid });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
