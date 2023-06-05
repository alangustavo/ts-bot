require("dotenv").config();
import WebSocket from 'ws';
import Klines from './Klines';
import Log from './Log';
import Telegram from './Telegram';
import Kline from './Kline';

export default class KlineWebSocket {
    ws!: WebSocket;
    klines: Klines;
    url: string;
    log: Log;
    telegram: Telegram;
    channel: string;

    constructor(channel: string, klines: Klines) {
        this.channel = channel;
        this.klines = klines;
        this.url = `${process.env.STREAM_URL}\\${channel}`;
        this.log = new Log(channel);
        this.telegram = new Telegram();

        this.start();
    }

    start() {
        this.ws = new WebSocket(this.url);
        this.configEvents();

    }

    configEvents() {
        this.ws.on('open', () => {
            let message = 'WebSocket Connection (re)opened';
            this.telegram.send(message);
            this.log.write(message);
        });
        // Manipulador de evento para receber mensagens do WebSocket
        this.ws.on('message', data => {
            const k = JSON.parse(data);
            this.klines.addKline(new Kline(k.k));
            this.notify();
        });

        // Manipulador de evento para lidar com erros do WebSocket
        this.ws.on('error', error => {
            let message = 'WebSocket Error!';
            this.telegram.send(message);
            this.log.write(message);

        });

        this.ws.on('close', (code, reason) => {
            let message = `WebSocket Connection Close! - ${reason}`;
            this.telegram.send(message);
            this.log.write(message);
            this.start();
        });

    }
    notify() {
        console.log(this.klines);
    }
}