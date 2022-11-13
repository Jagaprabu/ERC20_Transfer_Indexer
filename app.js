require('dotenv').config()
const mongoose = require('mongoose');

const express = require('express')
const app = express()

const {startEventListener} = require('./services/eventListener/eventListener')


mongoose.connect("mongodb://localhost:27017/Blockchain")
mongoose.set("debug",true)
console.log("DB Connected !!!")

console.log("Event Listener Service Started");
startEventListener();

app.use('/',require('./routers'))

app.listen(3000, function () {
  console.log("App started at port 3000!!");
});