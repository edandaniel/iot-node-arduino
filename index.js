var express = require("express");
var app = express();

var five = require("johnny-five");
var mqtt = require('mqtt')
// var client = mqtt.connect("mqtt://10.3.8.37")

var board = new five.Board({'port':'COM3'});

var led;
var led_status;

board.on("ready", function() {
  led = new five.Led(11)
});


app.put('/led/on',(req,res)=>{
  led_status = true;
  led.stop();
  //led.on();
  led.fadeIn();
  res.send('led alighted');
});

app.put('/led/off',(req,res)=>{
  led_status = false;
  led.stop();
  //led.off();
  led.fadeOut();
  res.send('led is ded');
});

app.get('/led/status',(req,res)=>{
  res.send({"led_status":led_status})
})

app.put('/led/blink',(req,res)=>{
  led.blink(500);
  res.send('led is blinked');
});

app.listen(3000,()=>{
  console.log('LISTENING ON THE PORT 3000');
});