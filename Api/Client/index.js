//Se importan las librerias necesarias
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");

//Se crea las instancias
const app = express();
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;
var host = process.env.PORT || '0.0.0.0';

var kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka:9092"],
  });
//Se crea el producer
  app.post("/login", (req, res) => {
    console.log("login");
    (async () => {
        const topic = 'topic-test'
        const producer = kafka.producer();
        await producer.connect();
        const { username, password } = req.body;
        var time = Math.floor(new Date() / 1000);
        let user = {
          username: username,
          password: password,
          tiempo: time.toString()
        }
        await producer.send({
          topic,
          messages: [{ value: JSON.stringify(user) }],
        })
        await producer.disconnect();
        res.send(user);
    })();
  });
  

  app.get("/", (req, res) => {
    res.send("Mira es un puto!!");
  });

  //Se crea el puerto
  app.listen(port,host, () => {
    console.log(`API run in: http://localhost:${port}.`);
  });
