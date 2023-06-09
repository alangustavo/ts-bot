import Subject from "./ISubject";
import Log from "./Log";
const WebSocket = require("ws");
export default class Service extends Subject {
    // static limit: number = 0;
    ws!: WebSocket;
    url: string;
    stream: string;
    log: Log;
    static weight: number = 0;
    /**
     * Please check the Binance API Documentation https://binance-docs.github.io/apidocs/websocket_api/en/#change-log
     * There is a limit of 300 connections per attempt every 5 minutes.
     * The connection is per IP address.
     * @param stream 
     */
    constructor(stream: string, weight: number) {
        super();
        this.stream = stream;
        weight += weight;
        this.url = `${process.env.STREAM_URL}\\${stream}`;
        this.log = new Log(`websocket-${stream}.log`);
        this.start();
    }


    start() {
        this.ws = new WebSocket(this.url);
        WebSocket.on('error', (error: { message: string; }) => {
            this.log.write(`Connection Error:${error.message}`);
        });
        this.config();
    }

    config() {
        this.configClose();
    }

    send(message: string) {
        this.ws.send(message);
    }

    configClose() {
        this.ws.onclose = (event: { code: number; reason: string; }) => {
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
            reason = `CONNECTION CLOSE:${reason}` + reason;
            this.notify(reason);
            this.log.write(reason);
            this.start();
        };
    }

}