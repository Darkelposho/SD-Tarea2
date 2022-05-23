//Se importan las librerias necesarias
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Kafka } = require("kafkajs");

//Se crea las instancias
const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 8000;
var host = process.env.PORT || '0.0.0.0';
var dict = new Object();
var bloq = new Object();

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});
const topic = "topic-test";
const consumer = kafka.consumer({ groupId: "test-group" });

//Se llama al main
app.get("/", (req, res) => {
  res.send("Mira es más puto!!");
  run();
});


app.get('/blocked', (req, res) => {
    //enviar las llaves de la lista de bloqueados
    res.send(Object.keys(bloq));
  })
  //Se crea el consumer
  const run  = async () => {
    console.log("Entra main")
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log("producer");
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        var user = JSON.parse(message.value.toString());
        //si el usuario esta en la lista de bloqueados
        if(!bloq[user.username]){
            //Si el usuario no existe en el diccionario lo añado
            if(!dict[user.username]){
                dict[user.username] = [user.tiempo];
            }
            //Si el usuario existe en el diccionario añado su tiempo
            else{
              dict[user.username].push(user.tiempo);
            }
        //verifica que el usuario ha realizado 5 intentos en menos de un minuto
        if(dict[user.username].length >= 5 && dict[user.username][dict[user.username].length-1] - dict[user.username][dict[user.username].length-5] < 60){
            console.log("El usuario " + user.username + " ha realizado 5 intentos en menos de un minuto");
            //Añade al usuario a la lista de bloqueados
            bloq[user.username] = true;
            //Bloquea consumidor
        }
        }else{
          //Imprime la lista de bloqueados
          console.log("El usuario " + user.username + " ya esta bloqueado");
        }
      },
    })
  };
  

  //Se crea el puerto
  app.listen(port,host,()=>{
      console.log(`API-Blocked run in: http://localhost:${port}.`)
  });