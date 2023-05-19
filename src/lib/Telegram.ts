import { Telegraf } from "telegraf";
require("dotenv").config();

export default class Telegram {
    bot: any;
    constructor() {
        this.bot = new Telegraf(process.env.TELEGRAM);
    }

    public send(message: string) {
        this.bot.telegram.sendMessage(process.env.CHAT_ID, message);
    }
}