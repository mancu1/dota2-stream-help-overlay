const d2gsi = require("dota2-gsi");
const server = new d2gsi();

const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const clients = [];
let count = 0;

let wsSendData = {};

let aegisTime = 0;
let isFind = false;
let isAegis = false;

function runPolling() {
  setInterval(function () {
    let result = {};
    isFind = false;
    clients.forEach(function (client) {
      result = Object.assign({}, client);
      if (
        client &&
        client.gamestate &&
        client.gamestate.map &&
        client.gamestate.map.clock_time > 0
      ) {
        Object.values(client.gamestate.items.team2).forEach(
          (player, playerIndex) => {
            Object.values(player).forEach((slot, slotIndex) => {
              if (slot.name === "item_aegis") {
                isFind = true;
                if (!isAegis) {
                  aegisTime = 300;
                  isAegis = true;
                } else {
                  aegisTime -= 0.5;
                }
                result.gamestate.items.team2[`player${playerIndex}`][
                  `slot${slotIndex}`
                ].time = aegisTime;
              }
            });
          }
        );
        Object.values(client.gamestate.items.team3).forEach(
          (player, playerIndex) => {
            Object.values(player).forEach((slot, slotIndex) => {
              if (slot.name === "item_aegis") {
                isFind = true;
                if (!isAegis) {
                  aegisTime = 300;
                  isAegis = true;
                } else {
                  aegisTime -= 0.5;
                }
                result.gamestate.items.team3[`player${playerIndex + 5}`][
                  `slot${slotIndex}`
                ].time = aegisTime;
              }
            });
          }
        );
      }
      if (!isFind) {
        aegisTime = 0;
        isAegis = false;
      }
      wsSendData = { count, client: result };
      //ws.send(count);
      count++;
    });
  }, 500);
}

server.events.on("newclient", function (client) {
  console.log("New client connection, IP address: " + client.ip);
  if (client.auth && client.auth.token) {
    console.log("Auth token: " + client.auth.token);
  } else {
    console.log("No Auth token");
  }
  clients.push(client);
  runPolling();
});

const app = express();
app.use(express.static("dist"));
const wsServer = http.createServer(app);
const wss = new WebSocket.Server({ server: wsServer });
wss.on("connection", (ws) => {
  setInterval(() => {
    ws.send(JSON.stringify(JSON.stringify(wsSendData)));
  }, 500);
});
wsServer.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${wsServer.address().port} :)`);
});
