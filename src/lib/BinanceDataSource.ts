import DataSource from "./DataSource";
const axios = require("axios");
const WebSocket = require("ws");

export default class BinanceDataSource extends DataSource {
  minute: number = -1;
  lastCheckIndicator: number = -1;
  constructor(symbol: string, interval: string, limit: number = 500) {
    super(symbol, interval, limit);
    this.minute = parseInt(interval);
    this.start();

  }

  async getCandles() {
    const url =
      process.env.API_URL +
      "/v3/klines?symbol=" +
      this.symbol.toUpperCase() +
      "&interval=" +
      this.interval +
      "&limit=" +
      this.limit;
    var klines = await axios.get(url);
    return klines;
  }

  start() {
    const ws = new WebSocket(
      `${process.env.STREAM_URL}/${this.symbol.toLowerCase()}@ticker`
    );

    ws.onopen = function (event) {
      const d = new Date();
      let dataAbertura = d.toLocaleString("pt-BR", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit",
      });
      console.log(`${dataAbertura} - Aberta nova Conexão WebSocket`);
    };

    ws.onclose = (event) => {
      var reason;

      // See https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
      if (event.code == 1000)
        reason =
          "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
      else if (event.code == 1001)
        reason =
          'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
      else if (event.code == 1002)
        reason =
          "An endpoint is terminating the connection due to a protocol error";
      else if (event.code == 1003)
        reason =
          "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
      else if (event.code == 1004)
        reason = "Reserved. The specific meaning might be defined in the future.";
      else if (event.code == 1005)
        reason = "No status code was actually present.";
      else if (event.code == 1006)
        reason =
          "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
      else if (event.code == 1007)
        reason =
          "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).";
      else if (event.code == 1008)
        reason =
          'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
      else if (event.code == 1009)
        reason =
          "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
      else if (event.code == 1010)
        // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
        reason =
          "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " +
          event.reason;
      else if (event.code == 1011)
        reason =
          "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
      else if (event.code == 1015)
        reason =
          "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
      else reason = "Unknown reason";

      const d = new Date();
      let dataFechaento = d.toLocaleString("pt-BR", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit",
      });
      console.log(
        `${dataFechaento} - A Conexão WebSocket foi Fechada:  ${reason}`
      );
      this.start();
    };
    ws.onmessage = (event) => {
      const obj = JSON.parse(event.data);
      const d = new Date(obj.E);
      let second = d.getUTCSeconds();
      let minute = d.getUTCMinutes();
      if (
        minute % this.minute == 0 &&
        this.lastCheckIndicator != this.minute &&
        second > 0
      ) {
        this.lastCheckIndicator = minute;
        this.notify();
      }
    };
  }




}
