import WebSocket from 'ws';


const url1 = 'wss://stream.binance.com:9443/ws/solusdt@kline_1m';
const bs1 = new WebSocket(url1);


bs1.onmessage = (event) => {
    const k = JSON.parse(event.data).k;

    console.log(k);
};

