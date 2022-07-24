import { config } from "dotenv";
import express from "express";
import ws from "ws";
import { parseData } from "../helpers/parseExternalDate";
import { Server } from "socket.io";
import { Express } from "express";


export const startWebScocketServer = (server: any) => {
  config();
  const port = process.env.PORT;

  //Start the backend server socket
  const backendSocket = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  server.listen(port, () => {
    console.log("Websocket Server is up & running", port);
  });

  // Start external API socket
  const connectExternalAPI = () => {
    const tradeSocket = new ws(
      `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.API_KEY}`
    );

    // Subscribe message to start getting values
    const subscribe = {
      action: "subscribe",
      params: {
        symbols: "BTC/USD",
      },
    };
    // Connection opened
    tradeSocket.on("open", (event:any) => {
      tradeSocket.send(JSON.stringify(subscribe));
    });
    3001;

    // Listen for messages and emit it using the backedSocket
    tradeSocket.on("message", (data: any) => {
      console.info(parseData(data));
      backendSocket.emit("message", parseData(data));
    });
  };
  connectExternalAPI();
};