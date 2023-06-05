require("dotenv").config();
import Klines from './lib/Klines';
import Kline from './lib/Kline';
import WebSocket from 'ws';
import ESTUDO_HILO from "./indicators/ESTUDO_HILO";
import KlineWebSocket from './lib/KlineWebSocket';
import KlineTable from './lib/KlineTable';


const wsSol = new KlineWebSocket('solusdt@kline_15m', new Klines(500));
const wsIota = new KlineWebSocket('iotausdt@kline_15m', new Klines(500));
// // const ksol = new Klines(500);
// // const kiota = new Klines(500);
// // const kiotx = new Klines(500);


// // const sol15 = 'wss://stream.binance.com:9443/ws/solusdt@kline_15m';
// // const iota15 = 'wss://stream.binance.com:9443/ws/iotausdt@kline_15m';
// // const iotx15 = 'wss://stream.binance.com:9443/ws/iotxusdt@kline_15m';

// // const ws = new WebSocket(sol15);
// // ws.subscribe(iota15);


// // let k;

// // ws.onmessage = (event) => {
// //     k = JSON.parse(event.data).k;
// //     console.log(k);
// //     // ks.addKline(new Kline(k));
// //     // let position = 0;
// //     // let size = ks.getCloseTimes().length;
// //     // console.log(position, size);
// //     // if (position != size) {
// //     //     console.log(ks);
// //     //     position = size;
// //     // }

// // };



// // Crie uma instância do cliente WebSocket para cada canal
// const channels = [
//     'solusdt@kline_15m',
//     'iotausdt@kline_15m',
//     'iotxusdt@kline_15m'
// ];

// channels.forEach(channel => {
//     // Crie uma nova instância do cliente WebSocket
//     const ws = new WebSocket('wss://stream.binance.com:9443/ws/' + channel);
//     // Manipulador de evento para receber mensagens do WebSocket
//     ws.on('message', data => {
//         const k = JSON.parse(data);
//         console.log('Novo Kline recebido:', k.k);
//         // Faça algo com o Kline recebido
//     });

//     // Manipulador de evento para lidar com erros do WebSocket
//     ws.on('error', error => {
//         console.error('Erro WebSocket:', error);
//     });
// });