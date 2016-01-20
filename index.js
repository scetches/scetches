'use strict'

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const stepsTillStale = 1000;
const filter = {};
let id = 0;
let rooms = {};

server.listen(8080);

app.use(express.static('public'));

io.on('connection', function ioOnConnection (socket){
  console.log('Connection');

  socket.on('join', function socketOnJoin (value, callback){
    socket.join(value.roomName);
    rooms[value.roomName] = rooms[value.roomName] || new Room(value.roomName);
    socket.emit('roomSync', {roomName: value.roomName, roomWidth: rooms[value.roomName].roomWidth, roomHeight: rooms[value.roomName].roomHeight, layers: rooms[value.roomName].layersToObject()})
  });

  socket.on('desync', function socketOnDesync (data, callback){
      let layer = rooms[data.roomName].layers[data.layerId];
      callback(layer.toObject);
  });

  socket.on('addLayer', function socketOnAddLayer (data){
    console.log(data);
    let layer = rooms[data.roomName].addLayer();
    io.to(data.roomName).emit('addLayer', {layerId: layer.layerId});
  });

  socket.on('removeLayer', function socketOnRemoveLayer (data){
    rooms[data.roomName].removeLayer(data.layerId);
    io.to(data.roomName).emit('removeLayer', {layerId: data.layerId});
  });

  /*On step receipt, assign step an ID and give it back to client through
  the callback and emit the step to the rest of the room*/
  socket.on('step', function socketOnStep(data, callback) {
    let layer = rooms[data.roomName].layers[data.layerId];
    data.stepId = layer.addStep(data);
    socket.to(data.roomName).emit('step', data);
    callback(data.stepId);
    if(layer.isStale()){
      //SYNC!
      console.log('sync')
      layer.received = false;
      layer.busy = true;
      layer.timeout = setTimeout(function layerTimeout() {
        layer.received = false;
        layer.busy = false;
      }, 10000);
      io.to(data.roomName).emit('requestSync', {layerId: layer.layerId, roomName: data.roomName});
    }
  });

  /*SYNCING!*/
  socket.on('syncCheck', function socketOnSyncCheck(data) {
    let layer = rooms[data.roomName].layers[data.layerId];
    if(!layer.received){
      layer.received = true;
      clearTimeout(layer.timeout);
      socket.emit('syncSuccess', data, function socketEmitSyncSuccessCallback(data) {
        console.log('sync success');
        layer.busy = false;
        layer.updateData(data.lastId, data.dataURL);
      });
    }
  });

});

filter.lowerThan = function lowerThan (curryValue){
  return function lowerThanCurry(value){
    return curryValue < value;
  }
}

class Layer{
  constructor(layerId){
    this.layerId = layerId;
    this.lastSync = 0;
    this.busy = false;
    this.received = false;
    this.lastId = 0;
    this.steps = [];
    this.dataURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';
  }
  updateData(lastId, dataURL){
    this.dataURL = dataURL;
    this.lastSync = lastId;
    return this.steps = this.steps.filter(value => value.stepId > lastId);
  }

  addStep(step){
    step.stepId = this.lastId++;
    this.steps.push(step);
    return step.stepId;
  }

  toObject(){
    return {dataURL: this.dataURL, steps: this.steps, lastId: this.lastSync, layerId: this.layerId};
  };

  isStale(){
    return !this.busy && this.steps[this.steps.length-1].stepId - this.lastSync >= stepsTillStale;
  }
}


class Room{
  constructor(name){
    this.layerId = 0;
    this.name = name;
    this.layers = {};
    this.roomWidth = 1280;
    this.roomHeight = 720;
    this.addLayer();
  }

  addStep(step){
    return this.layers[step.layerId].addStep(step);
  };

  addLayer(){
    let id = this.layerId++
    this.layers[id] = new Layer(id)
    return this.layers[id];
  };

  removeLayer(id){
    return delete this.layers[id];
  };

  layersToObject(){
    let layers = {};
    for(let key in this.layers){
      layers[key] = this.layers[key].toObject();
    }
    return layers;
  };
}
